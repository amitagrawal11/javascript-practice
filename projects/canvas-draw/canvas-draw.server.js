const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/canvas-draw.html');
});

io.on('connection', (socket) => {
    console.log('Client connection with id: ' + socket.id);
    socket.on('message', (data) => {
        // console.log('received data:', data);
    });
    console.log('a user connected');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});