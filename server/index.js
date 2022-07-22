const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const {Server} = require('socket.io')

const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods :["POST","GET"]
        
    }
});

io.on("connection", (socket)=>{
    console.log(`User Connected : ${socket.id}`);

    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id);
    })
    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`user with id ${socket.id} joined room ${data}`)

    });
    socket.on("send_msg",(data)=>{
        socket.to(data.room).emit("recieve_msg",data);
    });
})
server.listen(3001,()=>{
    console.log("server connected");
})