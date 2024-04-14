import {appendChildList, openConfirmModal, setButton, setDiv, setInputForm, setInputSelect, setTextArea, setTitleOrP, setTogleButton, } from "../../../utils/functionsGlobal.js"
import { createDetailRequest, createStayRequest, getProcessRequest} from "../../api/processRequest.js"
import processMsg from "../../components/confirmContext/processMessage.js"
import detailForm from "../../components/form/detailForm.js"
import stayForm from "../../components/form/stayForm.js"
import detailServicesList from "../../components/list/detailServiceList.js"
import clientModalSearch from "../../components/modalSearch/clientModalSearch.js"
import roomModalSearch from "../../components/modalSearch/roomModalSearch.js"
import processTable from "../../components/tables/processTable.js"

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
//detailForm
export const tbIsActive = setTogleButton("Activo")
export const btnAdd = setButton("Guardar", "process-btn-add")
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
        subtotal: item.cantidad * item.monto
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
    clientText.textContent = "Cliente"
    roomText.textContent = "habitacion"
    inputSelect.value = "0"
    tfObservacion.lastElementChild.firstElementChild.value = ""
    clientSelectId = 0
    roomtSelectId = 0
    detailServices = []
}
const renderList = async () => {
    stays = await getProcessRequest()
    processTableDiv.innerHTML = ""
    console.log(stays)
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

    if(detailServices.length == 0) return 

    for (const detail of detailServices) {
        const response = await createDetailRequest({
            estadia_id: stayId,
            servicio_id: detail.id,
            costo: detail.monto,
            subtotal: detail.subtotal,
            cantidad: detail.cantidad
        })
        if(!response) break
        btnAdd.textContent = "Guardar"
        renderList()
    }
    //luego de crear la la transaccion
    clear()
    detailServicesList(table, tbody, detailServices)
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
function handleSubmit(){
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
 