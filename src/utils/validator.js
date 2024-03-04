import { setTitleOrP } from "./functionsGlobal.js";

export function hashTxt(textFiel, msg){
    const p = document.createElement("p")
    p.className = "error-mesage"

    textFiel.after(p)
    const textFielValue = textFiel.lastElementChild.firstElementChild.value

    textFiel.lastElementChild.classList.remove("input-error")
    p.textContent = ""

    if(textFielValue.trim() == "" ){
        textFiel.lastElementChild.classList.add("input-error")
        p.textContent = msg
        return false
    }
    return true
}