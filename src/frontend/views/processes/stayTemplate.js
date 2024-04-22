import {appendChildList, openConfirmModal, setButton, setDiv, setInputForm, setInputSelect, setTextArea, setTitleOrP, setTogleButton, } from "../../../utils/functionsGlobal.js"
import { createDetailRequest, createStayRequest, getDetailsByStayRequest, getProcessByStatusRequest, getProcessRequest, updateRoomStateRequest, updateStayRequest} from "../../api/processRequest.js"
import processMsg from "../../components/confirmContext/processMessage.js"
import detailForm from "../../components/form/detailForm.js"
import stayForm from "../../components/form/stayForm.js"
import detailServicesList from "../../components/list/detailServiceList.js"
import clientModalSearch from "../../components/modalSearch/clientModalSearch.js"
import roomModalSearch from "../../components/modalSearch/roomModalSearch.js"
import processTable from "../../components/tables/processTable.js"
import { getRoomByState } from "../tables/roomTemplate.js"


const div = setDiv("area-table-con")
const titleDiv = setDiv("title-con")
const processDiv = setDiv("process-con")
const title = setTitleOrP("h3", "Transaccion-Estadias") 
const formDiv = setDiv("process-form-con")
const formServicesDiv = setDiv("process-formser-con")
const processTableDiv = setDiv("process-table-div")
//form inputs
export const entryP = setTitleOrP("h4", "Entada")
export const exitP = setTitleOrP("h4", "Salida")
export const entryDate = setDiv("inp-date")
export const exitDate = setDiv("inp-date")
export const clientInput = setDiv("stay-input-div")
export const clientBtn = setButton("buscar", "process-btn")
export const clientText = setTitleOrP("h4", "Cliente")
export const roomInput = setDiv("stay-input-div")
export const roomBtn = setButton("buscar", "process-btn")
export const addServiceBtn = setButton("agregar", "process-btn")
export const roomText = setTitleOrP("h4", "habitacion")
export const tfObservacion = setTextArea()
export const inputSelect = setInputSelect([
    { value: "0", name: "Ocupado"},
    { value: "1", name: "Reservado"},
    { value: "2", name: "Anulado"},
    { value: "3", name: "Finalizado"},
])
export const stayfilterSelect = setInputSelect([
    { value: "", name: "Todos"},
    { value: "0", name: "Ocupados"},
    { value: "1", name: "Reservados"},
    { value: "2", name: "Anulados"},
    { value: "3", name: "Finalizados"},
])
//detailForm
export const tbIsActive = setTogleButton("Activo")
export const btnAdd = setButton("Guardar", "process-btn-submit")
export const btnClear = setButton("Limpiar", "process-btn-reset")
let monto = 0
export const moneyP = setTitleOrP("h3", "GS "+monto)

export const Tablediv = setDiv("process-table-con")
export const table = document.createElement("table")
export const tHead = document.createElement("thead")
export const tbody = document.createElement("tbody")


let clientSelectId = 0;
let roomtSelectId = 0;
// detail service
let detailServices= []
//procesos
let stays = []
let updateMode = false;
let stayState;
let stayId;
//para cargar los campos de cliente y habitacion
function clientNameSelect(client){
    clientText.textContent = client.name
    clientSelectId = client.id
}
//se le suma la cantidad del servicio del detalle
function roomNameSelect(room){
    roomText.textContent = room.name
    roomtSelectId = room.id
}

