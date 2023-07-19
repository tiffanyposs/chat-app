import { Socket } from "socket.io-client";

interface ChatDisconnectProps {
  socket: Socket;
}

function ChatDisconnect({ socket }: ChatDisconnectProps) {
  const disconnectSocket = (): void => {
    socket.disconnect();
    // setConnected(false);
    // setUsername('');
    // setRoom('');
  }

  return (
    <button onClick={disconnectSocket}>Disconnect</button>
  )
}

export default ChatDisconnect;