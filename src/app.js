const {app, ipcMain} = require("electron")
const {createWindow} = require("./main")
const clientController = require("./controller/clientController")
const serviceController = require("./controller/serviceController")
const roomsController = require("./controller/roomController")
const verifyController = require("./controller/verifyController")


app.whenReady().then(() => {
  createWindow()
  console.log("Aplicacion en ejecucion...")

  ipcMain.handle("getClients", clientController.getClients) 
  ipcMain.handle("getClientsByFilter", (event, client) => clientController.getClientByFilter(client))
  ipcMain.handle("createClient", (event,  client) => clientController.createClient(client))
  ipcMain.handle("deleteClient", (event, id) => clientController.deleteClient(id))
  ipcMain.handle("updateClient", (event, area) => clientController.updateClients(area))
  ipcMain.handle("verifyCedula", (event, cedula) => verifyController.isCedula(cedula))
  ipcMain.handle("verifyTelephone", (event, telefono) => verifyController.isTelephone(telefono))

  ipcMain.handle("getServices", () => serviceController.getServices() )

  ipcMain.handle("getRooms", () => roomsController.getRooms())


  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
