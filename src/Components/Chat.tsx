import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { io } from 'socket.io-client';

const REACT_APP_SOCKET_URL = process.env.REACT_APP_SOCKET_URL!;
const socket = io(REACT_APP_SOCKET_URL, {
  autoConnect: false
});

interface Message {
  message: string;
}

function Chat() {
  const [connected, setConnected] = useState(false);
  const [chat, setChat] = useState('');
  const [messages, updateMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setConnected(true);
    }

    function onDisconnect() {
      setConnected(false);
    }

    function onMessage(message: Message) {
      updateMessages(arr => [...arr, message])
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessage)

    return () => {
      socket.disconnect();
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage);
    };
  }, [])

  const sendChat = () => {
    socket.emit('message', {
      message: chat,
    });
    setChat('');
  } 

  const chatUpdate = (e: ChangeEvent<HTMLInputElement>): void => {
    setChat(e.currentTarget.value || '');
  }

  const chatSubmit = (e: FormEvent): void => {
    e.preventDefault();
    sendChat();
  }

  return (
    <div>
      <div>
        {messages.map((message: Message, index) => (
          <p key={index}>{message.message}</p>
        ))}
      </div>
      <form onSubmit={chatSubmit}>
        <input value={chat} onChange={chatUpdate}/>
      </form>
      <p>You are {connected ? 'connected' : 'disconnected'}.</p>
    </div>
  );
}

export default Chat;