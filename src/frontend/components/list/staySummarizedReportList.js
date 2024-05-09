import { appendChildList, setTd } from "../../../utils/functionsGlobal.js";
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

function staySummarizedReportList(parent, body, list) {
  body.innerHTML = "";

  list.map((data) => {

    const entradaDate = formatDate(data.entrada)

    const trB = document.createElement("tr");
    const td0 = setTd(data.id);
    const td1 = setTd(data.nombre + " " + data.apellido);
    const td2 = setTd(data.descripcion);
    const td3 = setTd(formatStatus(data.estado));
    const td4 = setTd(entradaDate.fecha);
    const td5 = setTd(data.total);

    trB.className = "trb";
    td0.className = "td0";

    appendChildList(trB, [td0, td1, td2, td3, td4, td5]);
    body.appendChild(trB);
  });

  parent.appendChild(body);
}

export default staySummarizedReportList;
