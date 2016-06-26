/**
 * @file main
 * @author leon<ludafa@kavout.com>
 */

const electron = require('electron');
const {nativeImage, ipcMain, app, BrowserWindow, Tray, Menu} = electron;

let win;
let tray;

function createWindow() {

    win = new BrowserWindow({
        witdh: 800,
        height: 600
    });

    win.loadURL(`file://${__dirname}/index.html`);

    win.webContents.openDevTools();

    win.on('closed', function () {
        win = null;
    });

}

app.on('ready', function () {

    createWindow();

    tray = new Tray(`${__dirname}/src/img/icon.png`);

    const menu = Menu.buildFromTemplate([{
        label: 'Item1', type: 'radio'
    }]);

    tray.setToolTip('this is scalar');

    tray.setContextMenu(menu);

});

app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') {
        app.quit();
    }

});

app.on('activate', function () {

    if (win === null) {
        createWindow();
    }

});

ipcMain.on('tray-update', function (e, dataURL) {
    tray.setImage(nativeImage.createFromDataURL(dataURL));
});

// const cavnas = remote.require(`${__dirname}/src/web/canvas.js`);
//
// console.log(canvas.hello());
