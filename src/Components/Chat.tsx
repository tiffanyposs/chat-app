import { Socket } from 'socket.io-client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { MessageProps } from './ChatApp';

interface ChatProps {
  socket: Socket;
  room: string;
  username: string;
}

function Chat({ socket, room, username }: ChatProps) {
  const [ message, setMessage ] = useState<string>('');

  const updateMessage = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.currentTarget.value || '');
  }

  const sendMessage = (e: FormEvent): void => {
    e.preventDefault();
    const formattedMessage: MessageProps = {
      type: 'message',
      room,
      username,
      message,
    }

    socket.emit('message', formattedMessage);

    setMessage('');
  }

  return (
    <div>
      <div>
        <h3>Current Room: {room}</h3>
      </div>
      <form onSubmit={sendMessage}>
        <input value={message} onChange={updateMessage} placeholder="Write a message" />
        <button>Send</button>
      </form>
    </div>
  )
}

export default Chat;