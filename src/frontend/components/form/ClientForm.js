import { appendChildList, setButton, setDiv, setForm, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js";
// import areaContex from "../../contexts/areaContext.js";
import {tfCedula, tfNombre, tfApellido, tfDireccion, tfTelefono, clearform, closeModalForm} from "../../views/tables/clientTemplate.js"


function clientForm(btnText, btnClass) {
    const form = setForm("area-form")
    const title = setTitleOrP("H2", "Datos del area")
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
        btnSubmit,
        btnReset
    ])
    appendChildList(form, [
        title, 
        tfCedula,
        tfNombre,
        tfApellido,
        tfDireccion,
        tfTelefono,
        btnDiv
    ])
    

    return form
}

export default clientForm