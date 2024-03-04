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




export const renderList = async () => {
    rooms = await getRoomsRequest()
    div.innerHTML = ""
    titleDiv.appendChild(title)
    appendChildList(div, [
        titleDiv
    ])
    roomTable(div, rooms)  
} 



function roomTemplate(){
    renderList()
    return div
}

export default roomTemplate
 