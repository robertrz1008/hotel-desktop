import { appendChildList, setButton, setDiv, setTitleOrP } from "../../utils/functionsGlobal.js"

export function openCnfModal(msg, id){
    const modalBackground = document.createElement("div")
    const modal = document.createElement("div")
    const messaage = setTitleOrP("h3", msg)
    const modalCon = setDiv("modal-con")
    const title = setTitleOrP("h2", "Eliminar area")
    const btnDiv = setDiv("btn-con")
    const btnReset = document.createElement("button")
    const btnAccept = setButton("Eliminar", "t-btn-del")

    modalBackground.id = "modalBg"
    modalBackground.className = "modal-backgroud"
    modal.className = "DivHijo"
    btnReset.textContent = "cancelar"

    //los botones
    btnReset.addEventListener("click", () => {
        closeCnfModal()
    })
    btnAccept.addEventListener("click", () => {
        // deleteArea(id)
    })

    window.addEventListener("click", (e) => {
        if(e.target == modalBackground){
            closeCnfModal()
        }
    })

    appendChildList(btnDiv, [
        btnReset,
        btnAccept
    ])
    appendChildList(modalCon, [
        title,
        messaage,
        btnDiv
    ])
    appendChildList(modal, [
        modalCon
    ])
    modalBackground.appendChild(modal)
    document.body.appendChild(modalBackground)
}
export function closeCnfModal(){
    let modalBackground = document.getElementById("modalBg")
    document.body.removeChild(modalBackground)
}