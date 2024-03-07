import { appendChildList, closeModalForm, removeErrorMessage, setAlertMesages, setButton, setDiv, setForm, setInputForm, setTitleOrP } from "../../../utils/functionsGlobal.js";
import validateClient from "../../schema/clientShema.js";
import {tfCedula, tfNombre, tfApellido, tfDireccion, tfTelefono, clearform, updateClient, createClient, idClient, verificationMesages, verifyDates} from "../../views/tables/clientTemplate.js"


function clientForm(btnText, btnClass) {
    const form = setForm("area-form")
    
    const title = setTitleOrP("H2", "Datos del Cliente")
    const line = setDiv("form-line")
    const btnDiv = setDiv("btn-form-con")
    const alertDiv = setDiv("")
    //botones
    const btnSubmit = document.createElement("button")
    btnSubmit.textContent = btnText
    btnSubmit.classList.add(btnClass)
    const btnReset = document.createElement("button")
    btnReset.type = "reset"
    btnReset.classList.add("btn-form-res")
    btnReset.textContent = "Cancelar"

    form.innerHTML = ""

    async function handleSubmit(){
        if(btnSubmit.textContent == "Modificar"){
            updateClient({
                id: idClient,
                cedula: tfCedula.lastElementChild.firstElementChild.value,
                nombre: tfNombre.lastElementChild.firstElementChild.value,
                apellido: tfApellido.lastElementChild.firstElementChild.value,
                direccion: tfDireccion.lastElementChild.firstElementChild.value,
                telefono: tfTelefono.lastElementChild.firstElementChild.value
            })
            btnSubmit.textContent = "Guardar"
            return
        }

        alertDiv.innerHTML = ""
        alertDiv.classList.remove("alert-con")
        const validate = validateClient(tfCedula, tfNombre, tfApellido, tfDireccion, tfTelefono)

        //si los campose estan vacios, se aborta el proceso
        if(!validate) return

        // ser registraran la cedula y el telefono
        const va = await verifyDates()   

        setTimeout(() => {
            if(!va ){

                return setAlertMesages(alertDiv, verificationMesages)

            }else{
                btnSubmit.textContent = "Guardando..."
                createClient({
                    cedula: tfCedula.lastElementChild.firstElementChild.value,
                    nombre: tfNombre.lastElementChild.firstElementChild.value,
                    apellido: tfApellido.lastElementChild.firstElementChild.value,
                    direccion: tfDireccion.lastElementChild.firstElementChild.value,
                    telefono: tfTelefono.lastElementChild.firstElementChild.value 
                })
                
            }
        }, 200);
    }
    
    form.addEventListener("submit", (e) =>{
        e.preventDefault()
        handleSubmit()
    })
    removeErrorMessage([tfCedula, tfNombre, tfApellido, tfDireccion, tfTelefono])
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
        line,
        tfCedula,
        tfNombre,
        tfApellido,
        tfDireccion,
        tfTelefono,
        alertDiv,
        btnDiv
    ])

    return form
}

export default clientForm