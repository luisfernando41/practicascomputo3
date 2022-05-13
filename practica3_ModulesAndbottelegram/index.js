/*var fs = require("fs");
var parse = require("csv-parse");

var parser = parse.parse({columns:true}, function(err, records){
    console.log(records);
});

fs.createReadStream(__dirname+'/listado.csv').pipe(parser);
*/

(async function(){
    const fileContent = await fs.readFile(__dirname+'/listado.csv');
    const records = parse.parse(fileContent, {columns:true});
    console.log(records);
})();