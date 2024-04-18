import { appendChildList, openConfirmModal, setIcon, setTd } from "../../../utils/functionsGlobal.js"
import { Tablediv } from "../../views/processes/stayTemplate.js"
import processDetailModal from "../ModalInfo/processDetail.js"

function processList(parent,body, list){

    body.innerHTML = ""

    list.map((data, id) =>{
        const trB = document.createElement("tr")
        const td0 = setTd(data.id)
        const name = data.nombre + " " +data.apellido
        const td = setTd(name)
        const td2 = setTd(data.descripcion)
        const td3 = setTd(data.total)
        const tdAction = document.createElement("td")
        const iconDetail = setIcon(["fa", "fa-info-circle", "btn-del", "table-icon"])

        trB.className= "trb"
        td0.className = "td0"
        tdAction.className = "tdAction"

        iconDetail.addEventListener("click", () => {
            openConfirmModal(processDetailModal(data))
        })

        appendChildList(tdAction, [
            iconDetail
        ])

        appendChildList(trB, [
            td0,
            td,
            td2,
            td3,
            tdAction
        ])
        body.appendChild(trB)
    })
    
    Tablediv
    parent.appendChild(body)

}

export default processList