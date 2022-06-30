const { ipcMain } = require("electron");
const { set } = require("./store-utils");
const { launch_proxy, stop_proxy } = require("./proxy");

const {
  LOGIN_OUT_SUCCESS,
  LOGIN_SUCCESS,
  LAUNCH_PROXY,
  STOP_PROXY,
} = require("../src/config/ipc-config");

const {
  createMainWindow,
  closeLoginWindow,
  closeMainWindow,
  showLoginWindow,
} = require("./manage-window");

const { send } = require("./tcp");

function handleIPCMessage() {
  ipcMain.on(LOGIN_SUCCESS, (e, v) => {
    console.log("main login");
    // send();
    set("islogin", true);
    closeLoginWindow();
    createMainWindow();
  });

  ipcMain.on(LAUNCH_PROXY, () => {
    launch_proxy();
  });

  ipcMain.on(STOP_PROXY, () => {
    stop_proxy();
  });
}

module.exports = handleIPCMessage;
