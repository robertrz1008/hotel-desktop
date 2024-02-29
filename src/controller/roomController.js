const conectiondb = require("../db/conectiondb.js")

const getRooms = async () =>{
  try {
    const response = await conectiondb.query("select * from habitaciones")
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

const createRoom = async (room) =>{
  const { descripcion, montoDia, observacion } = room
  try{
    const sqlQuery = "insert into habitaciones(descripcion, montoDia,observacion) values(?, ?, ?)"
    await conectiondb.query(sqlQuery, [ descripcion, montoDia,observacion ])
    console.log("Se ha creado nueva Clientes")
    return true
  }catch(error){
    console.log(error)
    return false
  }
}

const deleteRoom = async (id) =>{
  try {
    const query= ` delete from habitaciones where id = ?`
    await conectiondb.query(query, [id])
    console.log("habitacion eliminado con exito")
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const updateRoom = async (clients) =>{
  const {id, descripcion, montoDia, observacion } = clients
  try {
    const sqlQuery = `update habitaciones set descripcion = ?, montoDia = ?, observacion = ?, where id = ?`
    await conectiondb.query(sqlQuery, [descripcion, montoDia, observacion, id])
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const getRoomsByFilter = async (filter) =>{
  try {
    const sqlQuery = `select * from habitaciones where descripcion like "%${filter}%" or montoDia like "%${filter}%"`
    const response = await conectiondb.query(sqlQuery)
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getRooms,
  getRoomsByFilter,
  createRoom,
  deleteRoom,
  updateRoom
}