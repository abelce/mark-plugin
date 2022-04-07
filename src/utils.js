export const ActionMode = {
  None: "none",
  Init: "init", //初始态
  Record: "record", // 录制中
};

export const isDevelopmentEnv = process.env.NODE_ENV === "development";
export const isProductionEnv = process.env.NODE_ENV === "production";

export const setStorage = (key, value) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, () => {
      resolve();
    });
  });
};

export const getStorage = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => {
      resolve(result[key]);
    });
  });
};
