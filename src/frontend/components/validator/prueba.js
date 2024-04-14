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

salidaDate = "dd"
const matchSalida = !salidaDate? "Pendiente" : salidaDate

console.log(matchSalida)