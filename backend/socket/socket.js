const { Server } =require("socket.io")
const http = require("http")
const express = require("express")
const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:["https://visual-vault-app.vercel.app"],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }
});

const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId]
}

const userSocketMap = {};  //{userId:socketId}

io.on('connection',(socket)=>{
    console.log("a user connected",socket.id)

    const userId = socket.handshake.query.userId;
    if(userId !== undefined && userId != "undefined") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

module.exports = {app,io,server,getReceiverSocketId}