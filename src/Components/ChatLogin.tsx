import { useEffect, ChangeEvent, FormEvent } from 'react';
import { Socket } from 'socket.io-client';

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
  }, []);

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