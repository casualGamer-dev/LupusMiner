
const {app, BrowserWindow} = require('electron');
const appVersion = require('./package.json').version;
const appRepo = require('./package.json').repository;
const os = require('os').platform();
const Si = require("systeminformation")


let mainWindow;



function createWindow () {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
  },
  center: true
  }
  );


  mainWindow.loadFile('index.html');

  mainWindow.webContents.openDevTools();


  mainWindow.on('closed', function () {

    mainWindow = null;
  })
};
const checkForMultipleInstance = () => {
  const gotTheLock = app.requestSingleInstanceLock()

  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', () => {
      
      if (mainWindow) {
        if (!mainWindow.isVisible()) {
          mainWindow.show()
          if (process.platform === 'darwin') {
            app.dock.show()
          }
        }

        if (mainWindow.isMinimized()) {
          mainWindow.restore()
        }

        mainWindow.focus()
      }
    })
  }
}

checkForMultipleInstance()
app.on('ready', ()=> {
  createWindow();
  console.log('appVersion', appVersion);
});




app.on('window-all-closed', function () {
  
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {

  if (mainWindow === null) {
    createWindow()
  }
})





