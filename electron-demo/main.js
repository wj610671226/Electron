// Modules to control application life and create native browser window
const {
  app, 
  BrowserWindow, 
  ipcMain, 
  Menu,
  Tray,
  Notification
} = require('electron')
const path = require('path')
// 在新版本中使用remote模块
const main = require('@electron/remote/main');
main.initialize();

function testOther() {
  const userPath = app.getPath('appData');
  console.log('userPath', userPath);
  
}

function createWindow () {

  testOther();
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  

  /**
   * 应用菜单
   * 1、模板
   * 2、代码
   * 
   * 菜单类型
   * normal：默认的菜单类型
   * separator: 分割线
   * submenu:子菜单
   * checkbox:多选菜单
   * radio:单选菜单
   * 
   * 
   * icon 16 * 16
   */
  // 定义菜单模板
  const template = [
    {
      label: '文件',
      submenu: [
        {
          label: '关于',
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: '关闭',
          accelerator: 'Command+Q',
          click: ()=> {
            app.quit();
          }
        },
        {
          label: '剪切',
          accelerator: 'Command+X',
          click: () => {mainWindow.webContents.insertText('剪切')}
        },
        {
          label: '关于',
          role: 'about',
          click: () => {mainWindow.webContents.insertText('剪切')}
        },
        {
          label: '打开新窗口',
          click: () => {
            let newWin = new BrowserWindow({width: 300, height: 200, parent: mainWindow, modal: true});
            newWin.loadURL('https://www.baidu.com/')
          }
        }
      ]
    },
    {label: '编辑'},
    {
      label: '我的菜单',
      submenu: [
        {
          label: '多选1',
          type: 'checkbox'
        },
        {
          label: '多选2',
          type: 'checkbox',
        }
      ]
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  // 动态创建菜单 MenuItem


  // 托盘图标，mac右上角图标
  const tray = new Tray('./reset/img/icon.png');
  tray.setToolTip('托盘应用提示');
  const leftContextMenu = Menu.buildFromTemplate(
    [
      {
        label: '打开', click: () => {
          console.log('托盘图标  click');
        }
      }
    ]
  );
  tray.setContextMenu(leftContextMenu);


  // 右键弹出菜单
  // 为托盘图标添加上下文菜单  不能和上面setContextMenu同时使用
  // const rightContextMenu = Menu.buildFromTemplate(
  //   [
  //     {
  //       label: '复制', role: 'copy'
  //     },
  //     {
  //       label: '粘贴', role: 'paste'
  //     }
  //   ]
  // );
  // tray.on('right-click', (e) => {
  //   console.log('right click');
  //   tray.popUpContextMenu(rightContextMenu);
  // });

 
  // 在新版本中使用remote模块
  require('@electron/remote/main').enable(mainWindow.webContents)

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // 监听渲染进程消息
  // ipcMain.on('openChildWin_render', () => {
  //   console.log('主进程收到信息');
  //   const win = new BrowserWindow({
  //     width: 800,
  //     height: 600,
  //     webPreferences: {
  //       nodeIntegration: true,
  //       contextIsolation: false,
  //     }
  //   });
  //   win.loadFile('./src/chindPage.html');
  //   win.webContents.send('data', {content: "主窗口传递的数据"});
  //   win.webContents.openDevTools();
  // })

  // Open the DevTools.
  mainWindow.webContents.openDevTools();


  showNotifaction();
  handleIPC();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  console.log("whenReady activate");
  app.on('activate', function () {
    console.log("activate");
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  console.log("window-all-closed");
  if (process.platform !== 'darwin') app.quit()
})


function showNotifaction() {
  console.log('showNotifaction');

  const noti = new Notification({
    title: '标题',
    subtitle: '子标题',
    body: '通知内容--',
  });
  noti.show();
  noti.on('click', (e, number) => {
    console.log('click = number =' + number);
  });

  noti.on('close', (e, number) => {
    console.log('close = number =' + number);
  });

  noti.on('reply', (e, number) => {
    console.log('reply = number =' + number);
  });
}

function handleIPC() {
  ipcMain.handle('invoke-message', async (e, args) => {
    console.log("args = " + args);
    return await new Promise((res, rej) => {
      if (args.length > 1) {
        res('success');
      } else {
        rej('error');
      }
    });
  })
}
