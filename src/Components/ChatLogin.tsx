import { useEffect, ChangeEvent, FormEvent } from 'react';
import { Socket } from 'socket.io-client';
import MainLayout from './MainLayout';
import Button from './Button';
interface ChatLoginProps {
  socket: Socket;
  room: string;
  setRoom: (room: string) => void;
  username: string;
  setUsername: (username: string) => void;
  onRoomJoin: () => void;
}

function ChatLogin({ socket, onRoomJoin, room, setRoom, username, setUsername }: ChatLoginProps) {
  useEffect(() => {
    socket.connect(); // connect socket on load
  });

  const updateRoom = (e: ChangeEvent<HTMLInputElement>): void => {
    setRoom(e.currentTarget.value || '');
  };

  const updateUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value || '');
  };

  const connectSocket = (e: FormEvent): void => {
    e.preventDefault();

    if (room && username) onRoomJoin();
  }
  
  return (
    <MainLayout>
      <div style={{ width: '50%', maxWidth: '500px' }}>
        <h3>Login</h3>
        <form onSubmit={connectSocket}>
          <label>Room Name: </label>
          <input value={room} onChange={updateRoom} />
          <label >Username: </label>
          <input value={username} onChange={updateUsername} />
          <Button>Connect</Button>
        </form>
      </div>
    </MainLayout>
  )
}

export default ChatLogin;