import { appendChildList, closeModalForm, openModalForm, setButton, setDiv, setInputForm, setInputSelect, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { servicesReportRequest } from "../../api/reportPDFRequest.js"
import { getServicesListedRequest } from "../../api/serviceRequest.js"
import servicesReport from "../../components/ModalInfo/servicesReport.js"

function clientListedTemplate(){
    const div = setDiv("area-table-con")
    const titleDiv = setDiv("title-con")
    const title = setTitleOrP("h3", "Listado de Consumiciones")

    const formDiv = setDiv("listed-form-con")

    const rangoDiv = setDiv("form-rango-con")
    const rengoTitle = setTitleOrP("h4", "Filtros")
    const rangoDivDescription = setDiv("form-rangosub-con")
    const rangoDivMontoDia = setDiv("form-rangosub-con")
    const rangoDivId = setDiv("form-rangosub-con")
    const rangoDivIdTitle = setTitleOrP("h4", "Id")
    const rangoDivDescriptionTitle = setTitleOrP("h4", "Descripcion")
    const rangoDivMonsotDiaTitle = setTitleOrP("h4", "Monto")
    const tfIdDesde = setInputForm("Desde", "number", "")
    const tfIdHasta = setInputForm("Hasta", "number", "")
    const tfDescriptionDesde = setInputForm("Desde", "text", "")
    const tfDescriptionHasta = setInputForm("Hasta", "text", "")
    const tfMontoDiaDesde = setInputForm("Desde", "number", "")
    const tfMontoDiaHasta = setInputForm("Hasta", "number", "")
    const ordenTitle = setTitleOrP("h4", "Ordenamiento")
    const selectDiv = setDiv("form-select-con")
    const selectDiv1 = setDiv("lidted-form-select-div")
    const selectDiv2 = setDiv("lidted-form-select-div")
    const inputSelect = setInputSelect([
        {value: "1", name: "id"},
        {value: "2", name: "Descripcion"},
        {value: "3", name: "Monto"}
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
        tfIdDesde.lastElementChild.firstElementChild.value = "";
        tfIdHasta.lastElementChild.firstElementChild.value = ""
        tfDescriptionDesde.lastElementChild.firstElementChild.value =""
        tfDescriptionHasta.lastElementChild.firstElementChild.value = ""
        tfMontoDiaDesde.lastElementChild.firstElementChild.value = ""
        tfMontoDiaHasta.lastElementChild.firstElementChild.value = ""
        inputSelect.value = "1"
        inputSelectOrder.value= "1"
    }
    async function serviceReportBuild(route, credential, clients){
        await servicesReportRequest(route, credential, clients)

        closeModalForm()
    }
    async function getServicesListed(filter){
        listed= await getServicesListedRequest(filter)
        console.log(listed)
        openModalForm(servicesReport({ filter, listed, serviceReportBuild}))
    }

    btnAdd.addEventListener("click", () =>{
        const roomFiltro ={
            idDesde: tfIdDesde.lastElementChild.firstElementChild.value,
            idHasta: tfIdHasta.lastElementChild.firstElementChild.value,
            descriptionDesde: tfDescriptionDesde.lastElementChild.firstElementChild.value,
            descriptionHasta: tfDescriptionHasta.lastElementChild.firstElementChild.value,
            montoDesde: tfMontoDiaDesde.lastElementChild.firstElementChild.value,
            montoHasta: tfMontoDiaHasta.lastElementChild.firstElementChild.value,
            orderBy: inputSelect.value,
            order: inputSelectOrder.value
        }
        getServicesListed(roomFiltro)
    })
    btnClear.addEventListener("click", () => {
        clear()
    })

    appendChildList(rangoDivId,[rangoDivIdTitle, tfIdDesde, tfIdHasta])
    appendChildList(rangoDivDescription,[rangoDivDescriptionTitle, tfDescriptionDesde, tfDescriptionHasta])
    appendChildList(rangoDivMontoDia,[rangoDivMonsotDiaTitle, tfMontoDiaDesde, tfMontoDiaHasta])

    appendChildList(selectDiv1, [inputSelect])
    appendChildList(selectDiv2, [inputSelectOrder])
    appendChildList(selectDiv, [selectDiv1, selectDiv2])

    appendChildList(btnDiv, [btnClear,btnAdd])
    btnDiv1.appendChild(btnDiv)
    appendChildList(rangoDiv, [rangoDivId, rangoDivDescription, rangoDivMontoDia])
    appendChildList(formDiv,[rengoTitle, rangoDiv, ordenTitle, selectDiv, btnDiv1])
    appendChildList(div,[titleDiv, formDiv])
    return div
}
export default clientListedTemplate