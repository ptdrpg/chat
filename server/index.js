const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        optionsSuccessStatus: 200,
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
        console.log('user connected with ID: ', socket.id);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`user with ID: ${socket.id} is connected in the room: ${data}`);
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })
    socket.on("disconnect", () => {
        console.log("user deconnecter");
    })
})
    
server.listen(3001, () => {
    console.log("SERVER ON");
})