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
          <p>操作简单的流程制作应用</p>
          <div className="start-modal-btn" onClick={onClick}>
            开始
          </div>
        </div>
      </div>
    </IFrame>
  );
};
