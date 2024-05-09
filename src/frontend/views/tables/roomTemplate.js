import {appendChildList, closeConfirmModal, closeModalForm, setDiv, setInputForm, setTextArea, setTitleOrP, } from "../../../utils/functionsGlobal.js"
import { closeModal } from "../../Components/modal.js"
import { getProcessRequest } from "../../api/processRequest.js"
import { createRoomRequest, deleteRoomRequest, getRoomsByFilterRequest, getRoomsRequest, updateRoomRequest } from "../../api/roomRequest.js"
import roomTable from "../../components/tables/roomTable.js"
import { tablesCountFromHome } from "../home.js"

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
export let roomsOcuppedId = []
export let roomsReservedId = []

async function getDetailOccupedReserved(){
    const stays = await getProcessRequest()
    let staysOcupped = stays.filter(data => data.estado == 0)
    let staysReserved = stays.filter(data => data.estado == 1)
    
    for (const stay of staysOcupped) {
        roomsOcuppedId.push(stay.habitacion_id)
    }
    for (const stay of staysReserved) {
        roomsReservedId.push(stay.habitacion_id)
    }
    console.log(roomsOcuppedId)
    console.log(roomsReservedId)
}

const renderList = async () => {
    getDetailOccupedReserved()
    rooms = await getRoomsRequest()
    div.innerHTML = ""
    titleDiv.appendChild(title)
    appendChildList(div, [
        titleDiv
    ])
    roomTable(div, rooms)  
} 
export const getRoomByState = () =>{
    renderList()
}

export function updateModeRoom(room) {
    const {id, descripcion, montoDia, observacion} = room
    
    idRoom = id
    tfMontoDia.lastElementChild.firstElementChild.value = montoDia
    tfDescripcion.lastElementChild.firstElementChild.value = descripcion
    tfobservacion.lastElementChild.firstElementChild.value = observacion
}

export const updateRoom = async (room) => {
    const response = await updateRoomRequest(room)

    if(!response) throw new Error("error 501")

    idRoom = 0
    renderList()
    clearform()
    closeModal()
}

function clearform(){
    tfMontoDia.lastElementChild.firstElementChild.value = 0
    tfDescripcion.lastElementChild.firstElementChild.value = ""
    tfobservacion.lastElementChild.firstElementChild.value = ""
}

export const createRoom = async(room) =>{
    const response = await createRoomRequest(room)

    if(!response) throw new Error("Error 501")

    renderList()
    clearform()
    closeModal()
    tablesCountFromHome()
}

export const deleteRoom = async(id) => {
    const response = await deleteRoomRequest(id)

    if(!response) throw new Error("no se pudo eliminar los datos")

    renderList()
    closeConfirmModal()
}

export const getRoomsByFilter = async (filter) => {
    roomsFound = await getRoomsByFilterRequest(filter)

    if(!roomsFound) throw new Error("501 error")
    tablesCountFromHome()
}

function roomTemplate(){
    renderList()
    return div
}

export default roomTemplate
 