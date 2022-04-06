import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { iframeSrcDoc } from "./config";

export default function ({ children, ...props }) {
  const iframeNode = useRef(null);
  const [body, setBody] = useState(null);
  useEffect(() => {
    const load = () => {
      setBody(iframeNode.current.contentDocument.body);
    };
    iframeNode.current.addEventListener("load", load, false);
    return () => iframeNode.current.removeEventListener("load", load, false);
  }, []);

  return (
    <iframe {...props} frameBorder="no" ref={iframeNode} srcDoc={iframeSrcDoc}>
      {body && createPortal(children, body)}
    </iframe>
  );
}
