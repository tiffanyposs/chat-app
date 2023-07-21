import { FormEvent } from "react";
import { Socket } from "socket.io-client";
import Button from "./Button";
import { colors } from "./constants";
interface ChatDisconnectProps {
  socket: Socket;
  onDisconnect: () => void;
}

function ChatDisconnect({ socket, onDisconnect }: ChatDisconnectProps) {
  const disconnectSocket = (e: FormEvent): void => {
    e.preventDefault();
    socket.disconnect();
    onDisconnect();
  }

  return (
    <form onSubmit={disconnectSocket}>
      <Button 
        backgroundColor={colors.yellow} 
        style={{ position: 'absolute', right: '20px', top: '20px' }}
      >
          Disconnect
      </Button>
    </form>
  )
}

export default ChatDisconnect;