
const conectiondb = require("../db/conectiondb.js")

const getClients = async () =>{
  try {
    const response = await conectiondb.query("select * from clientes")
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

const createClient = async (client) =>{
  const {cedula, nombre, apellido, direccion, telefono} = client
  try{
    const sqlQuery = "insert into clientes(cedula, nombre, apellido, direccion, telefono) values(?, ?, ?, ?, ?)"
    await conectiondb.query(sqlQuery, [cedula, nombre, apellido, direccion, telefono])
    console.log("Se ha creado nueva Clientes")
    return true
  }catch(error){
    console.log(error)
    return false
  }
}

const deleteClient = async (id) =>{
  try {
    const query= ` delete from clientes where id = ?`
    await conectiondb.query(query, [id])
    console.log("producto eliminado con exito")
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const updateClients = async (clients) =>{
  const {id, cedula, nombre, apellido, direccion, telefono} = clients
  try {
    const sqlQuery = `update clientes set cedula = ?, nombre = ?, apellido = ?, direccion = ?, telefono = ? where id = ?`
    await conectiondb.query(sqlQuery, [cedula, nombre, apellido, direccion, telefono, id])
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const getClientByFilter = async (filter) =>{
  try {
    const sqlQuery = `select * from clientes where cedula like "%${filter}%" or nombre like "%${filter}%"`
    const response = await conectiondb.query(sqlQuery)
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

module.exports={
  getClients,
  getClientByFilter,
  createClient,
  deleteClient,
  updateClients
}