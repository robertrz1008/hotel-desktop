const PDFDocument = require('pdfkit-table');
const fs = require("fs");
const {getDate} = require("./date")

function setArray(data) {
    let array = []
  for (const i of data) {
    const arr = Object.values(i)
    array.push(arr)
  }
    return array
  }

  function orderArray(data){
    let newArr = []
    for (const i of data) {
      let iArr = []
      iArr.push(i[0])
      iArr.push(i[1])
      iArr.push(i[3])
      iArr.push(i[2])

      newArr.push(iArr)
    }
    return newArr
}

async function clientReport(route, credential, clients){
   try {
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
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
      prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        doc.font("Helvetica").fontSize(10);
        indexColumn === 9;
      },
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

 console.log("reporte de clientes generado con exito")
 return true
 
   } catch (error) {
    console.error('Error al generar el reporte:', err);
    return false
   }

}

function roomsReport(route, credential, rooms){

  const doc = new PDFDocument();
  console.log("generando reporte de habitaciones")
  doc.margin = 10

  const writeStream = fs.createWriteStream(route+"/habitaciones-reporte.pdf");

doc.pipe(writeStream);

doc.moveDown().fontSize(15).text('Listado de Habitaciones',34, 30,{align: "center",});

doc.fontSize(15).text(credential.empresa)
doc.fontSize(10).moveUp().text(`Tel: ${credential.telefono}`, {align: "center"});
doc.fontSize(10).moveUp().text(`Direccion: ${credential.direccion}`, {align: "right"});
doc.roundedRect(26, 24, 524, 40, 3).stroke();

 const table = {
  headers: ["Id","Descripcion", "Observacion", "MontoDia"],
  rows: orderArray(setArray(rooms))
};
doc.fontSize(12).moveDown().table(table, { 
  width: 500,
   prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
   prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
     doc.font("Helvetica").fontSize(10);
     indexColumn === 9;
   },
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

function servicesReport(route, credential, rooms){

  const doc = new PDFDocument();
  console.log("generando reporte de habitaciones")
  doc.margin = 10

  const writeStream = fs.createWriteStream(route+"/consumiciones-reporte.pdf");

doc.pipe(writeStream);

doc.moveDown().fontSize(15).text('Listado de Consumisiones',34, 30,{align: "center",});

doc.fontSize(15).text(credential.empresa)
doc.fontSize(10).moveUp().text(`Tel: ${credential.telefono}`, {align: "center"});
doc.fontSize(10).moveUp().text(`Direccion: ${credential.direccion}`, {align: "right"});
doc.roundedRect(26, 24, 524, 40, 3).stroke();

 const table = {
  headers: ["Id","Descripcion" , "Observacion", "Monto"],
  rows: orderArray(setArray(rooms)),
};
doc.fontSize(20).moveDown().table(table, { 
  width: 500,
   prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
   prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
     doc.font("Helvetica").fontSize(10);
     indexColumn === 9;
   },
});
let pages = doc.bufferedPageRange();

//pie de pagina
for (let i = 0; i < pages.count; i++) {
doc.switchToPage(i);
let oldBottomMargin = doc.page.margins.bottom;
doc.page.margins.bottom = 0 
doc.fontSize(10)
  .text(
    `fecha: ${getDate()}                                                                                           Pag.: ${i + 1} de ${pages.count}`,
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

function staysDetailedReport(route, credential, list){

  const doc = new PDFDocument();
  console.log("generando reporte de habitaciones")
  doc.margin = 10

  function stay0rderArray(data){
    let newArr = []
    for (const i of data) {
      let iArr = []
      iArr.push(i[0])//id
      iArr.push(i[2]+" "+i[3])//cliente
      iArr.push(i[5])//habitacion
      iArr.push(i[8])//estado
      iArr.push(i[6])//montoDia
      iArr.push(i[9])//entrada
      iArr.push(i[10])//salida
      iArr.push(i[12])//habitacion

      newArr.push(iArr)
    }
    return newArr
}



  const writeStream = fs.createWriteStream(route+"/estadias-reporte.pdf");

doc.pipe(writeStream);

doc.moveDown().fontSize(15).text('Informe de Estadias',34, 30,{align: "center",});

doc.fontSize(15).text(credential.empresa)
doc.fontSize(10).moveUp().text(`Tel: ${credential.telefono}`, {align: "center"});
doc.fontSize(10).moveUp().text(`Direccion: ${credential.direccion}`, {align: "right"});
doc.roundedRect(26, 24, 524, 40, 3).stroke();

 const table = {
  headers: ["Id", "Cliente", "Habitacion", "Estado", "MontoDia", "Entrada", "Salida", "total"],
  rows: stay0rderArray(setArray(list)),
};
doc.fontSize(20).moveDown().table(table, { 
  width: 520,
   prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
   prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
     doc.font("Helvetica").fontSize(8);
     indexColumn === 9;
   },
});
let pages = doc.bufferedPageRange();

//pie de pagina
for (let i = 0; i < pages.count; i++) {
doc.switchToPage(i);
let oldBottomMargin = doc.page.margins.bottom;
doc.page.margins.bottom = 0 
doc.fontSize(10)
  .text(
    `fecha: ${getDate()}                                                                                           Pag.: ${i + 1} de ${pages.count}`,
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
function staysSummarizedReport(route, credential, list){

  const doc = new PDFDocument();
  console.log("generando reporte de habitaciones")
  doc.margin = 10

  function stay0rderArray(data){
    let newArr = []
    for (const i of data) {
      let iArr = []
      iArr.push(i[0])//id
      iArr.push(i[2]+" "+i[3])//cliente
      iArr.push(i[5])//habitacion
      iArr.push(i[8])//estado
      iArr.push(i[9])//entrada
      iArr.push(i[12])//total

      newArr.push(iArr)
    }
    return newArr
}
  const writeStream = fs.createWriteStream(route+"/estadias-reporte.pdf");

doc.pipe(writeStream);

doc.moveDown().fontSize(15).text('Informe de Estadias',34, 30,{align: "center",});

doc.fontSize(15).text(credential.empresa)
doc.fontSize(10).moveUp().text(`Tel: ${credential.telefono}`, {align: "center"});
doc.fontSize(10).moveUp().text(`Direccion: ${credential.direccion}`, {align: "right"});
doc.roundedRect(26, 24, 524, 40, 3).stroke();

 const table = {
  headers: ["Id", "Cliente", "Habitacion", "Estado","Entrada", "total"],
  rows: stay0rderArray(setArray(list)),
};
doc.fontSize(20).moveDown().table(table, { 
  width: 520,
   prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
   prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
     doc.font("Helvetica").fontSize(8);
     indexColumn === 9;
   },
});
let pages = doc.bufferedPageRange();

//pie de pagina
for (let i = 0; i < pages.count; i++) {
doc.switchToPage(i);
let oldBottomMargin = doc.page.margins.bottom;
doc.page.margins.bottom = 0 
doc.fontSize(10)
  .text(
    `fecha: ${getDate()}                                                                                           Pag.: ${i + 1} de ${pages.count}`,
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
  clientReport,
  roomsReport,
  servicesReport,
  staysDetailedReport,
  staysSummarizedReport
}