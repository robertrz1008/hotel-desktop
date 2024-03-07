import { closeConfirmModal } from "../../utils/functionsGlobal.js"

export function openCnfModal(children){
    const modalBackground = document.createElement("div")
    const modal = document.createElement("div")

    modalBackground.id = "modalBg"
    modalBackground.className = "modal-backgroud"
    modal.className = "DivHijo"

    window.addEventListener("click", (e) => {
        if(e.target == modalBackground){
            closeConfirmModal()
        }
    })

    modal.appendChild(children)

    modalBackground.appendChild(modal)
    document.body.appendChild(modalBackground)
}
export function closeCnfModal(){
    let modalBackground = document.getElementById("modalBg")
    document.body.removeChild(modalBackground)
}