const connectdb = require("../db/conectiondb.js")

const createCredential = async (credential) => {
    const {empresa, telefono, direccion} = credential
    try {
        const sqlQuery = `insert into configuracion(empresa, telefono, direccion) VALUES(?, ?, ?);`
        await connectdb.query(sqlQuery, [empresa, telefono, direccion])
        return true
     } catch (error) {
        console.log(error)
        return false
    }
}
const getCredential = async () => {
    try {
        const response = await connectdb.query("select * from configuracion")
        return response[0]
    } catch (error) {
        console.log(error)
    }
}
const updateCredential = async (credential) => {
    const {empresa, telefono, direccion} = credential
    try {
        const sqlQuery = `update configuracion set empresa = ?, telefono = ?, direccion = ?`
        await connectdb.query(sqlQuery, [empresa, telefono, direccion])
        return true
     } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    createCredential,
    getCredential,
    updateCredential,
}