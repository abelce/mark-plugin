import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.scss";
import reportWebVitals from "./reportWebVitals";

import Content from "./content";
import { isDevelopmentEnv, isProductionEnv } from "./utils";

function App() {
  
  if (isDevelopmentEnv) {
    return ReactDOM.render(<Content/>, document.getElementById("root"));
  }

  if (isProductionEnv) {
    const screenExtension = document.createElement("screen-extension");
    screenExtension.setAttribute("id", "screen-extension-app");
    screenExtension.setAttribute("name", "screen-extension-app");
    document.body.appendChild(screenExtension);
  }

  return ReactDOM.render(<Content/>, document.getElementById("screen-extension-app"));
}

App();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
