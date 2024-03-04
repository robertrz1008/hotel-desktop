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

  getRooms: () => ipcRenderer.invoke("getRooms"),
})
