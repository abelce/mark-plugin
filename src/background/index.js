import { CAPTURE_TAB, CAPTURE_TAB_DATA, PLUGIN_STATUS_KEY } from "../config";
import { ActionMode, createResponse, getStorage, setStorage } from "../utils";

chrome.runtime.onInstalled.addListener(async () => {
  // While we could have used `let url = "hello.html"`, using runtime.getURL is a bit more robust as
  // it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
  // runtime.
  let url = chrome.runtime.getURL("index.html");

  // Open a new tab pointing at our page's URL using JavaScript's object initializer shorthand.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015
  //
  // Many of the extension platform's APIs are asynchronous and can either take a callback argument
  // or return a promise. Since we're inside an async function, we can await the resolution of the
  // promise returned by the tabs.create call. See the following link for more info on async/await.
  // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
  //   let tab = await chrome.tabs.create({ url });

  // Finally, let's log the ID of the newly created tab using a template literal.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  //
  // To view this log message, open chrome://extensions, find "Hello, World!", and click the
  // "service worker" link in the card to open DevTools.
  //   console.log(`Created tab ${tab.id}`);

});

function reddenPage() {
  document.body.style.backgroundColor = "red";
}

//   chrome.action.onClicked.addListener((tab) => {
//     if(!tab.url.includes("chrome://")) {
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: reddenPage
//       });
//     }
//   });

// icon 点击事件
chrome.action?.onClicked.addListener(async (tab) => {
  const prevStatus = await getStorage(PLUGIN_STATUS_KEY);
  setStorage(PLUGIN_STATUS_KEY, prevStatus !== ActionMode.None ? ActionMode.None : ActionMode.Init);
});

async function captureVisibleTab(tabId) {
  chrome.tabs.captureVisibleTab().then((dataUrl)=> {
    chrome.tabs.sendMessage(tabId, {
      key: CAPTURE_TAB_DATA,
      data: dataUrl,
    }, (response) => {
      console.log(response);
    });
  });
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("sender:", sender);
  if (message.key === CAPTURE_TAB) {
    captureVisibleTab(sender.tab.id);
    sendResponse(createResponse(true));
  }
});