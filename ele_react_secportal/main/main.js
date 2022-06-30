const {app, BrowserWindow} = require('electron')
const handleIPC = require('./ipc');
const createTray = require('./tray');
const createMenu = require('./menu');
const { showLoginWindow } = require('./manage-window');
const { get } = require('./store-utils');
require('./tcp');
require('./udp');
require('./http');

function createWindow () {
  showLoginWindow();
}

app.whenReady().then(() => {
    // createMenu();
    createWindow();
    handleIPC();
    createTray();
    app.on('activate', function () {
      console.log('activate');
      const allWindow = BrowserWindow.getAllWindows();
      console.log(allWindow);
      const isLogin = get('islogin');
      console.log("isLogin = " + isLogin);
      if (allWindow.length === 0) {
        createWindow();
      } else {
        if (isLogin) {
          const win = allWindow[0];
          win.show();
        } else {
          createWindow();
        }
      }
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})