import {appendChildList, setDiv, setInputForm, setTitleOrP, } from "../../../utils/functionsGlobal.js"
import { openModal, closeModal } from "../../Components/modal.js"
import { closeCnfModal } from "../../Components/comfirmModal.js"
import { getClientsRequest,createClientRequest } from "../../api/clientRequest.js"
import clientsTable from "../../components/tables/clientTable.js"

const div = setDiv("area-table-con")
const titleDiv = setDiv("title-con")
const title = setTitleOrP("h3", "Registro de Areas")

//form inputs
export const tfCedula = setInputForm("Cedula", "text", "agregar Descripcion")
export const tfNombre = setInputForm("Nombre", "text", "agregar Observacion")
export const tfApellido = setInputForm("Apellido", "text", "agregar Observacion")
export const tfDireccion = setInputForm("Direccion", "text", "agregar Observacion")
export const tfTelefono = setInputForm("Telefono", "text", "agregar Observacion")

export let clientsList = []
export let clientsFound = []
export let idClient;


export function updateMode(client) {
    const {id, cedula, nombre, apellido, direccion, telefono} = client
    
    idClient = id
    tfCedula.lastElementChild.firstElementChild.value = cedula
    tfNombre.lastElementChild.firstElementChild.value = nombre
    tfApellido.lastElementChild.firstElementChild.value = apellido
    tfDireccion.lastElementChild.firstElementChild.value = direccion
    tfTelefono.lastElementChild.firstElementChild.value = telefono
}

export function clearform(){
    tfCedula.lastElementChild.firstElementChild.value = ""
    tfNombre.lastElementChild.firstElementChild.value = ""
    tfApellido.lastElementChild.firstElementChild.value = ""
    tfDireccion.lastElementChild.firstElementChild.value = ""
    tfTelefono.lastElementChild.firstElementChild.value = ""
}

// export const deleteArea = async (id) => {
//     const response = await deleteAreaRequest(id)

//     if(!response) throw new Error("Hubo un problema al realizar la peticion a la db")

//     renderList()
//     closeCnfModal()
// }

// export const getAreaByFilter = async (filter) => {
//     areasFound = await getAreaByFilterRequest(filter)
//     if(!areasFound) throw new Error("no se ha encontrado resultado")

//     return console.log(areasFound)
// }

// export const updateArea = async (area) => {
//     const response = await updateAreaRequest(area)

//     if(!response) throw new Error("Hubo un problema al realizar la peticion a la db")

//     codigoArea = 0;
//     renderList()
//     clearform()
//     closeModal()
// }

export const renderList = async () => {
    clientsList = await getClientsRequest()
    console.log("renderizando areas")
    div.innerHTML = ""
    titleDiv.appendChild(title)
    appendChildList(div, [
        titleDiv
    ])
    clientsTable(div, clientsList)  
} 


export const createClient = async(client) =>{
    const response = await createClientRequest(client)

    if(!response) throw new Error("Error 501")

    renderList()
    // clearform()
    closeModal()
}

export const openModalForm = (form) => {
    openModal(form)
}
export const closeModalForm = () => {
    closeModal()
}


function clientTableTemplate(){
    renderList()
    return div
}

export default clientTableTemplate 
