import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function ({ children, ...props }) {
  const [contentRef, setContentRef] = useState(null);
  const mountNode = contentRef?.contentWindow?.document?.body;
  const headNode = contentRef?.contentWindow?.document?.head;
  // const srcDoc = `<!DOCTYPE html><html>  <head>    <base key="base" href="${chrome.runtime.getURL(
  //   ""
  // )}" />    <link      key="css"      type="text/css"      rel="stylesheet"      href="/static/css/content.css"/>  </head>\n  <body>\n    <div class="frame-root"></div>\n  </body>\n</html>\n`;

  // const srcDoc = `<!DOCTYPE html><html>  <head>  <link      key="css"      type="text/css"      rel="stylesheet"      href="/static/css/content.css"/>  </head>  <body> <div class="frame-root"></div>\n  </body>\n</html>\n`;
  return (
    <iframe
      {...props}
      frameBorder="no"
      ref={setContentRef}
      // srcDoc={srcDoc}
    >
      {headNode &&
        createPortal(
          <>
            <link
              key="css"
              type="text/css"
              rel="stylesheet"
              href="/static/css/content.css"
            ></link>
          </>,
          headNode
        )}
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}
