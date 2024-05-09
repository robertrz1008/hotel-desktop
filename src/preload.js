const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('ipcApi', {
  node: () => process.ipcApi.node,
  chrome: () => process.ipcApi.chrome,
  electron: () => process.ipcApi.electron,
  //crud
  getClients: () => ipcRenderer.invoke("getClients"),
  getClientByFilter: (filter) => ipcRenderer.invoke("getClientsByFilter", filter),
  createClient: (client) => ipcRenderer.invoke("createClient", client),
  deleteClient: (id) => ipcRenderer.invoke("deleteClient", id),
  updateClient: (area) => ipcRenderer.invoke("updateClient", area),
  verifyCedula: (cedula) => ipcRenderer.invoke("verifyCedula", cedula),
  verifyTelephone: (telefono) => ipcRenderer.invoke("verifyTelephone", telefono),
  clientsListed: (filter) => ipcRenderer.invoke("clientsListed", (filter)),

  getServices: () => ipcRenderer.invoke("getServices"),
  getServicesbyFilter: (filter) => ipcRenderer.invoke("getServicesByFilter", filter),
  createService: (service) => ipcRenderer.invoke("createService", service),
  deleteService: (id) => ipcRenderer.invoke("deleteService", id),
  updateService: (service) => ipcRenderer.invoke("updateService", service),
  servicesListed: (filter) => ipcRenderer.invoke("servicesListed", (filter)),

  getRooms: () => ipcRenderer.invoke("getRooms"),
  getRoomsByFilter: (filter) => ipcRenderer.invoke("getRoomsByFilter", filter),
  createRoom: (room) => ipcRenderer.invoke("createRoom", room),
  deleteRoom: (id) => ipcRenderer.invoke("deleteRoom", id),
  updateRoom: (room) => ipcRenderer.invoke("updateRoom", room),
  changeRoomState: (state) => ipcRenderer.invoke("changeRoomState", state),
  roomsListed: (filter) => ipcRenderer.invoke("roomsListed", (filter)),

  createStay: (stay, state) => ipcRenderer.invoke("createStay", stay, state),
  updateStay: (stay) => ipcRenderer.invoke("updateStay", stay),
  setStayFinalized: (stay) => ipcRenderer.invoke("setStayFinalized", stay),
  getStays: () => ipcRenderer.invoke("getStays"),
  createDetail: (detail) => ipcRenderer.invoke("createDetail", detail),
  getDetailsByStay: (stayId) => ipcRenderer.invoke("getDetailsByStay", stayId),
  deleteDetail: (id) => ipcRenderer.invoke("deleteDetail", id),
  updateAmountDetail: (detail) => ipcRenderer.invoke("updateAmountDetail", detail),
  getProcess: () => ipcRenderer.invoke("getProcess"),
  getProcessByStatus: (status) => ipcRenderer.invoke("getProcessByStatus", (status)),
  getProcessByFilter: (filter) => ipcRenderer.invoke("getProcessByFilter", (filter)),
  staysListed: (filter) => ipcRenderer.invoke("staysListed", (filter)),

  createCredential: ( credential) =>  ipcRenderer.invoke("createCredential", credential),
  getCredential: () =>  ipcRenderer.invoke("getCredential"),
  updateCredential: ( credential) =>  ipcRenderer.invoke("updateCredential", credential),
  
  clientReport: (route, credential, clients) =>  ipcRenderer.invoke("clientReport", route, credential, clients),
  roomsReport: (route, credential, clients) =>  ipcRenderer.invoke("roomsReport", route, credential, clients),
  servicesReport: (route, credential, clients) =>  ipcRenderer.invoke("servicesReport", route, credential, clients),
  staysDetailedReport: (route, credential, stays) =>  ipcRenderer.invoke("staysDetailedReport", route, credential, stays),
  staysSummarizedReport: (route, credential, stays) =>  ipcRenderer.invoke("staysSummarizedReport", route, credential, stays),

})
