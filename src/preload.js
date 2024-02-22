const { contextBridge, ipcRenderer, ipcMain } = require('electron')

contextBridge.exposeInMainWorld('ipcApi', {
  node: () => process.ipcApi.node,
  chrome: () => process.ipcApi.chrome,
  electron: () => process.ipcApi.electron,

  getClients: () => ipcRenderer.invoke("getClients"),
  getClientByFilter: (filter) => ipcRenderer.invoke("getClientByFilter", filter),
  createClient: (client) => ipcRenderer.invoke("createClient", client),
  deleteClient: (id) => ipcRenderer.invoke("deleteClient", id),
  updateClient: (area) => ipcRenderer.invoke("updateClient", area)
})
