import { appendChildList, appendThList, openModalForm, setButton, setDiv, setIcon, setInput, setTd } from "../../../utils/functionsGlobal.js";
import { getProcessByFilterRequest } from "../../api/processRequest.js";
import processList from "../list/processList.js";

function  processTable(parent, stays){

    const div = setDiv("stay-table-con")
    const tableHead = setDiv("table-heade")
    const tfSeach = setInput("text", "Buscar...")
    const tbody = document.createElement("tbody")
    let stayFound = []

    // tabla
    const table = document.createElement("table")
    const tHead = document.createElement("thead")
    const tr = document.createElement("tr")
    

    //cabezera de la tabla
    appendThList(tr, ["id", "cliente", "habitacion", "Total", "Det."])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    processList(table, tbody, stays) 
    
    async function renderList(filter){
        stayFound = await getProcessByFilterRequest(filter)
        tbody.innerHTML = ""
        processList(table, tbody, stayFound) 
    }

    tfSeach.addEventListener("click", () =>{
        tfSeach.classList.add("input-select")
    })

    window.addEventListener("click", (e) => {
        const child = tfSeach.firstElementChild
        if(e.target != child){
            tfSeach.classList.remove("input-select")
        }
    })


    tfSeach.addEventListener("keyup", () =>{
        const value = tfSeach.firstChild.value
        renderList(value)
    })

    appendChildList(tableHead, [
        tfSeach,
    ])
    appendChildList(div, [
        tableHead,
        table,
    ])
    parent.appendChild(div)
}
export default processTable
