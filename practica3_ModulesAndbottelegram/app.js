/*const modules = require("./modules")


console.log(modules.propery);
modules.getMessage();
*/

var tableData=[
    {a:25, b:32},
    {a:30, b:60}
];

console.log(tableData);
console.table(tableData); 

console.group("Bloque");
console.log("Primer elemento");
console.log("Segundo elemento");
console.groupEnd("Bloque");