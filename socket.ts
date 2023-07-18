import "dotenv/config";

import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const SOCKET_PORT = parseInt(process.env.SOCKET_PORT!); // socket.io requires argument to be a number

const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_URL,
  },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.to(message.room).emit("message", message);
  });

  socket.on("join", (message) => {
    socket.join(message.room);
    io.to(message.room).emit("join", message);
  });
});

server.listen(SOCKET_PORT, () => {
  console.log(`listening on ${SOCKET_PORT}`);
});
