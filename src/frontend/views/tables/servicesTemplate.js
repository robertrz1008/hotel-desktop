import {appendChildList, setDiv, setInputForm, setTextArea, setTitleOrP, } from "../../../utils/functionsGlobal.js"
import { closeModal } from "../../Components/modal.js"
import { getServicesRequest } from "../../api/serviceRequest.js"
import servicesTable from "../../components/tables/serviceTable.js"

const div = setDiv("area-table-con")
const titleDiv = setDiv("title-con")
const title = setTitleOrP("h3", "Registro de Servicios")

//form inputs
export const tfMonto = setInputForm("Monto", "number","")
export const tfDescripcion = setTextArea("Descripcion")
export const tfobservacion = setInputForm("Observacion", "text", "agregar Observacion")

export let services = []
export let servicesFound = []
export let idService;

export function updateModeService(service) {
    const {id, descripcion, monto, observacion} = service
    
    idService = id
    tfMonto.lastElementChild.firstElementChild.value = monto
    tfDescripcion.lastElementChild.firstElementChild.value = descripcion
    tfobservacion.lastElementChild.firstElementChild.value = observacion
    console.log(tfMonto.lastElementChild.firstElementChild.value)
    console.log(tfDescripcion.lastElementChild.firstElementChild.value)
    console.log(tfobservacion.lastElementChild.firstElementChild.value)
}

export function clearServiceform(){
    tfMonto.lastElementChild.firstElementChild.value = 0
    tfDescripcion.lastElementChild.firstElementChild.value = ""
    tfobservacion.lastElementChild.firstElementChild.value = ""
}

export const renderList = async () => {
    services = await getServicesRequest()
    div.innerHTML = ""
    titleDiv.appendChild(title)
    appendChildList(div, [
        titleDiv
    ])
    servicesTable(div, services)  
} 


export const createService = async(service) =>{
    const response = await createClientRequest(service)

    if(!response) throw new Error("Error 501")

    renderList()
    // clearform()
    closeModal()
}

function servicesTemplate(){
    renderList()
    return div
}

export default servicesTemplate
