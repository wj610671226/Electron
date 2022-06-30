const { Tray } = require('electron');
const path = require('path');
const { showLoginWindow, showMainWindow } = require('./manage-window');
const { get } = require('./store-utils');

let tray;
const createTray = () => {
    if (tray) {
        return;
    }
    console.log('create tray');
    const picPath = path.resolve(__dirname, '../src/assets/img/tray-icon.png');
    tray = new Tray(picPath);
    tray.on('click', () => {
        const reslut = get('islogin');
        console.log('click tray reslut = ' + reslut);
        if (reslut) {
            showMainWindow();
        } else {
            showLoginWindow();
        }
    })
}

module.exports = createTray;