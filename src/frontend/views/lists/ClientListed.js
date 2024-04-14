import { appendChildList, setButton, setDiv, setInputForm, setInputSelect, setTitleOrP } from "../../../utils/functionsGlobal.js"

function clientListedTemplate(){
    const div = setDiv("area-table-con")
    const titleDiv = setDiv("title-con")
    const title = setTitleOrP("h3", "Listado de Clientes")
    const formDiv = setDiv("setting-form-con")
    const Iditle = setTitleOrP("h3", "Id")
    const TfidDesde = setInputForm("Desde","number")
    const TfidHasta = setInputForm("Hasta","number")
    const DescrpcionTitle = setTitleOrP("h3", "Descripción")
    const TfDcpDesde = setInputForm("Desde","number")
    const TfDcpHasta = setInputForm("Hasta","number")
    const fialsTitle = setTitleOrP("h3", "Filas")
    const inputSelectF = setInputSelect([
        { value: "0", name: "10"},
        { value: "1", name: "20"},
        { value: "2", name: "30"},
        { value: "3", name: "40"},
    ])
    const ordenamientoTitle = setTitleOrP("h3", "Filas")
    const inputSelectO = setInputSelect([
        { value: "0", name: "Acsendente"},
        { value: "1", name: "Descendente"}
    ])
    const btnFilter = setButton("Filtrar", "process-btn-add")

    titleDiv.appendChild(title)
    appendChildList(formDiv, [
        Iditle,
        TfidDesde,
        TfidHasta,
        DescrpcionTitle,
        TfDcpDesde,
        TfDcpHasta,
        fialsTitle,
        inputSelectF,
        ordenamientoTitle,
        inputSelectO,
        btnFilter,
    ])
    appendChildList(div,[
        titleDiv,
        formDiv
    ])
    return div
}
export default clientListedTemplate