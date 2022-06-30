// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// 在渲染进程中创建新窗口, 目前已经不推荐使用了
const { BrowserWindow, dialog } = require('@electron/remote');
const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getWinInfo').addEventListener('click', () => {
        console.log("getWinInfo");

        // let win = new BrowserWindow({ width: 800, height: 600});
        // win.loadURL("https://www.baidu.com")
        // const bounds = win.getContentBounds()
        // console.log(bounds)

        // const win = remote.get
        // console.log("win = " + win);
    })


    document.getElementById('transwin').addEventListener('click', () => {
        // 无边框和透明窗口
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            transparent: true,
        })
        win.loadURL("https://www.baidu.com")
        const bounds = win.getContentBounds()
        console.log(bounds)
    })

    document.getElementById('lockWin').addEventListener('click', () => {
        // 锁定模式的窗口
        const win = new BrowserWindow({
            fullscreen: true,
            kioskL: true
        })
        // 或者
        // win.setKiosk(true)
        win.loadURL("https://www.baidu.com")
    })
     
    document.getElementById('seticon').addEventListener('click', () => {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            icon: ''
        })
        win.loadURL("https://www.baidu.com")
    })


    document.getElementById('loadWin').addEventListener('click', () => {
        // 优雅的加载窗口，即先创建不显示的窗口，等待页面加载完成再显示
        // 加载页面复杂耗时效果明显
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            show: false
        })
        win.loadURL("https://www.baidu.com")
        win.on('ready-to-show', () => {
            win.show()
        })
    })
    
    document.getElementById('parentWin').addEventListener('click', () => {
        // 父子窗口
        /**
         * 子窗口相当于父窗口的悬浮窗口，跟随父窗口移动
         */
        const par_win = new BrowserWindow({
            width: 800,
            height: 600,
        })
        par_win.loadURL("https://www.baidu.com")

        const child_win = new BrowserWindow({
            width: 400,
            height: 300,
            parent: par_win
        })
        child_win.loadURL("https://www.baidu.com")
    })
    

    document.getElementById('modalWin').addEventListener('click', () => {
        // 模态
        const par_win = new BrowserWindow({
            width: 800,
            height: 600,
        })
        par_win.loadURL("https://www.baidu.com")

        const child_win = new BrowserWindow({
            width: 400,
            height: 300,
            parent: par_win,
            modal: true
        })
        child_win.loadURL("https://www.baidu.com")
    })

    
    document.getElementById('closeWin').addEventListener('click', () => {
        // 关闭多个窗口
        /**
         * 原理：把多个窗口对象保存起来，关闭的时候分别调用保存对象的close
         */
        if (global.openwindows != undefined) {
            console.log("openwindows not null ");
            console.log(global.openwindows);
            for (var i = 0; i < global.openwindows.length; i ++) {
                console.log(global.openwindows[i]);
                global.openwindows[i].close();
            }
            global.openwindows = []
        }
        
    });

    document.getElementById('createWin').addEventListener('click', () => {
        if (global.openwindows == undefined) {
            console.log("openwindows is null");
            global.openwindows = [];
        }
        const win = new BrowserWindow({
            width: 800,
            height: 600,
        });
       
        win.loadURL("https://www.baidu.com")
        global.openwindows.push(win);
    });
    

    document.getElementById('openChildWin').addEventListener('click', () => {
        // 向子窗口传递数据
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        });
        win.loadFile('./src/chindPage.html');
        ipcRenderer.send('data', {content: "主窗口传递的数据"});
        win.webContents.openDevTools();

        /**
         * 使用ipc通讯发消息让主进程创建窗口
         */
        //  ipcRenderer.send('openChildWin_render');
    });


    document.getElementById('openDialog').addEventListener('click', () => {
        // const option = {
        //     title: "title",
        //     defaultPath: "/",
        //     buttonLabel: "确定",
        //     message: 'message',
        //     properties: ["openFile", "createDirectory"],
        // };

        /**
         * openFile   openDirectory  multiSelections
         * 如果同时选择多个文件和目录，Mac和windows的设置方法不同
         * mac： 如果同时选择多个文件和目录，需要同时指定openFile和openDirectory
         * win: 只需要指定openFile 就可以选择文件和目录，如果指定了openDirectory，不管是否指定openFile，都只能选择目录
         * 
         */
        const option = {
            title: "title", // 设置windows标题
            defaultPath: "/",
            buttonLabel: "确定",
            message: 'message', // 设置Mac标题
            properties: ["openFile", "createDirectory"],
            // 文件过滤类型
            filters: [
                {name: '图像文件', extensions: ['jpg', 'png']},
                {name: '所有文件（*.*）', extensions: ['*']},
            ]
        };

        const result = dialog.showOpenDialog(option).then((value) => {
            console.log(value.filePaths);
        }).catch((err) => {
            console.log('err = ' + err);
        });

        // dialog.showMessageBox
        // dialog.showSaveDialog 保存对话框
    });
    
    // 保存对话框
    document.getElementById('saveDialog').addEventListener('click', () => {
        dialog.showSaveDialog({
            message: "保存对话框",
        })
    });

    // 消息对话框
    document.getElementById('messageDialog').addEventListener('click', () => {
        dialog.showMessageBox({
            title: "信息",
            message: "消息对话框",
            type: 'error'
        })
    });
    
    // 错误对话框
    document.getElementById('errorDialog').addEventListener('click', () => {
        dialog.showErrorBox("错误", "错误信息");
    });

    // windowOpen打开子窗口
    /**
     * url: 要打开页面的链接、本地、web
     */
    document.getElementById('openWin').addEventListener('click', () => {
        window.open('https://www.baidu.com/');
    });

    /**
     * 将数据传递给子窗口
     * win.postMessage
     * eval来执行JavaScript代码
     */


    /**
     * 在窗口中嵌入web页面
     * 1、webView
     * 2、webview的事件
     * 3、在webview中装载页面中执行node.js api
     * 4、webview常用的api
     */
    
    document.getElementById('openWebWin').addEventListener('click', () => {
        const webWin = new BrowserWindow({
            width: 800,
            height: 600,
        })
        webWin.loadFile('./src/web/web.html');
    });


    // 主进程和渲染进程之间的通信
    ipcRenderer.invoke('invoke-message', 'name').then((value) => {
        console.log('invoke-message then = ' + value);
    }).catch((err) => {
        console.log('invoke-message err = ' + err);
    })
})
