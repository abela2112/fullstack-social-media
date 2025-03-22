import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:3000"],
  },
});

export const getRecieverSocketId = (userId) => {
  console.log("usersocket map", userSocketMap);
  return userSocketMap[userId];
};
// user socket map used to store online users
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket?.handshake?.query?.userId;
  console.log("userId", userId);

  if (userId === undefined) {
    console.log("❌ Missing userId! Connection ignored.");
    return;
  } else {
    console.log("✅ userId found:", userId);
    userSocketMap[userId] = socket.id;
  }
  console.log("userSocketMap", userSocketMap);
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("setup", (userId) => {
    socket.join(userId);
    socket.emit("connected");
  });
  socket.on("join room", (room) => {
    socket.join(room);
  });
  // join room

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export {io, server, app}