const {
    Menu
} = require('electron');

const createMenu = () => {
    const isMac = process.platform === 'darwin';
    console.log(isMac);
    const template = [
        {
            label: "阿里云盘", // mac 需要改变info.plist
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { 
                    label: "撤销", // 下面按需要修改
                    role: 'undo' 
                },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startSpeaking' },
                        { role: 'stopSpeaking' }
                    ]
                }
            ]
        },
        {
            label: 'Window',
            submenu: [
              { role: 'minimize' },
              { role: 'zoom' },
              { type: 'separator' },
              { role: 'front' },
              { type: 'separator' },
              { role: 'window' }
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: '访问主页',
                    click: async () => {
                        const { shell } = require('electron')
                        await shell.openExternal('https://blog.csdn.net/wj610671226')
                    }
                }
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

module.exports = createMenu;