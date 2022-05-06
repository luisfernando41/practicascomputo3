const edadUsuario=(edad)=>edad;
exports.edadUsuario=(edad)=>{

if(edad >= 18){
    console.log("Es  mayor de edad");
}else{
    console.log("Es menor de edad");
}
}