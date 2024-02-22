const {app, ipcMain} = require("electron")
const {createWindow} = require("./main")
const { getClients } = require("./controller/clientController")


app.whenReady().then(() => {
  createWindow()
  console.log("Aplicacion en ejecucion...")

  ipcMain.handle("getClients", getClients)
  ipcMain.handle("getClientsByFilter", (event, area) => getAreaByFilter(area))
  ipcMain.handle("createClient", (event, area) => createArea(area))
  ipcMain.handle("deleteClient", (event, id) => deleteArea(id))
  ipcMain.handle("updateClient", (event, area) => updateArea(area))
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
