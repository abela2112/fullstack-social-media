import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
const app = express();
const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: ['http://localhost:3000']
    }
})
export const getRecieverSocketId=(userId)=>{
    return userSocketMap[userId]
}
// user socket map used to store online users
const userSocketMap={}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    const userId=socket.handshake.query.userId
   
    if (userId){
        userSocketMap[userId]=socket.id
        console.log("userSocketMap",userSocketMap)
    }
    io.emit('getOnlineUsers',Object.keys(userSocketMap))
    socket.on('disconnect', () => {
        console.log('a user disconnected', socket.id);
        if(userId){
            delete userSocketMap[userId]
        }
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    });
})
export {io, server, app}