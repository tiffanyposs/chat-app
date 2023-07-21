import { Socket } from 'socket.io-client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { MessageProps } from './ChatApp';
import Button from './Button';
import { colors } from './constants';

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
      <form onSubmit={sendMessage} style={{ flexDirection: 'row' }}>
        <input 
          value={message} 
          onChange={updateMessage} 
          placeholder="Write a message"
          style={{ marginRight: '5px' }}
        />
        <Button backgroundColor={colors.blue}>Send</Button>
      </form>
    </div>
  )
}

export default Chat;