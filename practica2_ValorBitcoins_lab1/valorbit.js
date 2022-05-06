var http = require('http');

http.get({
        host: 'api.coindesk.com',
        path: '/v1/bpi/currentprice.json'
        },
        function(response) {
                // Actualizar continuamente el stream de datos
                var bitcon = '';
                response.on('data', function(vb) { bitcon += vb; });
                response.on('end', function() {

                        // La recepcion de datos ha sido satisfactoria. Puedes hacer lo que quieras
                        var parsed = JSON.parse(bitcon);
                        console.log(parsed.bpi.EUR.rate);
                        console.log("Este es el valor del bitcoins actualmente en euros.");

                        console.log(parsed.bpi.USD.rate);
                        console.log("Este es el valor del bitcoins actualmente en dolares.");
                        
                        console.log(parsed.bpi.GBP.rate);
                        console.log("Este es el valor del bitcoins actualmente en libra esterlina.");
                });
        
        }
);