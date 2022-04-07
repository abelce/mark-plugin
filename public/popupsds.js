// import {ENUM_array_MarkType} from './utils.js';

// (function() {
//     // const createBtn = document.getElementById('createBtn')
//     // createBtn.onclick = () => {
//         // getFormData();
//     // }
// })()

// // 设置初始化数据
// function init() {
//     chrome.tabs.getSelected(null, function (w) {
//         const $ = document.getElementById('popup');
//         // 设置title
//         const title = $.querySelector('#title')
//         title.value = w.title;
//         // 设置url
//         const url = $.querySelector('#url');
//         url.value = w.url;

//         const type = $.querySelector('#type');
//         type.value = "default";

//         setSelectOptions();
//     })
// }

// // 设置下拉框的option
// function setSelectOptions() {
//     const $ = document.getElementById('popup');
//     const type = $.querySelector('#type');
//     const fragement = document.createDocumentFragment();

//     ENUM_array_MarkType.map(item => {
//         const option = document.createElement('option');
//         option.value = item.value;
//         option.innerHTML = item.description;
//         fragement.appendChild(option);
//     })
//     type.innerHTML = '';
//     type.appendChild(fragement);
// }

// // 创建数据，保存
// async function create(data) { 
//     const bg = chrome.extension.getBackgroundPage();
//     const res = await bg.createDate(data);
//     console.log('popup create', res);
//     window.close();
// }

// function getFormData() {
//     const $ = document.getElementById('popup');
//     const title = $.querySelector('#title')
//     const titleValue = title.value.trim();
//     if (!titleValue) {
//         alert("标题必填")
//         return;
//     }
//     const url = $.querySelector('#url');
//     const urlValue = url.value.trim();
//     if (!urlValue) {
//         alert("地址必填")
//         return;
//     }
//     const type = $.querySelector('#type');
//     const typeValue = type.value;
//     create({
//         title: titleValue,
//         url: urlValue,
//         type: typeValue,
//     });
// }