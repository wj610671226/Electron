const { autoUpdater } = require("electron-updater");
const log = require("electron-log");
const { dialog } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

module.exports = function () {
  autoUpdater.autoDownload = false;
  if (isDev) {
    autoUpdater.updateConfigPath = path.resolve(
      __dirname,
      "../dev-app-update.yml"
    );
  }
  autoUpdater.checkForUpdates();
  //   autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on("checking-for-update", () => {
    log.info("Checking for update...");
  });

  autoUpdater.on("update-available", (ev, info) => {
    log.info("update-available");
    dialog
      .showMessageBox({
        type: "info",
        title: "应用有更新",
        message: "发现新版本，是否现在更新?",
        buttons: ["是", "否"],
      })
      .then((index) => {
        if (index.response === 0) {
          autoUpdater.downloadUpdate();
        }
      })
      .catch((error) => {
        log.info("不更新");
      });
  });

  autoUpdater.on("update-not-available", (ev, info) => {
    log.info("Update not available.");
    // dialog.showMessageBox({
    //   message: "暂无更新",
    // });
  });

  autoUpdater.on("error", (ev, err) => {
    log.info("Error in auto-updater.");
    dialog.showMessageBox({
      type: "error",
      message: err,
    });
  });

  autoUpdater.on(
    "download-progress",
    (progress) => {
      log.info(
        `Download progress... progress = ${JSON.stringify(progress)}`
      );
    }
  );

  autoUpdater.on("update-downloaded", (ev, info) => {
    log.info("Update downloaded; will install in 5 seconds");
    // autoUpdater.quitAndInstall();

    dialog
      .showMessageBox({
        type: "info",
        title: "更新完成",
        message: "是否立即退出程序安装",
        buttons: ["是", "否"],
      })
      .then((index) => {
        if (index.response === 0) {
          autoUpdater.quitAndInstall();
        }
      })
      .catch((error) => {
        log.info("不更新");
      });
  });
};
