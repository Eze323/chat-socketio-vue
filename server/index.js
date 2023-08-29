import express from 'express'
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors'

import { PORT } from './config.js';
import { connect } from 'http2';


const app=express(); //aplicacion express

const server = http.createServer(app); // lo convierto en servidor http

const io = new SocketServer(server,{
    cors:{
        //origin:'*'
        origin:'http://localhost:3000'
    }
}); // se lo paso como parametro al servidor de websocket

app.use(cors());//cualquier servidor externo al servidor va poder conectarse
app.use(morgan('dev'));


io.on('connection',(socket)=>{
    console.log(socket.id+ ' a user connected')
    
    socket.on('message',(message)=>{
        //console.log(message);
        socket.broadcast.emit('message',{
            text:message.value,
            sender:socket.id,
        });
    })

})
server.listen(PORT);
console.log('Server stardet on port ' + PORT);
