import { appendChildList, appendThList, openModalForm, setButton, setDiv, setIcon, setInput, setTd } from "../../../utils/functionsGlobal.js";

function  detailServiceTable({ Tablediv,table, tHead, div }){

    // tabla
    const tr = document.createElement("tr")

    //cabezera de la tabla
    appendThList(tr, ["Cant.", "Servicio", "Monto", "SubTotal", "Accion"])
    tHead.appendChild(tr)
    table.appendChild(tHead)
    tr.className = "table-head"

    appendChildList(Tablediv, [
        table,
    ])
    div.appendChild(Tablediv)
}
export default detailServiceTable
