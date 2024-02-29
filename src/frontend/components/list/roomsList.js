import { appendChildList, openModalForm, setIcon, setTd } from "../../../utils/functionsGlobal.js"
import { updateModeRoom } from "../../views/tables/roomTemplate.js"
import roomForm from "../form/roomForm.js"

function roomsList(parent,body, list){

    body.innerHTML = ""

    list.map((data, id) =>{
        const trB = document.createElement("tr")
        const td0 = setTd(id + 1)
        const td = setTd(data.descripcion)
        const td2 = setTd(parseFloat(data.montoDia))
        const td3 = setTd(data.observacion)

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

        iconDel.addEventListener("click", () =>{
            // openCnfModal("Decea eliminar esta area?", data.codigo)
        })
        iconUpd.addEventListener("click", () => {
            updateModeRoom({
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
            tdAction
        ])
        body.appendChild(trB)
    })

    parent.appendChild(body)

}

export default roomsList