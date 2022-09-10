const upyun = require("upyun");
const fs = require("fs");
const path = require("path");

// 需要填写自己的服务名，操作员名，密码，通知URL
const serviceName = "extension-vwood";
const operatorName = "abelce";
const password = "AgdlTcfhC8HERfOetQNKaIJ7HRCzH637";

// 文件目录
const targetDir = path.join(__dirname, "../build/");

const client = new upyun.Client(new upyun.Service(serviceName, operatorName, password));

/**
 * 同步图片上传预处理
 */
function imageSyncProcess(file) {
  // params 参数详见云处理，云存储参数说明文档
  // https://github.com/upyun/node-sdk
  return client.putFile(file.remotePath, fs.createReadStream(file.filePath));
}

function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}
// 查找需要上传的文件
function findFiles(dir) {
  const files = [];
  walkSync(dir, (filePath, stat) => {
    files.push({
      filePath,
      remotePath: filePath.replace(targetDir, ""),
    });
  });
  return files;
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
    const files = findFiles(targetDir);
    // 上传文件
    await putFiles(files);
    console.log("上传cdn成功");
  } catch {
    console.log("上传cdn失败");
  }
}

run();
