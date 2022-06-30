const { ipcRenderer } = window.require('electron');
const { 
    LOGIN_SUCCESS,
} = require('../config/ipc-config');

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login').addEventListener('click', function() {
        console.log('login');
        // 发送登录请求，然后创建主窗口
        ipcRenderer.send(LOGIN_SUCCESS);
    });
});