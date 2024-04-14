const connectdb = require("../db/conectiondb")

const createStay = async (stay) =>{
    const {cli_id, hab_id, total, estado, observacion} = stay
    try {
        const sqlQuery = `insert into estadias(cli_id, hab_id, total, estado, observacion) values(?, ?, ?, ?, ?)`
        await connectdb.query(sqlQuery, [cli_id, hab_id, total, estado, observacion]);
        const response = await connectdb.query("select max(id) AS 'id' from estadias;")
        return response[0]
    } catch (error) { 
        console.log(error)
    }
}
const getStays = async () => {
    try {
        const response = connectdb.query("select * from estadias")
        return response[0]
    } catch (error) {
        console.log(response)
    }
}

const createDetail = async (detail) => {
    const {estadia_id, servicio_id, costo, subtotal, cantidad} = detail
    console.log(detail)
    try {
        const sqlQuery = ` insert into detalles(estadia_id, servicio_id, costo, subtotal, cantidad) values(?, ?, ?, ?, ?);`
        await connectdb.query(sqlQuery, [estadia_id, servicio_id, costo, subtotal, cantidad])
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
const getDetails = async () => {
    try {
        const response = connectdb.query("select * from detalles")
        return response[0]
    } catch (error) {
        console.log(response)
    }
}

const getProcess = async () => {
    const sqlQuery = `
    select es.id, cli.nombre, cli.apellido, cli.cedula, hab.descripcion, es.entrada, es.estado, es.entrada, es.salida, es.observacion AS "est_observacion", es.total
    from estadias as es 
        JOIN clientes as cli
    on es.cli_id = cli.id
        JOIN habitaciones as hab 
    on es.hab_id = hab.id
    order by id;
    `
    try {
        const response = await connectdb.query(sqlQuery)
        return response[0]
    } catch (error) {
        console.log(error)
    }
}
const getProcessByFilter = async (filter) => {
    const sqlQuery = `
   select es.id, cli.nombre, cli.apellido, cli.cedula, hab.descripcion, es.entrada, es.estado, es.entrada, es.salida, es.observacion AS "est_observacion", es.total
    from estadias as es 
        JOIN clientes as cli
    on es.cli_id = cli.id
        JOIN habitaciones as hab 
    on es.hab_id = hab.id
    where cli.nombre like "%${filter}%"`
    try {
        const response = await connectdb.query(sqlQuery)
        return response[0]
    } catch (error) {
        console.log(error)
    }
}
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

module.exports = {
    createStay,
    getDetails,
    createDetail,
    getProcess,
    getProcessByFilter,
    getStays,
    createCredential
}