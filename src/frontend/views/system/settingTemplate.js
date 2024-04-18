import {appendChildList, setButton, setDiv, setInputForm, setTitleOrP}  from "../../../utils/functionsGlobal.js"
import { createCredentialRequest } from "../../api/processRequest.js"

function settingTemplate(){
    const div = setDiv("area-table-con")
    const titleDiv = setDiv("title-con")
    const title = setTitleOrP("h3", "Registro de Habitaciones")
    const formDiv = setDiv("setting-con")
    const inputDiv1 = setDiv("setting-input-con")
    const inputDiv2 = setDiv("setting-input-con")
    const inputDiv3 = setDiv("setting-input-con")
    const inputDiv4 = setDiv("setting-input-con")
    const inputGropuDiv = setDiv("setting-input-group-con")
    const inputGropuDiv2 = setDiv("setting-input-group-con")
    const tfEmpresa = setInputForm("Empresa", " ")
    const tfTelefono = setInputForm("Telefono", " ")
    const tfDireccion = setInputForm("Direccion", " ")
    const tfPDFPath = setInputForm("Ruta para documentos PDF")
    const btnDiv = setDiv("setting-btn-con")
    const btnAdd = setButton("Guardar", "btn-form-add")

    const createCredential = async (crendential) => {
        const response = await createCredentialRequest(crendential)

        if(response) return console.log("No se pudo crear la credencial")

        return console.log("Se ha creado la credential")
    }

    btnAdd.addEventListener("click", () => {
        createCredential({
            empresa: tfEmpresa.lastElementChild.firstElementChild.value,
            telefono: tfTelefono.lastElementChild.firstElementChild.value,
            direccion: tfDireccion.lastElementChild.firstElementChild.value
        })
        console.log("configuracion creada")
    })


    btnDiv.appendChild(btnAdd)
    titleDiv.appendChild(title)

    inputDiv1.appendChild(tfEmpresa)
    inputDiv2.appendChild(tfTelefono)
    inputDiv3.appendChild(tfDireccion)
    inputDiv4.appendChild(tfPDFPath)

    appendChildList(inputGropuDiv, [
        inputDiv1,
        inputDiv2
    ])
    appendChildList(inputGropuDiv2, [
        inputDiv3,
        inputDiv4
    ])
    appendChildList(formDiv, [
        inputGropuDiv,
        inputGropuDiv2,
        btnDiv
    ])
    appendChildList(div,[
        titleDiv,
        formDiv
    ])

    return div
}
export default settingTemplate