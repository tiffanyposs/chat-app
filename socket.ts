import "dotenv/config";

import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);

const SOCKET_PORT = parseInt(process.env.SOCKET_PORT!); // socket.io requires argument to be a number

const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_URL,
  },
});

interface ConnectionData {
  socketId: string;
  username: string;
}

const users: { [key: string]: string } = {};
const rooms: { [key: string]: ConnectionData[] } = {};

const handleJoin = (message: any, socket: Socket) => {
  socket.join(message.room);
  socket.data.username = message.username;
  socket.data.room = message.room;

  users[socket.id] = message.username;

  const connectionData: ConnectionData = {
    socketId: socket.id,
    username: message.username,
  };

  if (rooms[message.room]) {
    rooms[message.room].push(connectionData);
  } else {
    rooms[message.room] = [connectionData];
  }

  io.emit("roomUpdate", rooms); // all users get room update
  io.to(message.room).emit("userUpdate", rooms[message.room]);
};

const handleMessage = (message: any, socket: Socket) => {
  if (message.type === "join") handleJoin(message, socket);
  io.to(message.room).emit("message", message);
};

const handleDisconnect = (socket: Socket) => {
  const { room, username } = socket.data;

  if (rooms[room]?.length > 1) {
    rooms[room] = rooms[room].filter(
      (connection) => connection.socketId !== socket.id
    );

    io.to(room).emit("message", {
      type: "leave",
      room,
      username,
      message: `${username} left room.`,
    });
  } else {
    delete rooms[room];
  }

  io.emit("roomUpdate", rooms); // all users get room update
  io.to(room).emit("userUpdate", rooms[room]); // room users get room user updates
};

io.on("connection", (socket) => {
  socket.on("message", (message) => handleMessage(message, socket));
  socket.on("disconnect", (reason) => handleDisconnect(socket));
  io.emit("roomUpdate", rooms);
});

server.listen(SOCKET_PORT, () => {
  console.log(`listening on ${SOCKET_PORT}`);
});
