import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import ChatLogin from './ChatLogin';
import Chat from './Chat';
import { socket } from '../socket';

export interface MessageProps {
  type: 'join' | 'message';
  username: string;
  room: string;
  message: string;
}

function ChatApp() {
  const [ room, setRoom ] = useState<string>('');
  const [ username, setUsername ] = useState<string>('');
  const [ connected, setConnected ] = useState<boolean>(false);
  const [ message, setMessage ] = useState<string>('')
  const [ messages, setMessages ] = useState<MessageProps[]>([]);

  useEffect(() => {
    function onConnect() {
      setConnected(true);
      const formattedJoin: MessageProps = {
        type: 'join',
        room,
        username,
        message: `${username} joined room.`
      }

      socket.emit('join', formattedJoin);
    }

    function onDisconnect() {
      setConnected(false);
      setUsername('');
      setRoom('');
    }

    function onJoin(message: MessageProps) {
      alert(`${message.username} joined the room`);
    }

    function onMessage(message: MessageProps) {
      setMessages(arr => [...arr, message])
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('join', onJoin);
    socket.on('message', onMessage)

    return () => {
      socket.disconnect();

      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('join', onJoin);
      socket.off('message', onMessage);
    };
  }, [room, username]);

  const updateRoom = (e: ChangeEvent<HTMLInputElement>): void => {
    setRoom(e.currentTarget.value || '');
  };

  const updateUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.currentTarget.value || '');
  };

  const connectSocket = (e: FormEvent): void => {
    e.preventDefault();
    if (room && username) socket.connect();
  }

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
      {connected ? (
        <Chat 
          messages={messages}
          message={message}
          room={room}
          onSubmit={sendMessage}
          onChange={updateMessage}
        />
      ) : (
        <ChatLogin 
          connectSocket={connectSocket}
          room={room}
          updateRoom={updateRoom}
          username={username}
          updateUsername={updateUsername}
        />
      )}
    </div>
  )
}

export default ChatApp;