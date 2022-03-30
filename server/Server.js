const express = require("express")
const app = express()

const http = require("http")

const cors = require("cors")

const { Server } = require("socket.io")

app.use(cors())

const httpserver = http.createServer(app)

const io = new Server(httpserver,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    // this is a event having name connection it start when user connected to server
    console.log(socket.id)

    socket.on("Join_Room",(data)=>{
        socket.join(data.RoomID)
        console.log(data)
    })

    socket.on("Send_Message",(data)=>{
        console.log(data)
        socket.to(data.Room).emit("Receive_Message",data)
    })

    socket.on("disconnect",()=>{
        // this is a event having name disconnect it start when user disconnected to server
        console.log("user disconect: ",socket.id)
    })
})

httpserver.listen(3001,()=>{

    console.log("server runing")
})