import { useState, ChangeEvent, FormEvent } from 'react';


interface ChatLoginProps {
  connectSocket: (data: FormEvent) => void;
  room: string;
  updateRoom: (event: ChangeEvent<HTMLInputElement>) => void;
  username: string;
  updateUsername: (event: ChangeEvent<HTMLInputElement>) => void;
}

function ChatLogin({ connectSocket, updateRoom, room, updateUsername, username }: ChatLoginProps) {
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