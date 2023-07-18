import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import ChatLogin from './ChatLogin';
import { socket } from '../socket';

interface MessageProps {
  message: string;
  username: string;
  room: string;
}

interface JoinProps {
  room: string;
  username: string;
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
      const formattedJoin: JoinProps = {
        room,
        username,
      }

      socket.emit('join', formattedJoin);
    }

    function onDisconnect() {
      setConnected(false);
      setUsername('');
      setRoom('');
    }

    function onJoin(message: JoinProps) {
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
        <div>
          <div>
            <h3>Room: {room}</h3>
            {messages.map((message, index) => (
              <p key={index}>{message.username}: {message.message}.</p>
            ))}
          </div>
          <form onSubmit={sendMessage}>
            <input value={message} onChange={updateMessage} placeholder="Write a message" />
            <button>Send</button>
          </form>
        </div>
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