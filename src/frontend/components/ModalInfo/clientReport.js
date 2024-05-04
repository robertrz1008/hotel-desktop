import { appendChildList, closeModalForm, setButton, setDiv, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { credential, pathPDF } from "../../views/system/settingTemplate.js"
import clientReportTable from "../tables/clientReportTable.js"

function clientReport({ filter, listed, clientReportBuild}){
    const div = setDiv("report-con")
    const title = setTitleOrP("h4", "Listado de Clientes")
    const btnDiv1 = setDiv("listed1-btn-con")
    const btnDiv = setDiv("listed-btn-con")
    const tablediv = setDiv("report-table-con")
    const btnAdd = setButton("Imprimir", "process-btn-submit")
    const btnClear = setButton("Cancelar", "process-btn-reset")
    const paramDiv = setDiv("param-div")
    const idText = setTitleOrP("p", "Id: "+filter.idDesde+" - "+filter.idHasta)
    const nameText = setTitleOrP("p", "Nombre: "+filter.nameDesde+" - "+filter.nameHasta)
    const lastNametext = setTitleOrP("p", "Apellido: "+filter.lastNameDesde+" - "+filter.lastNameHasta)
    const orderText = setTitleOrP("p", "Ordenado por: "+filter.orderBy+" - "+filter.order)

    clientReportTable(tablediv, listed)

    btnClear.addEventListener("click", () => {
        closeModalForm()
    })
    btnAdd.addEventListener("click", () => {
        const data = credential[0]
        console.log(pathPDF)
        console.log(data)
        console.log(listed)
        clientReportBuild(pathPDF, data, listed)
    })

    appendChildList(btnDiv, [btnClear,btnAdd])
    btnDiv1.appendChild(btnDiv)
    appendChildList(paramDiv,[idText, nameText, lastNametext, orderText])
    appendChildList (div, [title, paramDiv, tablediv, btnDiv1])
    return div
}

export default clientReport