import { useState, ChangeEvent, FormEvent } from 'react';
import { Socket } from 'socket.io-client';
import { MessageProps, ConnectProps } from './ChatApp';

interface ChatLoginProps {
  socket: Socket;
  onConnect: (data: ConnectProps) => void;
}

function ChatLogin({ socket, onConnect }: ChatLoginProps) {
  const [ room, setRoom ] = useState<string>('');
  const [ username, setUsername ] = useState<string>('');

  const updateRoom = (e: ChangeEvent<HTMLInputElement>): void => {
    setRoom(e.currentTarget.value || '');
  };

  const updateUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value || '');
  };

  const connectSocket = (e: FormEvent): void => {
    e.preventDefault();
    if (room && username){ 
      socket.connect();

      onConnect({
        username,
        room,
      })
    }
  }
  
  return (
    <div>
      <p>Room: {room}</p>
      <p>Username: {username}</p>
      <form onSubmit={connectSocket}>
        <label>Room Name: </label>
        <input value={room} onChange={updateRoom} />
        <label >Username: </label>
        <input value={username} onChange={updateUsername} />
        <button>Connect</button>
      </form>
    </div>
  )
}

export default ChatLogin;