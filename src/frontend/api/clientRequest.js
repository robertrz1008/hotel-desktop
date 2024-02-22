
export const getClientsRequest = () => window.ipcApi.getClients()

export const getClientByFilterRequest = (filter) => window.ipcApi.getClientByFilter(filter)

export const createClientRequest = (clients) => window.ipcApi.createClient(clients)

export const deleteClientRequest = (id) => window.ipcApi.deleteClient(id)

export const updateClientRequest = (client) => window.ipcApi.updateClient(client)