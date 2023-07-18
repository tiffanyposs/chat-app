import { io } from "socket.io-client";

const REACT_APP_SOCKET_URL = process.env.REACT_APP_SOCKET_URL!;

export const socket = io(REACT_APP_SOCKET_URL, {
  autoConnect: false,
});
