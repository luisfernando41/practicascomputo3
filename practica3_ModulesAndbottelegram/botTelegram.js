const {Telegraf} = require("telegraf");
const bot = new Telegraf("5103522643:AAFl9LHweZzawHAEn9WWfVn3hUItO2nxqZw");

bot.start((ctx) =>{
    ctx.reply( `Programacion computacional IV, Bienvenido ${ctx.from.first_name}`);
});

//comando personalizado 

bot.command(['saludar', 'saludo', 'hola'], (ctx) =>{
    ctx.reply("Buenos días");
});

bot.on('sticker', (ctx)=>{
    ctx.reply("Fachero tu stickers bro")

});

// shorturl.at/qXY29



bot.launch();