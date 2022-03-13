import React, { useEffect, useRef, useState } from "react";
import IFrame from "../IFrame";
import CompleteSvg from "./CompleteSvg";
import CloseSvg  from "./CloseSvg";
import "./style.scss";

export default ({onExpand}) => {
  const _actionsRef = useRef(document.getElementById("screen-extension-app"));
  console.log(_actionsRef);
  const [visable, setVisable] = useState(false);
  const [focusEle, setFocusEle] = useState();

  const windowHoverEvent = (event) => {
    // if (["HTML", "BODY"].includes(event.target.nodeName)) {
    //   setFocusEle(undefined);
    //   return;
    // }
    if (!focusEle || focusEle !== event.target) {
      setFocusEle(event.target);
    }
  };

  const windowClickEvent = (event) => {
    // debugger;
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
    if (!hoverEle || hightLighterEle === hoverEle || (_actionsRef && _actionsRef.current.contains(hoverEle))) {
      hightLighterEle.setAttribute("style", `display: none !important;`);
      return;
    }
    const hoverEleRect = hoverEle.getBoundingClientRect();
    if (hightLighterEle) {
      hightLighterEle.setAttribute(
        "style",
        `display: block;transform: translate3d(${hoverEleRect.left - 2}px, ${
          hoverEleRect.top - 2
        }px, 0px);width: ${hoverEleRect.width + 4}px; height: ${
          hoverEleRect.height + 2
        }px`
      );
    }
  };

  useEffect(() => {
    addWindowEvent();
    return removeWindowEvent;
  }, []);

  useEffect(() => {
    const hightLighterEle = document.createElement("div");
    hightLighterEle.setAttribute("class", "screen-hight-lighter");
    document.body.appendChild(hightLighterEle);
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
        <div className="icon complete">
          <CompleteSvg className="complete-icon"/>
        </div>
        <div className="icon close">
          <CloseSvg className="close-icon"/>
        </div>
      </div>
    </IFrame>
  );
};
