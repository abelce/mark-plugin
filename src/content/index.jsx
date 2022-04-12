import React, { useMemo, useState } from "react";
import { ActionMode, getStorage, isDevelopmentEnv, isProductionEnv, setStorage } from "../utils";
import GetStart from "../components/GetStart";
import Record from "../components/Record";
import {PLUGIN_STATUS_KEY} from "../config";

export default class Content extends React.Component {
  state = {
    mode: isDevelopmentEnv ? ActionMode.Init : ActionMode.None,
    runtimeLoaded: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    // https://developer.chrome.com/docs/extensions/reference/runtime/#type-OnInstalledReason
    // chrome.runtime.onInstalled.addListener( (details) => {
    //   this.setState({
    //     runtimeLoaded: true,
    //   });
    // });

    if (isProductionEnv) {
      const cacheStatus = await getStorage(PLUGIN_STATUS_KEY);
      if (cacheStatus) {
        this.setState({
          mode: cacheStatus,
        })
      }
      chrome.storage.onChanged.addListener( (changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
         if (key === PLUGIN_STATUS_KEY) {
           this.setState({
             mode: newValue,
           });
           setStorage(PLUGIN_STATUS_KEY, newValue);
         }
        }
      });
    }
  };

  onChangeMode = (mode) => {
    this.setState({
      mode,
    });
  };

  getContent = () => {
    const { mode } = this.state;
    switch (mode) {
      case ActionMode.Init:
        return (
          <GetStart onClick={() => this.onChangeMode(ActionMode.Record)} />
        );
      case ActionMode.Record:
        return <Record />;
      default:
        return null;
    }
  };

  render() {
    return <div>
      <div>html</div>
      {this.getContent()}
    </div>;
  }
}
