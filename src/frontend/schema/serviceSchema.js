import { hashTxt } from "../../utils/validator.js"
import { verificationMesages, verifyDates } from "../views/tables/clientTemplate.js";

function validateService(descripcion, monto, observacion){

    var elementosAEliminar = document.getElementsByClassName("error-mesage");
    var elementosArray = Array.from(elementosAEliminar);
    elementosArray.forEach(function(elemento) {
        elemento.remove();
    });
    
    const vDireccion = hashTxt(descripcion, "La descripcion es requerida")
    const vMonto = hashTxt(monto, "El monto es requerido")
    const vObservacion = hashTxt(observacion, "La observacion es requerida")

    const items = [vDireccion, vMonto, vObservacion]
    const callback = (x) => x == false

    if(items.some(callback)){
        console.log("validacion teminada")
        return false
    }

    return true
}

export default validateService