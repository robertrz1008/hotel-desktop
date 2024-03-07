import { appendChildList, openConfirmModal, openModalForm, setIcon, setTd } from "../../../utils/functionsGlobal.js"
import { updateModeService } from "../../views/tables/servicesTemplate.js"
import deleteServiceC from "../confirmContext/deleteServiceContext.js"
import serviceForm from "../form/serviceForm.js"

function servicesList(parent,body, list){

    body.innerHTML = ""

    list.map((data, id) =>{
        const trB = document.createElement("tr")
        const td0 = setTd(id + 1)
        const td = setTd(data.descripcion)
        const td2 = setTd(data.monto+".00")
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
            openConfirmModal(deleteServiceC("Decea eliminar el servicio", data.id))
        })
        iconUpd.addEventListener("click", () => {
            updateModeService({
                id: data.id,
                descripcion: data.descripcion,
                monto: data.monto,
                observacion: data.observacion
            })
            openModalForm(serviceForm("Modificar", "btn-form-upd"))
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

export default servicesList