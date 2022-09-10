const upyun = require("upyun");
const fs = require("fs");
const path = require("path");

// 需要填写自己的服务名，操作员名，密码，通知URL
const serviceName = "extension-vwood";
const operatorName = "abelce";
const password = "AgdlTcfhC8HERfOetQNKaIJ7HRCzH637";

// 文件目录
const targetDir = path.join(__dirname, "../extension/");

const client = new upyun.Client(
  new upyun.Service(serviceName, operatorName, password)
);

/**
 * 同步图片上传预处理
 */
function imageSyncProcess(file) {
  // params 参数详见云处理，云存储参数说明文档
  // https://github.com/upyun/node-sdk
  return client.putFile(file.remotePath, fs.createReadStream(file.filePath));
}

// 上传所有文件
async function putFiles(files = []) {
  for (let file of files) {
    console.log("------上传文件：", file.remotePath);
    await imageSyncProcess(file);
    console.log("------上传文件：", file.remotePath, "成功");
  }
}

async function run() {
  try {
    // 上传文件
    await putFiles([
      {
        filePath: path.join(__dirname, "../extension/workflow.crx"),
        remotePath: "workflow.crx",
      },
      {
        filePath: path.join(__dirname, "../extension/workflow.zip"),
        remotePath: "/workflow.zip",
      },
    ]);
    console.log("上传插件成功");
  } catch(err) {
    console.log(err);
    console.log("上传插件失败");
  }
}

run();
