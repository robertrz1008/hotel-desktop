export const createStayRequest = (stay) => window.ipcApi.createStay(stay)

export const createDetailRequest = (detail) => window.ipcApi.createDetail(detail)

export const getDetailsByStayRequest = (stayId) => window.ipcApi.getDetailsByStay(stayId)

export const getProcessRequest = () => window.ipcApi.getProcess()

export const getProcessByFilterRequest = (filter) => window.ipcApi.getProcessByFilter(filter)

export const createCredentialRequest = (crendential) => window.ipcApi.createCredential(crendential)
