const express = require('express');
const socket = require('socket.io');

// app config
const app = express();
const server = app.listen(3000, () => {
    console.log('http://localhost:3000');
});

app.use(express.static("public")); //archivos estaticos

// socket
const io = socket(server);
const users = new Set(); //utilizada para almacenar los usuarios conectados

io.on('connection', (socket) => {
    console.log("SOCKET CONNECTION!");

    socket.on('newUser', (data) => {
        socket.userId = data;
        users.add(data);
        io.emit('newUser', [...users])
    })
    socket.on('disconnect', () => {
        users.delete(socket.userId);
        io.emit('userDisconnected', socket.userId);
    })
    socket.on('chat', (data) => {
        io.emit('chat', data)
    })
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});