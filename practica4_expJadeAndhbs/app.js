const express = require('express');
const app = express();

//definir moto de platilla a utilizar 

app.set('view engine', 'jade');


app.get('/', function(req, res){
    res.render('index',
    {title:"Programación Computacional IV", message: "Express con jade"});
});

app.get('/hello', function(req, res){
    res.send("hello world");

});

app.route('/test').get(function(req, res){
    res.send("Test page");
});



const server = app.listen(3000); 

