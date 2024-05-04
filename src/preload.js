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

  getServices: () => ipcRenderer.invoke("getServices"),
  getServicesbyFilter: (filter) => ipcRenderer.invoke("getServicesByFilter", filter),
  createService: (service) => ipcRenderer.invoke("createService", service),
  deleteService: (id) => ipcRenderer.invoke("deleteService", id),
  updateService: (service) => ipcRenderer.invoke("updateService", service),

  getRooms: () => ipcRenderer.invoke("getRooms"),
  getRoomsByFilter: (filter) => ipcRenderer.invoke("getRoomsByFilter", filter),
  createRoom: (room) => ipcRenderer.invoke("createRoom", room),
  deleteRoom: (id) => ipcRenderer.invoke("deleteRoom", id),
  updateRoom: (room) => ipcRenderer.invoke("updateRoom", room),
  changeRoomState: (state) => ipcRenderer.invoke("changeRoomState", state),

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

  createCredential: ( credential) =>  ipcRenderer.invoke("createCredential", credential),
  getCredential: () =>  ipcRenderer.invoke("getCredential"),
  updateCredential: ( credential) =>  ipcRenderer.invoke("updateCredential", credential),
  clientsListed: (filter) => ipcRenderer.invoke("clientsListed", (filter)),
  
  clientReport: (route, credential, clients) =>  ipcRenderer.invoke("clientReport", route, credential, clients),
})
