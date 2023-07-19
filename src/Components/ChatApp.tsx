import { useState, useEffect } from 'react';
import ChatLogin from './ChatLogin';
import Chat from './Chat';
import ChatDisconnect from './ChatDisconnect';
import { socket } from '../socket';

export interface MessageProps {
  type: 'join' | 'message' | 'leave';
  username: string;
  room: string;
  message: string;
}

function ChatApp() {
  const [ room, setRoom ] = useState<string>('');
  const [ username, setUsername ] = useState<string>('');
  const [ connected, setConnected ] = useState<boolean>(false);
  const [ messages, setMessages ] = useState<MessageProps[]>([]);

  useEffect(() => {
    function onConnect() {
      setConnected(true);
    }

    function onMessage(message: MessageProps) {
      if (message.type === 'join') {
        console.log('join');
        setRoom(message.room)
        setUsername(message.username);
      }

      setMessages(arr => [...arr, message])
    }

    function onDisconnect() {
      setConnected(false);
      setUsername('');
      setRoom('');
    }

    socket.on('connect', onConnect)
    socket.on('message', onMessage);
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.disconnect();
      socket.off('connect', onConnect);
      socket.off('message', onMessage);
      socket.off('disconnect', onDisconnect)
    };
  }, []);

  return (
    <div>
      {connected ? (
        <div>
          <div>
            {messages.map((message, index) => (
              <p key={index}>{message.username}: {message.message}</p>
            ))}
          </div>
          <Chat
            socket={socket}
            room={room}
            username={username}
          />
          <ChatDisconnect socket={socket} />
        </div>
      ) : (
        <ChatLogin socket={socket} />
      )}
    </div>
  )
}

export default ChatApp;