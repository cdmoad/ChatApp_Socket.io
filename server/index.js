const express= require("express");
const app=express();
const mongoose=require('mongoose');
const cors = require('cors');
const Bcrypt=require("bcryptjs");
const http=require("http");
const {Server} = require("socket.io")

app.use(express.json())
app.use(cors())

    const server=http.createServer(app)

    const io = new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        },
      });
      
      io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
      
        socket.on("join_room", (data) => {
          socket.join(data);
          console.log(`User with ID: ${socket.id} joined room: ${data}`);
        });
      
        socket.on("send_message", (data) => {
          socket.to(data.room).emit("receive_message", data);
        });
      
        socket.on("disconnect", () => {
          console.log("User Disconnected", socket.id);
        });
      });




    
    server.listen(5003,()=>{console.log("Server started on port 5003")})