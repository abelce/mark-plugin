import React from "react";
import IFrame from "../IFrame";
import "./style.scss";
import CloseSvg from "./CloseSvg";
import { CLEAR_IMAGES_LIST } from "../../config";

export default ({ onClick, onEnd }) => {
  const handleClose = () => {
    //
    chrome.runtime.sendMessage({ key: CLEAR_IMAGES_LIST });
    onEnd?.();
  };
  return (
    <IFrame
      id="screen-iframe-app"
      name="screen-iframe-app"
      className="screen-iframe-actions"
    >
      <div className="start-modal-wrapper">
        <div className="start-modal">
          <p>操作简单的流程制作应用</p>
          <div className="start-close" onClick={handleClose}>
            <CloseSvg className="start-close-icon" />
          </div>
          <div className="start-modal-btn" onClick={onClick}>
            开始
          </div>
          <div className="start-modal-notice">
            请确保你已登陆
            <a target="_blank" href="https://app.vwood.xyz">
              网页
            </a>
          </div>
        </div>
      </div>
    </IFrame>
  );
};
