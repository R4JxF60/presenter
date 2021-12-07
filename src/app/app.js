const { validate } = require('./lib/utility/validate.js');
const electron = require('electron');
const fs = require('fs');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
let controlWindow;
let slideShowWindow;
let parentPath;

const present = () => {
    controlWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            devTools: true,
        },
        show: true,
        icon: `${__dirname}/icon/presenter.ico`
    });
    slideShowWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            backgroundThrottling: false,
            devTools: true
        },
        icon: `${__dirname}/icon/presenter.ico`,
        //fullscreen: true,
        show: true
    })
    controlWindow.loadFile(`${__dirname}/controlWindow/controlWindow.html`);
    slideShowWindow.loadFile(`${__dirname}/slideShowWindow/slideShowWindow.html`);
    mainWindow.hide();

    controlWindow.once('closed', () => {
        handleClose();
    });

    slideShowWindow.once('closed', () => {
        handleClose();
    })
}

const handleClose = () => {
    if(slideShowWindow && !slideShowWindow.isDestroyed()) 
        slideShowWindow.close();
    if(controlWindow && !controlWindow.isDestroyed()) 
        controlWindow.close();
    mainWindow.show();
    slideShowWindow = null;
    controlWindow = null;
}

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,        
            enableRemoteModule: true,
            devTools: true
        },
        icon: `${__dirname}/icon/presenter.ico`
    });
    mainWindow.loadFile(`${__dirname}/mainWindow/mainWindow.html`);

    let validatedJsonData;
    ipcMain.on('json-file-path', (event, path) => {
        try {
            let rawData = fs.readFileSync(path);
            parentPath = path.substring(0, path.lastIndexOf('\\')+1);
            let jsonData = JSON.parse(rawData);
            jsonData = Object.assign({}, jsonData, {filename: path.substring(path.lastIndexOf('\\')+1), parentPath: parentPath});
            if(validate(jsonData)) {
                validatedJsonData = jsonData;
                present();
            }
        }catch(err) {
            console.log(err.message);
        }  
    });

    ipcMain.handle('get:file-info', async () => {
        return validatedJsonData;
    });

    ipcMain.on('post:slide-info', (event, slideNo) => {
        controlWindow.webContents.send('post:slide-info', validatedJsonData.slides[0][slideNo]);
        slideShowWindow.webContents.send('post:slide-info', validatedJsonData.slides[0][slideNo]);
        console.log(slideNo);
    });

    ipcMain.on('post:pause', () => {
        slideShowWindow.hide();
    });

    ipcMain.on('post:play', () => {
        slideShowWindow.show();
    });

    ipcMain.on('post:end', () => {
        handleClose();
    });
})