export const ActionMode = {
  Init: "init", //初始态
  Record: "record", // 录制中
};

export const isDevelopmentEnv = process.env.NODE_ENV === "development";
export const isProductionEnv = process.env.NODE_ENV === "production";
