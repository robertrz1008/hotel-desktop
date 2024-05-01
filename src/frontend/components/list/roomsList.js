import { appendChildList, openConfirmModal, openModalForm, setDiv, setIcon, setTd, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { roomsOcuppedId, roomsReservedId, updateModeRoom } from "../../views/tables/roomTemplate.js"
import deleteRoomC from "../confirmContext/deleteRoomContext.js"
import roomForm from "../form/roomForm.js"

function roomsList(parent,body, list){

    body.innerHTML = ""

    function viewState(n){
        const idtatediv = setDiv("")
       
        if(roomsReservedId.includes(n)){
            idtatediv.className = "service-state-2"
        }if(roomsOcuppedId.includes(n)){
            idtatediv.className = "service-state-3"
        }
        if(!roomsOcuppedId.includes(n) && !roomsReservedId.includes(n)){
            idtatediv.className = "service-state-1"
        }

        idtatediv.textContent = n
        return idtatediv
    }

    list.map((data, id) =>{
        const trB = document.createElement("tr")
        const td0 = document.createElement("td")
        const td = setTd(data.descripcion)
        const td2 = setTd(parseFloat(data.montoDia))
        const td3 = setTd(data.observacion)

        const tdAction = document.createElement("td")
        const iconDel = setIcon(["fa-solid", "fa-trash", "btn-del", "table-icon"])
        const iconUpd = setIcon(["fa-solid", "fa-pen", "btn-upd", "table-icon"])

        trB.className= "trb"
        td0.className = "td0"
        td0.appendChild(viewState(data.id))
        tdAction.className = "tdAction"

        appendChildList(tdAction, [
            iconDel,
            iconUpd
        ])

        iconDel.addEventListener("click", () =>{
            openConfirmModal(deleteRoomC("Esta seguro de eliminar", data.id))
        })
        iconUpd.addEventListener("click", () => {
            updateModeRoom({
                id: data.id,
                montoDia: data.montoDia,
                descripcion: data.descripcion,
                observacion: data.observacion
            })
            openModalForm(roomForm("Modificar", "btn-form-upd"))
        })

        appendChildList(trB, [
            td0,
            td,
            td2,
            td3,
            tdAction,
        ])
        body.appendChild(trB)
    })

    parent.appendChild(body)

}

export default roomsList