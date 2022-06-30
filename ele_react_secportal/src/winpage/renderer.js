const { ipcRenderer } = window.require('electron');

const { 
    LOGIN_SUCCESS,
    LAUNCH_PROXY,
    STOP_PROXY
} = require('../config/ipc-config');

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login').addEventListener('click', function() {
        console.log('login');
        // 发送登录请求，然后创建主窗口
        ipcRenderer.send(LOGIN_SUCCESS);
    });


    document.getElementById('launch_proxy').addEventListener('click', function() {
        ipcRenderer.send(LAUNCH_PROXY);
    });


    document.getElementById('close_proxy').addEventListener('click', function() {
        ipcRenderer.send(STOP_PROXY);
    });
    
    
});