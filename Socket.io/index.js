const express=require('express')
const app=express()
const http=require('http')
const expressServer=http.createServer(app)



//loading socket io module and using server property from it 

const {Server}=require('socket.io')

//now crate object fro this new server and pass the already existing server expressServer here
const io=new Server(expressServer)


io.on('connection',(socket)=>{

    console.log('a user connected')
//here socket.on disconnect means when individual tab will be closed by particular socket , we can also use io.on disconnect that means he is disconnecting from server itself and not socket alone 
   
    setTimeout(()=>{ 
        socket.emit("messageEvent",'test message from server to client ') // we are sending message here from server to client which we will display it in div 
    },10000)
socket.on('disconnect',()=>{

        console.log('user disconnected')
    })

    socket.on("inputData",(data)=>{  // this is recieving dat from the client , we are sending message from client here 
        console.log(data)
    })
        // socket.on('message',(msg)=>{
        //     console.log(msg)
        // })
}) 

app.get('/',(req,res)=>{

    res.sendFile(__dirname+'/index.html')
})



expressServer.listen(3000,()=>{
    console.log('listening on port 3000')
})

