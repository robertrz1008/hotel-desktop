import { appendChildList, closeModalForm, setButton, setDiv, setForm, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js";
import { clientBtn, clientInput, clientText, entryDate, entryP, exitDate, exitP, inputSelect, roomBtn, roomInput, roomText, tfObservacion } from "../../views/processes/stayTemplate.js";

function stayForm(parent) {
    const form = setDiv("stay-form")
    const title = setTitleOrP("h4", "Nueva transaccion")
    const dateTimeDiv = setDiv("date-time-div")
    const clientDiv = setDiv("date-time-div")
    const roomDiv = setDiv("date-time-div")

    form.innerHTML = ""


    //dom
    entryDate.appendChild(entryP)
    exitDate.appendChild(exitP)
    clientInput.appendChild(clientText)
    roomInput.appendChild(roomText)

    appendChildList(clientDiv,[
        clientInput,
        clientBtn
    ])
    appendChildList(roomDiv, [
        roomInput,
        roomBtn
    ])
    appendChildList(dateTimeDiv, [
        entryDate,
        exitDate
    ])
    appendChildList(form, [
        title, 
        dateTimeDiv,
        clientDiv,
        roomDiv,
        tfObservacion,
        inputSelect
    ])
    

    parent.appendChild(form)
}

export default stayForm