const {app, ipcMain} = require("electron")
const {createWindow} = require("./main")
const clientController = require("./controller/clientController")
const serviceController = require("./controller/serviceController")
const roomsController = require("./controller/roomController")
const verifyController = require("./controller/verifyController")
const processController = require("./controller/processController")
const settingController = require("./controller/settingController")
const PDFBuild = require("./lib/pdfKit")


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
  ipcMain.handle("clientsListed", (event, filter) => clientController.clientsListed(filter))

  ipcMain.handle("getServices", () => serviceController.getServices() )
  ipcMain.handle("createService", (event,service) => serviceController.createService(service))
  ipcMain.handle("deleteService", (event,id) => serviceController.deleteService(id))
  ipcMain.handle("updateService", (event,service) => serviceController.updateServices(service))
  ipcMain.handle("getServicesByFilter", (event,filter) => serviceController.getServicesByFilter(filter))
  ipcMain.handle("servicesListed", (event, filter) => serviceController.servicesListed(filter))

  ipcMain.handle("getRooms", () => roomsController.getRooms())
  ipcMain.handle("getRoomsByFilter", (event, filter) => roomsController.getRoomsByFilter(filter))
  ipcMain.handle("createRoom", (event, room) => roomsController.createRoom(room))
  ipcMain.handle("deleteRoom", (event, id) => roomsController.deleteRoom(id))
  ipcMain.handle("updateRoom", (event, room) => roomsController.updateRoom(room))
  ipcMain.handle("changeRoomState", (event, state) => roomsController.changeRoomState(state))
  ipcMain.handle("roomsListed", (event, filter) => roomsController.roomsListed(filter))

  ipcMain.handle("createStay", (event, stay, state) => processController.createStay(stay, state))
  ipcMain.handle("updateStay", (event, stay) => processController.updateStay(stay))
  ipcMain.handle("setStayFinalized", (event, stay) => processController.setStayFinalized(stay))
  ipcMain.handle("createDetail", (event, detail) => processController.createDetail(detail))
  ipcMain.handle("getStays", () => processController.getStays())
  ipcMain.handle("getDetailsByStay", (event, stayId) => processController.getDetailsByStay(stayId))
  ipcMain.handle("updateAmountDetail", (event, detail) => processController.updateAmountDetail(detail))
  ipcMain.handle("deleteDetail", (event, id) => processController.deleteDetail(id))
  ipcMain.handle("getProcess", () => processController.getProcess())
  ipcMain.handle("getProcessByStatus", (event, status) => processController.getProcessByStatus(status))
  ipcMain.handle("getProcessByFilter", (event, filter) => processController.getProcessByFilter(filter))
  ipcMain.handle("staysListed", (event, filter) => processController.staysListed(filter))

  ipcMain.handle("createCredential", (event, crendetial) => settingController.createCredential(crendetial))
  ipcMain.handle("getCredential", () => settingController.getCredential())
  ipcMain.handle("updateCredential", (event, crendetial) => settingController.updateCredential(crendetial))
  ipcMain.handle("clearDB", () => settingController.clearDB())

  //PDFBuild
  ipcMain.handle("clientReport", (event, route, credential, clients) => PDFBuild.clientReport(route, credential, clients))
  ipcMain.handle("roomsReport", (event, route, credential, clients) => PDFBuild.roomsReport(route, credential, clients))
  ipcMain.handle("servicesReport", (event, route, credential, clients) => PDFBuild.servicesReport(route, credential, clients))
  ipcMain.handle("staysDetailedReport", (event, route, credential, clients) => PDFBuild.staysDetailedReport(route, credential, clients))
  ipcMain.handle("staysSummarizedReport", (event, route, credential, clients) => PDFBuild.staysSummarizedReport(route, credential, clients))
  ipcMain.handle("detailservicesReport", (event, route, credential, stays, detailServices) => PDFBuild.detailservicesReport(route, credential, stays, detailServices))

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow() 
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
