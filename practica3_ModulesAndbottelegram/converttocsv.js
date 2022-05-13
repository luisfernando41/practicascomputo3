var fs = require("fs");
var stringify = require("csv-stringify");

var data =[
    {"country": "El salvador", "Official Lenguages(s)": "Spanish"},
    {"country": "India", "Official Lenguages(s)": "Hindi, English"}

]; 

stringify.stringify(data, {
    header: true
}, function (err, output){
    fs.writeFileSync(__dirname+"data.csv",output);
  
});