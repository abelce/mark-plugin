export const iframeSrcDoc = `<!DOCTYPE html>
<html>  
  <head> 
    <base key="base" href="http://localhost:3000/"> 
    <link key="css" type="text/css" rel="stylesheet" href="/static/css/content.css"/> 
  </head> 
  <body> 
    <div class="frame-root"></div>
  </body>
  </html>`;

  // 生产环境更换<base>的href属性

// const srcDoc = `<!DOCTYPE html><html>  <head>    <base key="base" href="${chrome.runtime.getURL(
//   ""
// )}" />    <link      key="css"      type="text/css"      rel="stylesheet"      href="/static/css/content.css"/>  </head>\n  <body>\n    <div class="frame-root"></div>\n  </body>\n</html>\n`;
