import "dotenv/config";

import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_URL,
  },
});

const SOCKET_PORT = parseInt(process.env.SOCKET_PORT!); // socket.io requires argument to be a number

io.on("connection", (socket) => {
  console.log("you are connected");
});

server.listen(SOCKET_PORT, () => {
  console.log(`listening on ${SOCKET_PORT}`);
});
