import React, { useMemo, useState } from "react";
import ReactDOM, { createPortal } from "react-dom";
import IFrame from "../components/IFrame";
import { ActionMode } from "../utils";
import GetStart from "../components/GetStart";
import Record from "../components/Record";

export default class Content extends React.Component {
  state = {
    mode: ActionMode.Init,
    runtimeLoaded: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.init();
  }

  init = () => {
    // https://developer.chrome.com/docs/extensions/reference/runtime/#type-OnInstalledReason
    chrome.runtime.onInstalled.addListener( (details) => {
      this.setState({
        runtimeLoaded: true,
      });
    });
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
    }
  };

  render() {
    return this.getContent()
  }
}
