import { appendChildList, setTitleOrP } from "../../../utils/functionsGlobal"

function clientReport(list){
    const div = setDiv("report-con")
    const title = setTitleOrP("Listado de Clientes")
    const tableDiv = setDiv("stay-table-div")
    const btnDiv1 = setDiv("listed1-btn-con")
    const btnDiv = setDiv("listed-btn-con")
    const processTableDiv = setDiv("process-table-div")
    const btnAdd = setButton("Imprimir", "process-btn-submit")
    const btnClear = setButton("Limpiar", "process-btn-reset")



    appendChildList (div, [title, processTableDiv, btnDiv1])
    return div
}