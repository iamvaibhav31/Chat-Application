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
    console.log(socket.id)


    socket.on("disconnect",()=>{
        console.log("user disconect: ",socket.id)
    })
})

httpserver.listen(3001,()=>{

    console.log("server runing")
})