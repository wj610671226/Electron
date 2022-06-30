
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    console.log('child DOMContentLoaded');
    // 读取父窗口传递的数据
    ipcRenderer.on('data', (event, data) => {
        console.log(data);
        console.log(data.content);
        document.getElementById('content').innerText = data.content;
    });

    document.getElementById('send_parent').addEventListener('click', () => {
        console.log("send_parent");

        // 渲染进程发送数据到主进程
        // 如何关闭当前子窗口？
        ipcRenderer.send('sendMain', {data: "渲染进程发送数据"});
    });
});