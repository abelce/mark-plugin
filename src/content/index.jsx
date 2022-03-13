import React, { useMemo, useState } from "react";
import ReactDOM, { createPortal } from "react-dom";
import IFrame from "../components/IFrame";
import { ActionMode } from "../utils";
import GetStart from "../components/GetStart";
import Record from "../components/Record";

export default class Content extends React.Component {
  state = {
    mode: ActionMode.Init,
  };

  onChangeMode = (mode) => {
    this.setState({
      mode,
    });
    if (mode === ActionMode.Record) {
      // this.addWindowEvent();
    }
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
    return (
      <screen-extension id="screen-extension-app">
        {this.getContent()}
      </screen-extension>
    );
  }
}
