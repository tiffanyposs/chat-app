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
    if (message.type === "join") {
      socket.join(message.room);
      socket.data.username = message.username;
      socket.data.room = message.room;
    }
    io.to(message.room).emit("message", message);
  });

  socket.on("disconnect", (reason) => {
    const { room, username } = socket.data;
    io.to(room).emit("message", {
      type: "leave",
      room,
      username,
      message: `${username} left room.`,
    });
  });
});

server.listen(SOCKET_PORT, () => {
  console.log(`listening on ${SOCKET_PORT}`);
});
