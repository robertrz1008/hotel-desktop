import  { appendChildList, setDetailText, setDiv, setTitleOrP } from "../../../utils/functionsGlobal.js";
import formatDate from "../../../utils/getDate.js";
import { getDetailsByStayRequest } from "../../api/processRequest.js";
import { Tablediv } from "../../views/processes/stayTemplate.js";
import detailServiceInfoTable from "../tables/ServiceDetailInfoTable.js";

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

    const section1 = setDiv("process-detail-section1")
    const section2 = setDiv("process-detail-section2")

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
    const servicio = setTitleOrP("h3", "Servicios")

    let servicesFound = []
    
    div.innerHTML = ""

    async function rederDetailList(id){
        servicesFound = await getDetailsByStayRequest(id)

        detailServiceInfoTable(Tablediv, servicesFound)
    }
    rederDetailList(stay.id)

    appendChildList(div, [
        title,
        clientName,
        habitaicion,
        estado,
        entrada,
        salida,
        observacion,
        total,
        servicio,
        Tablediv
    ])

    return div
}

export default processDetailModal