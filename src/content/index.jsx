import React, { useMemo, useState } from "react";
import {
  ActionMode,
  createResponse,
  getStorage,
  isDevelopmentEnv,
  isProductionEnv,
  setStorage,
} from "../utils";
import GetStart from "../components/GetStart";
import Record from "../components/Record";
import { OPEN_SITE_CREATE_PAGE_SUCCESS, PLUGIN_STATUS_KEY, SEND_DATA_TO_SITE_CREATE_PAGE } from "../config";

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

  componentWillUnmount() {
    window.removeEventListener("message", this.addWindowEvents, true);
    chrome.runtime.onMessage.removeListener(this.backgroundMessageListener)
  }

  init = async () => {
    // https://developer.chrome.com/docs/extensions/reference/runtime/#type-OnInstalledReason
    // chrome.runtime.onInstalled.addListener( (details) => {
    //   this.setState({
    //     runtimeLoaded: true,
    //   });
    // });

    if (isProductionEnv) {
      chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
          console.log(key, oldValue, newValue);
          if (key === PLUGIN_STATUS_KEY) {
            this.setState({
              mode: newValue,
            });

            setStorage(PLUGIN_STATUS_KEY, newValue);
          }
        }
      });
      const cacheStatus =
        (await getStorage(PLUGIN_STATUS_KEY)) || ActionMode.None;
      if (cacheStatus) {
        this.setState({
          mode: cacheStatus,
        });
      }
    }
    window.addEventListener("message", this.addWindowEvents, true);
    chrome.runtime.onMessage.addListener(this.backgroundMessageListener)
  };

  backgroundMessageListener = (message, sender, sendResponse) => {
    if (message.key === SEND_DATA_TO_SITE_CREATE_PAGE) {
      sendResponse(createResponse(true))
      console.log("backgroundMessageListener:", message.key, message);
      window.postMessage({
        key: SEND_DATA_TO_SITE_CREATE_PAGE,
        data: message.data,
      })
    }
  }
  addWindowEvents = (event) => {
    // console.log(event);
    // For Chrome, the origin property is in the event.originalEvent
    // object.
    // 这里不准确，chrome 没有这个属性
    // var origin = event.origin || event.originalEvent.origin;
    var origin = event.origin;
    if (
      ![
        "http://localhost:4000",
        "http://localhost:3000",
        "https://app.vwood.xyz",
      ].includes(origin)
    ) {
      return;
    }

    if (event.data && typeof event.data !== "object") {
      return ;
    }

    const {key} = event.data;
    if (key === OPEN_SITE_CREATE_PAGE_SUCCESS) {
      chrome.runtime.sendMessage(
        {
          key: OPEN_SITE_CREATE_PAGE_SUCCESS
        },
        response => {
          console.log("contentjs OPEN_SITE_CREATE_PAGE_SUCCESS", response)
        }
      )
    }
  };

  onChangeMode = (mode) => {
    this.setState(
      {
        mode,
      },
      () => {
        setStorage(PLUGIN_STATUS_KEY, this.state.mode);
      }
    );
  };

  getContent = () => {
    const { mode } = this.state;
    switch (mode) {
      case ActionMode.Init:
        return (
          <GetStart onClick={() => this.onChangeMode(ActionMode.Record)} />
        );
        break;
      case ActionMode.Record:
        return <Record onEnd={() => this.onChangeMode(ActionMode.None)} />;
        break;
      default:
        return null;
    }
  };

  render() {
    return <div>{this.getContent()}</div>;
  }
}
