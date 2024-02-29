import { appendChildList, closeModalForm, setButton, setDiv, setForm, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js";
import { clearform } from "../../views/tables/clientTemplate.js";
import {tfDescripcion, tfMontoDia, tfobservacion} from "../../views/tables/roomTemplate.js"

function roomForm(btnText, btnClass) {
    const form = setForm("area-form")
    const title = setTitleOrP("H2", "Datos de la habitacion")
    const btnDiv = setDiv("btn-form-con")
    //botones
    const btnSubmit = document.createElement("button")
    btnSubmit.textContent = btnText
    btnSubmit.classList.add(btnClass)
    const btnReset = document.createElement("button")
    btnReset.type = "reset"
    btnReset.classList.add("btn-form-res")
    btnReset.textContent = "Cancelar"

    form.innerHTML = ""
    
    // form.addEventListener("submit", (e) =>{
    //     e.preventDefault()

    //     if(btnSubmit.textContent == "Modificar"){
    //         updateArea({
    //             codigo: codigoArea,
    //             descripcion: tfDescription.lastElementChild.firstElementChild.value,
    //             observacion: tfObservacion.lastElementChild.firstElementChild.value
    //         })
    //         btnSubmit.textContent = "Guardar"
    //         return
    //     }

    //     createArea({
    //         descripcion: tfDescription.lastElementChild.firstElementChild.value,
    //         observacion: tfObservacion.lastElementChild.firstElementChild.value
    //     })
    // })
    btnReset.addEventListener("click", () => {
        clearform()
        closeModalForm()
    })

    appendChildList(btnDiv, [
        btnReset,
        btnSubmit
    ])
    appendChildList(form, [
        title, 
        tfMontoDia,
        tfobservacion,
        tfDescripcion,
        btnDiv
    ])
    

    return form
}

export default roomForm