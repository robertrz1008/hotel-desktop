const conectiondb = require("../db/conectiondb.js")

const getServices = async () =>{
  try {
    const response = await conectiondb.query("select * from servicios")
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

const createService = async (service) =>{
  const { descripcion, monto, observacion } = service
  try{
    const sqlQuery = "insert into servicios(descripcion, monto,observacion) values(?, ?, ?)"
    await conectiondb.query(sqlQuery, [ descripcion, monto,observacion ])
    console.log("Se ha creado nueva Clientes")
    return true
  }catch(error){
    console.log(error)
    return false
  }
}

const deleteService = async (id) =>{
  try {
    const query= ` delete from servicios where id = ?`
    await conectiondb.query(query, [id])
    console.log("producto eliminado con exito")
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const updateServices = async (clients) =>{
  const {id, descripcion, monto, observacion } = clients
  try {
    const sqlQuery = `update servicios set descripcion = ?, monto = ?, observacion = ? where id = ?`
    await conectiondb.query(sqlQuery, [descripcion, monto, observacion, id])
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
const getServicesByFilter = async (filter) =>{
  try {
    const sqlQuery = `select * from servicios where descripcion like "%${filter}%" or observacion like "%${filter}%"`
    const response = await conectiondb.query(sqlQuery)
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getServices,
  getServicesByFilter,
  createService,
  deleteService,
  updateServices
}