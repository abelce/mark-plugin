import "./App.css";
import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import IFrame from "./components/IFrame";
import {ActionMode} from "./utils";
import GetStart from "./components/GetStart";

function App() {
  const [mode, setMode] = useState(ActionMode.Init);
  const content = useMemo(() => {

    switch(mode) {
      case ActionMode.Init:
        return <GetStart />
    }
  }, [mode]);

  return createPortal(
    <IFrame id="screen-iframe-app" name="screen-iframe-app" className="screen-iframe-actions">
      {content}
    </IFrame>,
    document.getElementById("screen-extension-app")
  );
}

export default App;
