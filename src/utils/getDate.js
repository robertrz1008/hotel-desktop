function formatDate(fecha) {
    // Convertir la cadena de fecha en un objeto Date

    if(fecha == null) return { fecha: "Pendiente", hora: "Pendiente" }

    var fechaObjeto = new Date(fecha);
    
    // Obtener los componentes de la fecha y hora
    var dia = fechaObjeto.getDate();
    var mes = fechaObjeto.getMonth() + 1; // Los meses van de 0 a 11, por lo que se suma 1
    var año = fechaObjeto.getFullYear();
    var hora = fechaObjeto.getHours();
    var minutos = fechaObjeto.getMinutes();
    var segundos = fechaObjeto.getSeconds();

    // Agregar ceros a la izquierda si los números son menores que 10
    dia = (dia < 10) ? '0' + dia : dia;
    mes = (mes < 10) ? '0' + mes : mes;
    hora = (hora < 10) ? '0' + hora : hora;
    minutos = (minutos < 10) ? '0' + minutos : minutos;
    segundos = (segundos < 10) ? '0' + segundos : segundos;

    // Crear la cadena de fecha y hora en el formato deseado
    var fechaFormateada = dia + '/' + mes + '/' + año;
    var horaFormateada = hora + ':' + minutos + ':' + segundos;

    // Devolver la cadena formateada
    return { fecha: fechaFormateada, hora: horaFormateada };
}

// Ejemplo de uso:
// var fechaDB = "Tue Apr 02 2024 17:20:34 GMT-0400 (hora estándar de Paraguay)";
// var fechaYHoraFormateada = formatDate(fechaDB);
// console.log("Fecha formateada:", fechaYHoraFormateada.fecha);
// console.log("Hora formateada:", fechaYHoraFormateada.hora);


export default formatDate