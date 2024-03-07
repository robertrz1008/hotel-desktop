import { appendChildList, closeConfirmModal, setButton, setDiv, setTitleOrP } from "../../../utils/functionsGlobal.js"
import { deleteClientById } from "../../views/tables/clientTemplate.js"

export default function deleteClient(msg, id){
    const messaage = setTitleOrP("p", msg)
    const modalCon = setDiv("modal-con")
    const btnDiv = setDiv("btn-form-con")
    const btnReset = setButton("Cancelar", "btn-form-res")
    const btnAccept = setButton("Eliminar", "btn-form-add")

    //los botones
    btnReset.addEventListener("click", () => {
        closeConfirmModal()
    })
    btnAccept.addEventListener("click", () => {
        deleteClientById(id)
    })


    appendChildList(btnDiv, [
        btnReset,
        btnAccept
    ])
    appendChildList(modalCon, [
        messaage,
        btnDiv
    ])

    return modalCon
}