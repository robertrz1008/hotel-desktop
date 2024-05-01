const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('./src/frontend/index.html')
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.maximize()
  })
}


module.exports = {
  createWindow
}