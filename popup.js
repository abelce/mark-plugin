(function() {
    init();
    const submit = document.getElementById('submit')
    submit.onclick = () => {
        getFormData();
    }
})()

// 设置初始化数据
function init() {
    chrome.tabs.getSelected(null, function (w) {
        const $ = document.getElementById('popup');
        // 设置title
        const title = $.querySelector('#title')
        title.value = w.title;
        // 设置url
        const url = $.querySelector('#url');
        url.value = w.url;
    })
}

// 创建数据，保存
function create(data) { 
    chrome.runtime.sendMessage({data: JSON.stringify(data)}, function(response) {
        console.log('收到来自后台的回复：' + response);
        window.close();
    });
}

function getFormData() {
    const $ = document.getElementById('popup');
    const title = $.querySelector('#title')
    const titleValue = title.value.trim();
    if (!titleValue) {
        alert("标题必填")
        return;
    }
    const url = $.querySelector('#url');
    const urlValue = url.value.trim();
    if (!urlValue) {
        alert("地址必填")
        return;
    }
    create({
        title: titleValue,
        url: urlValue,
    });
}