import  { appendChildList, setDetailText, setDiv, setTitleOrP } from "../../../utils/functionsGlobal.js";
import formatDate from "../../../utils/getDate.js";

function formatStatus(number){
    let stat = [
    {value: "0", name: "Ocupado"},
    { value: "1", name: "Reservado"},
    { value: "2", name: "Anulado"},
    { value: "3", name: "Finalizado"}
    ]
    let newS = stat.filter(data => data.value == number)

    return newS[0].name
}

function processDetailModal(stay){
    const div = setDiv("process-detail-con")

    const entradaDate = formatDate(stay.entrada)
    const salidaDate = formatDate(stay.salida)

    const title  = setTitleOrP("h3", "Detalles de la estadia")
    const clientT = stay.nombre + " "+ stay.apellido
    const clientName = setDetailText("Cliente", clientT)
    const estado = setDetailText("Estado", formatStatus(stay.estado))
    const habitaicion = setDetailText("Habitacion", stay.descripcion)
    const entrada = setDetailText("Fecha de Entrada", entradaDate.fecha)
    const salida = setDetailText("Fecha de Salida", salidaDate.fecha)
    const observacion = setDetailText("Observacion", stay.est_observacion)
    const total = setDetailText("Total", stay.total)
    
    div.innerHTML = ""

    appendChildList(div, [
        title,
        clientName,
        habitaicion,
        estado,
        entrada,
        salida,
        observacion,
        total
    ])

    return div
}

export default processDetailModal