import React, { useEffect, useRef, useState } from "react";
import IFrame from "../IFrame";
import CompleteSvg from "./CompleteSvg";
import CloseSvg from "./CloseSvg";
import ResetSvg from "./ResetSvg";
import "./style.scss";
import {
  APP_ID,
  CAPTURE_TAB,
  CAPTURE_TAB_DATA,
  CLEAR_IMAGES_LIST,
  IMAGES_LIST,
  OPEN_SITE_CREATE_PAGE,
  RESET_TAB_DATA,
  ROOT_ID,
} from "../../config";
import { createResponse, getSessionStorage } from "../../utils";

export default (props) => {
  const _actionsRef = useRef(document.getElementById(APP_ID));
  const [focusEle, setFocusEle] = useState();
  const [workflowItemCount, setWorkflowItemCount] = useState([]);

  const windowHoverEvent = (event) => {
    // 不能选中 插件根节点
    if (document.getElementById(ROOT_ID)?.contains(event.target)) {
      return;
    }
    if (!focusEle || focusEle !== event.target) {
      setFocusEle(event.target);
    }
  };

  const getRectInfo = (hoverEle) => {
    const hoverEleRect = hoverEle.getBoundingClientRect();
    return {
      x: hoverEleRect.left - 2,
      y: hoverEleRect.top,
      width: hoverEleRect.width + 4,
      height: hoverEleRect.height + 4,
    };
  };

  const windowClickEvent = (event) => {
    chrome.runtime.sendMessage(
      {
        key: CAPTURE_TAB,
        // data: getRectInfo(),
      },
      (response) => {
      }
    );
  };

  const addWindowEvent = () => {
    document.addEventListener("mouseover", windowHoverEvent, false);
    document.addEventListener("click", windowClickEvent, false);
  };

  const removeWindowEvent = () => {
    document.removeEventListener("mouseover", windowHoverEvent, false);
    document.removeEventListener("click", windowClickEvent, false);
  };

  const changeHightLighter = (hoverEle) => {
    const hightLighterEle = document.querySelector(".screen-hight-lighter");
    // 当hover的元素没值，或者等于screen-hight-lighter元素时都不显示高亮元素
    if (
      !hoverEle ||
      hightLighterEle === hoverEle ||
      (_actionsRef && _actionsRef.current?.contains(hoverEle))
    ) {
      hightLighterEle.setAttribute("style", `display: none !important;`);
      return;
    }
    if (hightLighterEle) {
      const rectInfo = getRectInfo(hoverEle);
      hightLighterEle.setAttribute(
        "style",
        `display: block;transform: translate3d(${rectInfo.x}px, ${rectInfo.y}px, 0px);width: ${rectInfo.width}px; height: ${rectInfo.height}px`
      );
    }
  };

  // 关闭截屏功能
  const handleClose = () => {
    //
    chrome.runtime.sendMessage({ key: CLEAR_IMAGES_LIST });
    props.onEnd && props.onEnd();
  };

  const updateWorkflowItems = (count) => {
    setWorkflowItemCount(count);
  };

  useEffect(() => {
    addWindowEvent();
    return removeWindowEvent;
  }, []);

  useEffect(() => {
    const loadInitData = async () => {
      const imagesList = (await getSessionStorage(IMAGES_LIST)) || [];
      updateWorkflowItems(imagesList.length);
    };
    loadInitData();
  }, []);

  const messageListener = (message, sender, sendResponse) => {
    if (message.key === CAPTURE_TAB_DATA) {
      console.log(message);
      sendResponse(createResponse(true));
      updateWorkflowItems(message.data);
    }
  };

  //  到screen网站
  const handleOpenSite = () => {
    chrome.runtime.sendMessage({ key: OPEN_SITE_CREATE_PAGE }, (response) => {
      props.onEnd && props.onEnd();
    });
  };

  // 清空数据
  const handleReset = () => {
    chrome.runtime.sendMessage(
      {
        key: RESET_TAB_DATA,
      },
      (response) => {
      }
    );
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, [workflowItemCount]);

  useEffect(() => {
    const hightLighterEle = document.createElement("div");
    hightLighterEle.setAttribute("class", "screen-hight-lighter");
    document.body.appendChild(hightLighterEle);
    return () => {
      document.body.removeChild(hightLighterEle);
    };
  }, []);

  useEffect(() => {
    changeHightLighter(focusEle);
  }, [focusEle]);

  return (
    <IFrame
      id="screen-iframe-app"
      name="screen-iframe-app"
      className="screen-iframe-recording"
    >
      <div className="recording-actions">
        <div className="icon complete" onClick={handleOpenSite}>
          <CompleteSvg className="complete-icon" />
          <span className="count">{workflowItemCount}</span>
        </div>
        <div className="icon reset" onClick={handleReset}>
          <ResetSvg className="reset-icon" />
        </div>
        <div className="icon close" onClick={handleClose}>
          <CloseSvg className="close-icon" />
        </div>
      </div>
    </IFrame>
  );
};
