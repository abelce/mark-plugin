// frameborder="0"
// 添加iframe
function appendPluginIframe() {
    let screenExtension = document.createElement("screen-extension");
    screenExtension.setAttribute("id", "screen-extension-app")
    
    document.getElementsByTagName("body")[0].appendChild(screenExtension);
}

// 初始化函数
function contentInit() {
    appendPluginIframe();
}

contentInit();