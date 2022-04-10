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

/**
 * 创建消息体
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
export const createEvent = (key, value) => {
  return {
    key,
    value,
  };
};

export const createResponse = (success = false, errMsg = "", data) => {
  return {
    success,
    errMsg,
    data
  }
}