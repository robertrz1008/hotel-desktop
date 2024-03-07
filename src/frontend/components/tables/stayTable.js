import { appendChildList, appendThList, openModalForm, setButton, setDiv, setIcon, setInput, setTd } from "../../../utils/functionsGlobal.js";
import { servicesFound } from "../../views/tables/servicesTemplate.js";
import serviceForm from "../form/serviceForm.js";
import servicesList from "../list/servicesList.js";

function  servicesTable(parent, services){

    const div = setDiv("table-con")
    const tableHead = setDiv("table-heade")
    const tfSeach = setInput("text", "Buscar...")
    const btn = setButton("Nuevo Servicio", "btn-add", "fa-solid fa-plus")
    const tbody = document.createElement("tbody")

    tfSeach.addEventListener("click", () =>{
        tfSeach.classList.add("input-select")
      })
    window.addEventListener("click", (e) => {
        const child = tfSeach.firstElementChild
        if(e.target != child){
            tfSeach.classList.remove("input-select")
        }
    })

    btn.addEventListener("click", () =>{
        openModalForm(serviceForm("Guardar", "btn-form-add"))
    })

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tr = document.createElement("tr")
    

    //cabezera de la tabla
    appendThList(tr, ["#", "descripcion", "Monto", "Observacion",])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    servicesList(table, tbody, services)

    async function renderList(filter){
        await renderListByFilter(filter, tbody)
        tbody.innerHTML = ""
        servicesList(table, tbody, servicesFound)
    }
    //La bu
    // tfSeach.addEventListener("keyup", () =>{
    //     const filter = tfSeach.firstChild.value
    //     renderList(filter)
    // })

    appendChildList(tableHead, [
        tfSeach,
        btn
    ])
    appendChildList(div, [
        tableHead,
        table,
    ])
    parent.appendChild(div)
}
export default servicesTable
