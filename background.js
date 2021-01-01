let __DATA = [];

init();

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    const newData = [
        createNewData(JSON.parse(request.data)),
        ...__DATA,
    ]
    __DATA = await setData('data', newData) || [];
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});


async function init() {
    __DATA = await getData('data') || [];
}

function createNewData(data) {
    return {
        ...data,
        id: +new Date(),
        createTime: +new Date(),
    };
}

function getAllData() {
    return __DATA;
}

// 存储数据
function setData(key, value) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({
            [key]: value
        }, function (items) {
            chrome.storage.sync.get({
                data: []
            }, function (items) {
                resolve(items ? items[key] : null);
            });
        });
    });
}
// 获取数据
function getData(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get({
            [key]: undefined
        }, function (items) {
            resolve(items ? items[key] : null);
        });
    });
}