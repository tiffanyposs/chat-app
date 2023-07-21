import { useState, useEffect } from 'react';
import ChatLogin from './ChatLogin';
import Chat from './Chat';
import ChatDisconnect from './ChatDisconnect';
import ChatMessages from './ChatMessages';
import ChatRooms from './ChatRooms';
import ChatRoomUsers from './ChatRoomUsers';
import { colors } from './constants';
import { socket } from '../socket';
import MainLayout from './MainLayout';
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
  const [ joinedRoom, setJoinedRoom ] = useState<boolean>(false);
  const [ messages, setMessages ] = useState<MessageProps[]>([]);

  useEffect(() => {
    function onMessage(message: MessageProps) {
      setMessages(arr => [...arr, message])
    }

    socket.on('message', onMessage);

    return () => {
      socket.disconnect();
      socket.off('message', onMessage);
    };
  }, []);

  function onRoomJoin() {
    setJoinedRoom(true);

    socket.emit('message', {
      type: 'join',
      username,
      room,
      message: `${username} joined the chat.`
    })
  }

  function onDisconnect() {
    setJoinedRoom(false);
    setUsername('');
    setRoom('');
    setMessages([]);
  }

  function selectRoom(selectedRoom: string) {
    setRoom(selectedRoom)
  }

  return (
    <div style={{ height: '90vh'}}>
      <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'stretch', 
          height: '100%' 
        }}
      >
        {joinedRoom ? (
          <>    
            <MainLayout>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '100%' ,
                padding: '20px',
                backgroundColor: colors.pink
              }}>
                <ChatDisconnect 
                  socket={socket} 
                  onDisconnect={onDisconnect}
                />
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <ChatMessages 
                    messages={messages}
                    username={username}
                  />
                  <Chat
                    socket={socket}
                    room={room}
                    username={username}
                  />
                </div>
              </div>
            </MainLayout>
            <ChatRoomUsers socket={socket} />
          </>
        ) : (
          <>
            <ChatLogin 
              socket={socket} 
              room={room} 
              setRoom={setRoom} 
              username={username}
              setUsername={setUsername}
              onRoomJoin={onRoomJoin} 
            />
            <ChatRooms 
              socket={socket} 
              selectRoom={selectRoom} 
            />
          </>
        )}
      </div>
    </div>
  )
}

export default ChatApp;