const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    minWidth: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('./src/frontend/index.html')

}


module.exports = {
  createWindow
}