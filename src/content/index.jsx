import React, { useMemo, useState } from "react";
import { ActionMode, isDevelopmentEnv, isProductionEnv } from "../utils";
import GetStart from "../components/GetStart";
import Record from "../components/Record";

export default class Content extends React.Component {
  state = {
    mode: isDevelopmentEnv ? ActionMode.Init : undefined,
    runtimeLoaded: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    // https://developer.chrome.com/docs/extensions/reference/runtime/#type-OnInstalledReason
    // chrome.runtime.onInstalled.addListener( (details) => {
    //   this.setState({
    //     runtimeLoaded: true,
    //   });
    // });

    if (isProductionEnv) {
      // 点开插件图标的监听事件
      chrome.action?.onClicked.addListener((tab) => {
        console.log(tab);
        this.setState({
          mode: this.state.mode ? undefined : ActionMode.Init,
        });
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
    return this.getContent();
  }
}