//detail service functions
function detailSubtotal(){
    detailServices = detailServices.map((item) => ({
        ...item,
        subtotal: item.cantidad * item.costo
    }))
}
function detailAddCantidad(p) {
    for (const i of detailServices) {
        if(i.id == p.id){
            i.cantidad += 1
        }
    }
}
function montoSum(arr){
    monto = arr.reduce((cc, el) => cc + el.subtotal, 0)
    moneyP.textContent = "GS "+monto 
}
function addService(serviceSelect){
    //si se selecciona el mismo servicio 
    const test = detailServices.some(x => x.id == serviceSelect.id)

    if(test) {
        detailAddCantidad(serviceSelect)
    }else{
        detailServices.push(serviceSelect)
    }
    detailSubtotal()
    detailServicesList(table, tbody, detailServices)
    montoSum(detailServices)
}
export function deleteDetailService(id){
    detailServices = detailServices.filter(data => data.id != id)
    detailServicesList(table, tbody, detailServices)
    montoSum(detailServices)
}
export function updateAmountDetail(id, amount){
    for (const service of detailServices) {
        if(service.id == id){
            service.cantidad = parseInt(amount)
        }
    }
    detailSubtotal()
    detailServicesList(table, tbody, detailServices)
    montoSum(detailServices)
}
//process functions
function clear() {
    updateMode = false
    clientText.textContent = "Cliente"
    roomText.textContent = "habitacion"
    inputSelect.value = "0"
    tfObservacion.lastElementChild.firstElementChild.value = ""
    clientSelectId = 0
    roomtSelectId = 0
    detailServices = []
    //limpiar la tabla de servicios
    detailServicesList(table, tbody, detailServices)
    renderList()
    btnAdd.textContent = "Guardar"
    stayId = 0;
    stayState = ""
}
const renderList = async () => {
    stays = await getProcessRequest()
    processTableDiv.innerHTML = ""
    processTable(processTableDiv, stays) 
}
const renderListByStatus = async (data) => {
    stays = await getProcessByStatusRequest(data)
    processTableDiv.innerHTML = ""
    processTable(processTableDiv, stays) 
}
async function createProcess(){
    btnAdd.textContent = "Procesando..."
    const stay = {
        cli_id: clientSelectId,
        hab_id: roomtSelectId,
        total: monto,
        estado: inputSelect.value,
        observacion: tfObservacion.lastElementChild.firstElementChild.value
    }
    const stayresponse = await createStayRequest(stay)
    const stayId = stayresponse[0].id


    //cambiando el estado de la habitacion
    let stateN;
    if(inputSelect.value == 0) stateN = 3
    if(inputSelect.value == 1) stateN = 2
    await updateRoomStateRequest({
        id: roomtSelectId,
        state: stateN
    })
    getRoomByState()

    if(detailServices.length == 0) return clear()

    console.log("procesando servicios")
    //creaando los detalles de servicio
    for (const detail of detailServices) {
        const response = await createDetailRequest({
            estadia_id: stayId,
            servicio_id: detail.id,
            costo: detail.costo,
            subtotal: detail.subtotal,
            cantidad: detail.cantidad
        })
        if(!response) break
        clear()
    }
    //luego de crear la la transaccion
    clear()
}
function validateProcess(){
    // se valida el cliente y la habitacion 
    if(clientSelectId == 0){
        openConfirmModal(processMsg("Selecciona un cliente para crear la transaccion"))
        return false
    }
    if(roomtSelectId == 0){
        openConfirmModal(processMsg("Selecciona una habitacion para crear la transaccion"))
        return false
    }
    return true
}

export async function udpateProcessMode(process){
    updateMode = true
    stayState = process.estado
    stayId = process.id

    // entryP.textContent = process.entrada
    roomtSelectId = process.habitacion_id
    clientText.textContent = process.nombre+" "+process.apellido
    roomText.textContent = process.descripcion
    clientBtn.disabled = true
    roomBtn.disabled = true
    inputSelect.value = "0"
    tfObservacion.lastElementChild.firstElementChild.value = process.observacion

    if(process.estado == "0"){
        stayState = "Ocupado"
    }
    if(process.estado == "1"){
        stayState = "Reservado"
    }
    //costo de la transaccion
    monto = process.total
    moneyP.textContent = "GS "+monto 
    // cargando detalles servicios
    detailServices = await getDetailsByStayRequest(process.id)
    detailServicesList(table, tbody, detailServices)
}

async function processFinalized(){
    await updateStayRequest({
        id: stayId,
        estado: inputSelect.value
    })
    await updateRoomStateRequest({
        id: roomtSelectId,
        state: 1
    })
    getRoomByState()
    clear()
    console.log("proceso finalizado")
}
async function processAnuled(){
    await updateStayRequest({
        id: stayId,
        estado: inputSelect.value
    })
    await updateRoomStateRequest({
        id: roomtSelectId,
        state: 1
    })
    getRoomByState()
    clear()
    console.log("proceso anulado")
}

async function updateProcessOccuped(){
    //finaliza el processo
    if(inputSelect.value = "3") processFinalized()
}
async function updateProcessReserved(){
    //finaliza el processo
    if(inputSelect.value = "2") processAnuled()
}
function handleUpdateProcess(){
    if(stayState == "Ocupado") return updateProcessOccuped()
    if(stayState == "Reservado") return updateProcessReserved()
} 

function handleSubmit(){
    if(updateMode) return handleUpdateProcess()

    if(!validateProcess()) return
    createProcess()
}

//events
clientBtn.addEventListener("click", ()=> {
    openConfirmModal(clientModalSearch({
        clientNameSelect
    }))
})
roomBtn.addEventListener("click", () => {
    openConfirmModal(roomModalSearch({
        roomNameSelect
    }))
})
btnAdd.addEventListener("click", () => {
    handleSubmit()
})
btnClear.addEventListener("click", () => {
    clear()
})
stayfilterSelect.addEventListener("change", (e) => {
    if(stayfilterSelect.value == "") return renderList()
    renderListByStatus(e.target.value)
})


const renderForm = async () => {
    // rooms = await getRoomsRequest()
    div.innerHTML = ""
    titleDiv.appendChild(title)

    stayForm(formDiv)
    detailForm({
        formServicesDiv,
        addService,
        detailServices
    })
    
    appendChildList(processDiv,[
        formDiv,
        formServicesDiv,
        processTableDiv,
    ])
    appendChildList(div, [
        titleDiv,
        processDiv
    ])
} 

function stayProcessTemplate(){
    renderForm()
    renderList()
    return div
}

export default stayProcessTemplate
 