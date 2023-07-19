import { Socket } from "socket.io-client";

interface ChatDisconnectProps {
  socket: Socket;
  onDisconnect: () => void;
}

function ChatDisconnect({ socket, onDisconnect }: ChatDisconnectProps) {
  const disconnectSocket = (): void => {
    socket.disconnect();
    onDisconnect();
  }

  return (
    <button onClick={disconnectSocket}>Disconnect</button>
  )
}

export default ChatDisconnect;