//Modulos ha utilizar. 

const fs = require('fs');
const readLineSync = require("readline-sync")
const XLSX = require("xlsx")

//inicio
const op = readLineSync.question(
    `Welcome ;) por favor elija una opcion:
    1) Leer un archivo
    2) Crear un archivo
    `
);

if (op === "1") {
    fileName = readLineSync.question(
      "Colocar el archivo en la carpeta y escriba su nombre con la extension: "
    ); 

    const fileContent = fs.readFileSync(fileName);
    console.log(fileContent.toString());

} else if (op === "2"){
    fileName = readLineSync.question("Escribe el nombre del archivo: ");
    console.log(`Indicaciones:
    1. Para terminar la linea y realizar un salto pulsar ENTER.
    2. Para terminar de escribir el contenido del archivo escriba: .salir. `);

    linea = "";
    contenido = "";
    while (linea !==".salir."){
        linea = readLineSync.question("");
        if (linea !== ".salir."){
            contenido += linea + "\n";
        }
    }

    //Guarda contenido del archivo
    fileToWrite = fileName + ".json";
    fs.writeFile(fileToWrite, contenido, (err) =>{
        if (err) throw err;

        console.log(`Archivo ${fileToWrite} guardado exitosamente:)`);

    });

    //conversiones
} else if (op === "3"){
    console.log(`Coloque el archivo que desea transformar.`);
    const conversType = readLineSync.question(`Elija una conversion de JSON a CSV o de CSV a JSON
    1)json a csv
    2)csv a json
    `);

    const ArchvoOld = readLineSync.question("Escriba el nombre del archivo a convertir sin extension: ");
    const ArchNew = readLineSync.question("Escribe el nombre el archivo nuevo: ");

    if (conversType === "1"){
        var data = require("./" + ArchvoOld + ".json");
        const workSheet = XLSX.utils.json_to_sheet(data);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Hoja1");
        XLSX.writeFile(workBook,  ArchNew + ".csv", { bookType: ".json" });
        console.log(`Archivo ${ArchNew} guardado exitosamente:)`);

        
    } else if (conversType === "2"){
        const workBook = XLSX.readFile(ArchvoOld + ".csv");
        var jsonData = XLSX.utils.sheet_to_json(
          workBook.Sheets[workBook.SheetNames[0]]
        );
        fs.writeFile(ArchNew + ".json", JSON.stringify(jsonData), (err) => {
          if (err) throw err;
          console.log(`Archivo ${ArchNew} guardado exitosamente :)`);
        });
    
} else {
    console.log("Error seleccione una opcion valida"); 
}

} else {
    console.log("Error seleccione una opcion valida"); 
}
