import React from "react";
import IFrame from "../IFrame";
import "./style.scss";

export default ({ onClick }) => {
  return (
    <IFrame
      id="screen-iframe-app"
      name="screen-iframe-app"
      className="screen-iframe-actions"
    >
      <div className="start-modal-wrapper">
        <div className="start-modal">
          <div className="start-modal-btn" onClick={onClick}>
            start-modal
          </div>
        </div>
      </div>
    </IFrame>
  );
};
