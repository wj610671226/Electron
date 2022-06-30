const { ipcMain, dialog } = require("electron");
const { set } = require("./store-utils");

const {
  LOGIN_OUT_SUCCESS,
  LOGIN_SUCCESS,
} = require("../src/config/ipc-config");

const {
  createMainWindow,
  closeLoginWindow,
  closeMainWindow,
  showLoginWindow,
} = require("./manage-window");

function handleIPCMessage() {
  ipcMain.on(LOGIN_SUCCESS, (e, v) => {
    console.log("main login");
    set("islogin", true);
    closeLoginWindow();
    createMainWindow();
    // testDiaglog();
  });

  ipcMain.on(LOGIN_OUT_SUCCESS, () => {
    console.log("LOGIN_OUT_SUCCESS");
    set("islogin", false);
    closeMainWindow();
    showLoginWindow();
  });

  function testDiaglog() {
    dialog
      .showMessageBox({
        type: "info",
        title: "应用有更新",
        message: "发现新版本，是否现在更新?",
        buttons: ["是", "否"],
      })
      .then((index) => {
        console.log(index.response);
        if (index.response === 0) {
          console.log("更新");
        }
      })
      .catch(() => {
        console.log("不更新");
      });
  }
}

module.exports = handleIPCMessage;
