/**
 * @file main
 * @author leon<ludafa@kavout.com>
 */

const electron = require('electron');
const {nativeImage, ipcMain, app, BrowserWindow, Tray} = electron;

let win;
let tray;

function createWindow() {

    win = new BrowserWindow({
        witdh: 800,
        height: 600,
        frame: false,
        show: false,
        transparent: true
    });

    win.loadURL(`file://${__dirname}/index.html`);

    win.webContents.openDevTools();

    win.on('closed', function () {
        win = null;
    });

    win.on('blur', function () {
        if (!win.webContents.isDevToolsFocused()) {
            win.hide();
        }
    });

}

app.on('ready', createWindow);

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

    const image = nativeImage.createFromDataURL(dataURL);

    if (!tray) {

        tray = new Tray(image);

        tray.on('click', function (e, bounds) {

            const {x, y, width, height} = bounds;

            if (win.isVisible()) {
                win.hide();
            }
            else {
                win.setBounds({
                    width: 500,
                    height: 500,
                    x: x + (width - 500) / 2,
                    y: y + height
                }, true);
                win.show();
            }

        });

    }
    else {
        tray.setImage(image);
    }


});

// const cavnas = remote.require(`${__dirname}/src/web/canvas.js`);
//
// console.log(canvas.hello());
