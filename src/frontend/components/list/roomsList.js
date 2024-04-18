import { appendChildList, openConfirmModal, openModalForm, setDiv, setIcon, setTd, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { updateModeRoom } from "../../views/tables/roomTemplate.js"
import deleteRoomC from "../confirmContext/deleteRoomContext.js"
import roomForm from "../form/roomForm.js"

function roomsList(parent,body, list){

    body.innerHTML = ""

    function viewState(n){
        const div = setDiv("")
        const state = setTitleOrP("p", "");
        
        if(n == 1){
            state.textContent = "Disponible"
            div.className = "service-state-1"
        }
        if(n == 2){
            state.textContent ="Reservado"
            div.className = "service-state-2"
        }
        if(n == 3){
            state.textContent = "Ocupado"
            div.className = "service-state-3"
        }
        div.appendChild(state)
        return div
    }

    list.map((data, id) =>{
        const trB = document.createElement("tr")
        const td0 = setTd(data.id)
        const td = setTd(data.descripcion)
        const td2 = setTd(parseFloat(data.montoDia))
        const td3 = setTd(data.observacion)
        const td4 = document.createElement("td")

        const tdAction = document.createElement("td")
        const iconDel = setIcon(["fa-solid", "fa-trash", "btn-del", "table-icon"])
        const iconUpd = setIcon(["fa-solid", "fa-pen", "btn-upd", "table-icon"])

        trB.className= "trb"
        td0.className = "td0"
        tdAction.className = "tdAction"

        appendChildList(tdAction, [
            iconDel,
            iconUpd
        ])
        td4.appendChild(viewState(data.estado))

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
            td4,
            tdAction,
        ])
        body.appendChild(trB)
    })

    parent.appendChild(body)

}

export default roomsList