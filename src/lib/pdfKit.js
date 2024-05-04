const PDFDocument = require('pdfkit-table');
const fs = require("fs")

function setArray(data) {
    let array = []
  for (const i of data) {
    const arr = Object.values(i)
    array.push(arr)
  }
  
    return array
  }

function clientReport(route, credential, clients){

    const doc = new PDFDocument();
    console.log("generando pdf")
    doc.margin = 10

    const writeStream = fs.createWriteStream(route+"/clientes-reporte.pdf");

  doc.pipe(writeStream);

  doc.moveDown().fontSize(15).text('Listado de Clientes',34, 30,{align: "center",});

  doc.fontSize(15).text(credential.empresa)
  doc.fontSize(10).moveUp().text(`Tel: ${credential.telefono}`, {align: "center"});
  doc.fontSize(10).moveUp().text(`Direccion: ${credential.direccion}`, {align: "right"});
  doc.roundedRect(26, 24, 524, 40, 3).stroke();

   const table = {
    headers: ["Id","Cedula" ,"Nombre", "Apellido","Direccion", "Telefeono"],
    rows: setArray(clients),
  };
  doc.fontSize(12).moveDown().table(table, { 
    width: 500,
  });
  let pages = doc.bufferedPageRange();

for (let i = 0; i < pages.count; i++) {
  doc.switchToPage(i);
  let oldBottomMargin = doc.page.margins.bottom;
  doc.page.margins.bottom = 0 
  doc.fontSize(10)
    .text(
      `fecha: 10-08-2024                                                                                           Pag.: ${i + 1} de ${pages.count}`,
      0,
       doc.page.height - (oldBottomMargin/2),
      { align: 'center' }
    );
  
  doc.page.margins.bottom = oldBottomMargin; 
}
doc.end();


writeStream.on('finish', function() {
    console.log('PDF generado con éxito.');
});

writeStream.on('error', function(err) {
    console.error('Error al generar el PDF:', err);
});
}


module.exports = {
  clientReport
}