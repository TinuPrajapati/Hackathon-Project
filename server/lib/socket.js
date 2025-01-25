import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
const app = express();

const server = createServer(app);

const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials:true
    }
})

// store list of online users
const usersocketMap = {}

export const getReceiverSocketId = (userId) => {
    return usersocketMap[userId];
};

io.on("connection",(socket)=>{
    console.log("a new client connected",socket.id);

    const { userId } = socket.handshake.query;
    if(userId){
        usersocketMap[userId] = socket.id;
    }
    io.emit("onlineUsers",Object.keys(usersocketMap));

    socket.on("disconnect",()=>{
        console.log("a client disconnected",socket.id);
        delete usersocketMap[userId];
        io.emit("onlineUsers",Object.keys(usersocketMap));
    })
})

export { io, server ,app};