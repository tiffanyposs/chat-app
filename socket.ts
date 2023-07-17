import { Server } from "socket.io";
import "dotenv/config";

const io = new Server({});

const SOCKET_PORT = parseInt(process.env.SOCKET_PORT!); // socket.io requires argument to be a number

io.on("connection", (socket) => {
  console.log("you are connected");
});

io.listen(SOCKET_PORT);
