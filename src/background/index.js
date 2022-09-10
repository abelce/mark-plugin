import {
  CAPTURE_TAB,
  CAPTURE_TAB_DATA,
  CLEAR_IMAGES_LIST,
  IMAGES_LIST,
  OPEN_SITE_CREATE_PAGE,
  OPEN_SITE_CREATE_PAGE_SUCCESS,
  PLUGIN_STATUS_KEY,
  REQUEST_SNED_TAB_DATA,
  RESET_TAB_DATA,
  SEND_DATA_TO_SITE_CREATE_PAGE,
  TAB_ONACTIVATED,
} from "../config";
import {
  ActionMode,
  createResponse,
  getSessionStorage,
  getStorage,
  isProd,
  setSessionStorage,
  setStorage,
} from "../utils";

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

// icon 点击事件
chrome.action?.onClicked.addListener(async (tab) => {
  const prevStatus = await getStorage(PLUGIN_STATUS_KEY);
  const newStatus = [ActionMode.Init, ActionMode.Record].includes(prevStatus)
    ? ActionMode.None
    : ActionMode.Init;
  setStorage(PLUGIN_STATUS_KEY, newStatus);
});

async function captureVisibleTab(tab) {
  const imagesList = (await getSessionStorage(IMAGES_LIST)) || [];
  const dataUrl = await chrome.tabs.captureVisibleTab(undefined, {
    format: "jpeg",
    quality: 30,
  });
  const newItem = {
    dataUrl,
    title: tab.title,
    url: tab.url,
    favIconUrl: tab.favIconUrl,
  };
  imagesList.push(newItem);
  await setSessionStorage(IMAGES_LIST, imagesList);
  chrome.tabs.sendMessage(
    tab.id,
    {
      key: CAPTURE_TAB_DATA,
      data: imagesList.length,
    },
    (response) => {}
  );
}

async function openSiteCreatePage() {
  const newTab = await chrome.tabs.create({
    url: isProd
      ? "https://app.vwood.xyz/Workflow/Create?from=plugin"
      : "http://localhost:4000/Workflow/Create?from=plugin",
    active: true,
  });
}

const resetTabData = async (tab) => {
  await setSessionStorage(IMAGES_LIST, []);
  chrome.tabs.sendMessage(
    tab.id,
    {
      key: CAPTURE_TAB_DATA,
      data: 0,
    },
    (response) => {}
  );
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.key === CAPTURE_TAB) {
    captureVisibleTab(sender.tab);
    sendResponse(createResponse(true));
  }
  if (message.key === OPEN_SITE_CREATE_PAGE) {
    openSiteCreatePage();
    sendResponse(createResponse(true));
  }
  if (message.key === RESET_TAB_DATA) {
    await resetTabData(sender.tab);
    sendResponse(createResponse(true));
  }
  if (message.key === CLEAR_IMAGES_LIST) {
    // 清空数据
    setSessionStorage(IMAGES_LIST, []);
    sendResponse(createResponse(true));
  }
  if (message.key === OPEN_SITE_CREATE_PAGE_SUCCESS) {
    setTimeout(async () => {
      const imagesList = (await getSessionStorage(IMAGES_LIST)) || [];
      chrome.tabs.sendMessage(
        sender.tab.id,
        {
          key: SEND_DATA_TO_SITE_CREATE_PAGE,
          data: imagesList,
        },
        (response) => {
          setSessionStorage(IMAGES_LIST, []);
        }
      );
    });

    sendResponse(createResponse(true));
  }
  if (message.key === REQUEST_SNED_TAB_DATA) {
    const imagesList = (await getSessionStorage(IMAGES_LIST)) || [];
    chrome.tabs.sendMessage(
      sender.tab.id,
      {
        key: CAPTURE_TAB_DATA,
        data: imagesList.length,
      },
      (response) => {
      }
    );
    sendResponse(createResponse(true));
  }
});

// 浏览器页签激活
chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.sendMessage(
    tabId,
    {
      key: TAB_ONACTIVATED,
    },
    async (response) => {
      // 唤醒后同步数据
    }
  );
});
