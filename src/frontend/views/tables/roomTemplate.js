import {appendChildList, setDiv, setInputForm, setTextArea, setTitleOrP, } from "../../../utils/functionsGlobal.js"
import { closeModal } from "../../Components/modal.js"
import { getRoomsRequest } from "../../api/roomRequest.js"
import roomTable from "../../components/tables/roomTable.js"

const div = setDiv("area-table-con")
const titleDiv = setDiv("title-con")
const title = setTitleOrP("h3", "Registro de Habitaciones")

//form inputs
export const tfMontoDia = setInputForm("Monto", "number", "agregar Descripcion")
export const tfDescripcion = setTextArea("Descripcion")
export const tfobservacion = setInputForm("Observacion", "text", "agregar Observacion")

export let rooms = []
export let roomsFound = []
export let idRoom;

export function updateModeRoom(service) {
    const {id, descripcion, montoDia, observacion} = service
    
    idRoom = id
    tfMontoDia.lastElementChild.firstElementChild.value = montoDia
    tfDescripcion.lastElementChild.firstElementChild.value = descripcion
    tfobservacion.lastElementChild.firstElementChild.value = observacion
}

export function clearRoomform(){
    tfMontoDia.lastElementChild.firstElementChild.value = 0
    tfDescripcion.lastElementChild.firstElementChild.value = ""
    tfobservacion.lastElementChild.firstElementChild.value = ""
}


export const renderList = async () => {
    rooms = await getRoomsRequest()
    div.innerHTML = ""
    titleDiv.appendChild(title)
    appendChildList(div, [
        titleDiv
    ])
    roomTable(div, rooms)  
} 


export const createRooms = async(service) =>{
    const response = await createClientRequest(service)

    if(!response) throw new Error("Error 501")

    renderList()
    // clearform()
    closeModal()
}

function roomTemplate(){
    renderList()
    return div
}

export default roomTemplate
 