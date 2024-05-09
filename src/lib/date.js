function getDate(){
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript se indexan desde 0
    const día = fechaActual.getDate();
    const hora = fechaActual.getHours();
    const minuto = fechaActual.getMinutes();
    const segundo = fechaActual.getSeconds();

    if(mes.length == 1){
        mes = "0"+mes
    }

    const fechaHoraPersonalizadaString = `${día}-${mes}-${año} `;

    return fechaHoraPersonalizadaString
}

function nextLetter(letra) {
    letra = letra.toLowerCase();
    if (letra === 'z') {
        return 'z';
    }
    var codigo = letra.charCodeAt(0);
    codigo++;
    return String.fromCharCode(codigo);
  }
  

module.exports = {
    getDate,
    nextLetter
}