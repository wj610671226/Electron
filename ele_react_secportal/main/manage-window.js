const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { set, get } = require('./store-utils');

let mainWindow, loginWindow;
function createMainWindow() {
    console.log("mainWindow = " + mainWindow);
    mainWindow = new BrowserWindow({
        // width: 800,
        // height: 600,
        width: 480,
        height: 580,
        show: false,
        titleBarStyle: "hidden",
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        }
    });
    const releasePath = isDev? "http://localhost:3000/file" : `file://${path.resolve(__dirname, './index.html')}`;
    console.log("releasePath = " + releasePath);
    console.log(`file://${path.resolve(__dirname, '../build/index.html')}`);
    mainWindow.loadURL(releasePath);
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
        mainWindow.maximize();
        mainWindow.resizable = false;
    });
    // mainWindow.on('closed', () => {
    //     console.log('mainWindow closed');
    //     // set('islogin', false);
    //     // mainWindow = null;
    //     mainWindow.hide
    // });

    mainWindow.on('close', (e) => {
        const islogin = get('islogin');
        console.log('mainwindos will close ' + islogin);
        if (islogin) {
            e.preventDefault();
            // 关闭则是隐藏窗口
            console.log('mainWindow hide');
            mainWindow.hide();
        }
    });
}

function closeMainWindow() {
    mainWindow.close();
}

function closeLoginWindow() {
    loginWindow.close();
}

function showMainWindow() {
    console.log("showMainWindow " + mainWindow);
    console.log(mainWindow);
    if (mainWindow) {
        mainWindow.show();
    } else {
        createMainWindow();
    }
}

function showLoginWindow() {
    if (loginWindow) {
        loginWindow.show();
    } else {
        createLoginWindow();
    }
}

function createLoginWindow() {
    // loginWindow = new BrowserWindow({
    //     width: 480,
    //     height: 580,
    //     resizable: false,
    //     show: false,
    //     frame: false,
    //     webPreferences: {
    //         nodeIntegration: true,
    //         contextIsolation: false,
    //     }
    // });
    console.log('create login window ' + loginWindow);
    loginWindow = new BrowserWindow({
        width: 480,
        height: 580,
        resizable: false,
        show: false,
        titleBarStyle: "hidden", // hidden customButtonsOnHover
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    
    const locationPath = path.resolve(__dirname, '../src/winpage/login.html');
    loginWindow.loadFile(locationPath);
    loginWindow.on('ready-to-show', () => {
        loginWindow.show();
    });
    loginWindow.on('closed', () => {
        console.log('loginWindow closed');
        loginWindow = null;
    });
}

module.exports = {
    closeMainWindow,
    closeLoginWindow,
    showMainWindow,
    showLoginWindow,
    createMainWindow
}