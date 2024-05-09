import { appendChildList, closeModalForm, openModalForm, setButton, setDiv, setInputForm, setInputSelect, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { getClientListedRequest } from "../../api/clientRequest.js"
import { getDetailsByStayRequest, getStaysListedRequest } from "../../api/processRequest.js"
import { staysDetailedReportRequest, staysSummarizedReportRequest } from "../../api/reportPDFRequest.js"
import staysDetiledReport from "../../components/ModalInfo/stayDetailedReport.js"
import staysSummarizedReport from "../../components/ModalInfo/staySummarizedReport.js"

export async function detailServiceReportBuild(stay){
    const detailServices = await getDetailsByStayRequest(stay.id)
    console.log(stay)
    console.log(detailServices)
}

function stayReportTemplate(){
    const div = setDiv("area-table-con")
    const titleDiv = setDiv("title-con")
    const title = setTitleOrP("h3", "Iforme de Movimientos")

    const formDiv = setDiv("listed-form-con")

    const rangoDiv = setDiv("form-rango-con")
    const rengoTitle = setTitleOrP("h4", "Filtros")
    const rangoDivClient = setDiv("form-rangosub-con")
    const rangoDivId = setDiv("form-rangosub-con")
    const rangoDivRoom = setDiv("form-rangosub-con")
    const rangoDivFechaTitle = setTitleOrP("h4", "Fecha")
    const rangoDivClientTitle = setTitleOrP("h4", "Cliente")
    const rangoDivRoomTitle = setTitleOrP("h4", "Habitacion")
    const tfRoomDesde = setInputForm("Desde", "text", "")
    const tfRoomHasta = setInputForm("Hasta", "text", "")
    const tfFechaDesde = setInputForm("Hasta", "date", "")
    const tfFechaHasta = setInputForm("Hasta", "date", "")
    const tfClienteDesde = setInputForm("Desde", "text", "")
    const tfClienteHasta = setInputForm("Hasta", "text", "")
    const stateTitle = setTitleOrP("h4", "Estado")
    const stateSelect = setInputSelect([
        {value: "4", name: "Todo"},
        {value: "0", name: "Ocupado"},
        {value: "1", name: "Reservado"},
        {value: "2", name: "Anulado"},
        {value: "3", name: "Finalizado"},
    ])
    const typeTitle = setTitleOrP("h4", "Tipo")
    const typeSelect = setInputSelect([
        {value: "1", name: "Detallado"},
        {value: "2", name: "Resumido"},
    ])
    const ordenTitle = setTitleOrP("h4", "Ordenamiento")
    const selectDiv = setDiv("form-select-con")
    const select1div = setDiv("form-select-con")
    const selectDiv1 = setDiv("lidted-form-select-div")
    const selectDiv2 = setDiv("lidted-form-select-div")
    const selectDiv0 = setDiv("lidted-form-select-div")
    const typeselectDiv = setDiv("lidted-form-select-div")
    const inputSelect = setInputSelect([
        {value: "1", name: "id"},
        {value: "2", name: "cliente"},
        {value: "3", name: "habitacion"},
        {value: "4", name: "Monto Total"},
        {value: "5", name: " fecha"}
    ])
    const inputSelectOrder = setInputSelect([
        {value: "1", name: "Ascendente"},
        {value: "2", name: "Descendente"},
    ])
    const btnDiv1 = setDiv("listed1-btn-con")
    const btnDiv = setDiv("listed-btn-con")
    const btnAdd = setButton("Filtrar", "process-btn-submit")
    const btnClear = setButton("Limpiar", "process-btn-reset")
    

    titleDiv.appendChild(title)
    let listed=[]

    function clear(){
        tfFechaDesde.lastElementChild.firstElementChild.value= ""
        tfFechaHasta.lastElementChild.firstElementChild.value = ""
        tfClienteDesde.lastElementChild.firstElementChild.value = ""
        tfClienteHasta.lastElementChild.firstElementChild.value = ""
        tfRoomDesde.lastElementChild.firstElementChild.value = ""
        tfRoomHasta.lastElementChild.firstElementChild.value = ""
        stateSelect.value= "1"
        inputSelect.value = "1"
        inputSelectOrder.value = "1"

    }

    //report
    async function staysDetaildeReportBuild(route, credential, listed){
       await staysDetailedReportRequest(route, credential, listed)

        closeModalForm()
    }
    async function staysSummarizedReportBuild(route, credential, listed){
        await staysSummarizedReportRequest(route, credential, listed)
 
         closeModalForm()
     }

     //list
    async function hanldeListed(filter){
        listed= await getStaysListedRequest(filter) //se lista la estadia
        console.log(listed)
        if(typeSelect.value == "1"){
            openModalForm(staysDetiledReport({ filter, listed, staysDetaildeReportBuild}))
            return
        }
        openModalForm(staysSummarizedReport({ filter, listed, staysSummarizedReportBuild}))
    }

    btnAdd.addEventListener("click", () =>{
        let filters ={
            fechaDesde: tfFechaDesde.lastElementChild.firstElementChild.value,
            fechaHasta: tfFechaHasta.lastElementChild.firstElementChild.value,
            clientDesde: tfClienteDesde.lastElementChild.firstElementChild.value,
            clientHasta: tfClienteHasta.lastElementChild.firstElementChild.value,
            roomDesde: tfRoomDesde.lastElementChild.firstElementChild.value,
            roomHasta: tfRoomHasta.lastElementChild.firstElementChild.value,
            state: stateSelect.value,
            orderBy: inputSelect.value,
            order: inputSelectOrder.value,
        }
        hanldeListed(filters)
    })
    btnClear.addEventListener("click", () => {
        clear()
    })

    appendChildList(rangoDivId,[rangoDivFechaTitle, tfFechaDesde, tfFechaHasta])
    appendChildList(rangoDivClient,[rangoDivClientTitle, tfClienteDesde, tfClienteHasta])
    appendChildList(rangoDivRoom,[rangoDivRoomTitle, tfRoomDesde, tfRoomHasta])

    appendChildList(selectDiv0, [stateTitle, stateSelect])
    appendChildList(typeselectDiv, [typeTitle, typeSelect])
    appendChildList(selectDiv1, [inputSelect])
    appendChildList(selectDiv2, [inputSelectOrder])

    appendChildList(selectDiv, [selectDiv1, selectDiv2])
    appendChildList(select1div, [selectDiv0, typeselectDiv])

    appendChildList(btnDiv, [btnClear,btnAdd])
    btnDiv1.appendChild(btnDiv)
    appendChildList(rangoDiv, [rangoDivId, rangoDivClient, rangoDivRoom])
    appendChildList(formDiv,[ rengoTitle, rangoDiv, select1div,ordenTitle, selectDiv, btnDiv1])
    appendChildList(div,[titleDiv, formDiv])
    return div
}
export default stayReportTemplate
