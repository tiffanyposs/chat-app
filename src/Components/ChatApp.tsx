import { useState, useEffect } from 'react';
import ChatLogin from './ChatLogin';
import Chat from './Chat';
import ChatDisconnect from './ChatDisconnect';
import ChatMessages from './ChatMessages';
import { socket } from '../socket';

export interface ConnectProps {
  username: string;
  room: string;
}
export interface MessageProps {
  type: 'join' | 'message' | 'leave';
  username: string;
  room: string;
  message: string;
}

export interface RoomProps {
  [room: string]: string[]; 
}

function ChatApp() {
  const [ room, setRoom ] = useState<string>('');
  const [ username, setUsername ] = useState<string>('');
  const [ connected, setConnected ] = useState<boolean>(false);
  const [ messages, setMessages ] = useState<MessageProps[]>([]);
  const [ rooms, setRooms ] = useState<RoomProps>({});

  useEffect(() => {
    function onMessage(message: MessageProps) {
      setMessages(arr => [...arr, message])
    }

    function onRoomUpdate(data: RoomProps) {
      setRooms(data);
    }

    socket.on('message', onMessage);
    socket.on('roomUpdate', onRoomUpdate);

    return () => {
      socket.disconnect();
      socket.off('message', onMessage);
      socket.off('roomUpdate', onRoomUpdate)
    };
  }, []);

  function onConnect({ username, room }: ConnectProps) {
    setConnected(true);
    setRoom(room)
    setUsername(username);

    socket.emit('message', {
      type: 'join',
      username,
      room,
      message: `${username} joined the chat.`
    })
  }

  function onDisconnect() {
    setConnected(false);
    setUsername('');
    setRoom('');
  }

  return (
    <div>
      {connected ? (
        <div>
          <div>
            <h3>Open Rooms</h3>
            {!!Object.keys(rooms).length && Object.keys(rooms).map(room => (
              <p>{room} - {rooms[room].length}</p>
            ))}
          </div>
          <ChatMessages 
            messages={messages}
            username={username}
          />
          <Chat
            socket={socket}
            room={room}
            username={username}
          />
          <ChatDisconnect socket={socket} onDisconnect={onDisconnect}/>
        </div>
      ) : (
        <ChatLogin socket={socket} onConnect={onConnect} />
      )}
    </div>
  )
}

export default ChatApp;