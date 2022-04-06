import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.scss";

import Content from "./content";

function App() {
    if (window.top !== window.self) return;
      const screenExtension = document.createElement("screen-extension");
      screenExtension.setAttribute("id", "screen-extension-app");
      screenExtension.setAttribute("name", "screen-extension-app");
      document.body.appendChild(screenExtension);

  return ReactDOM.render(
    <Content />,
    document.getElementById("screen-extension-app")
  );
}

App();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
