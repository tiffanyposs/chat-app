import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import SideBar from './SideBar/SideBar';
import { SideBarList, SideBarListItem } from './SideBar/styled';

interface ChatRoomUsersProps {
  socket: Socket;
}

interface SocketUser {
  socketId: string;
  username: string;
}

function ChatRoomUsers({ socket }: ChatRoomUsersProps) {
  const [ users, setUsers ] = useState<SocketUser[]>([]);

  useEffect(() => {
    function userUpdate(updatedUsers: SocketUser[]) {
      setUsers(updatedUsers);
    }

    socket.on('userUpdate', userUpdate);

    return () => {
      socket.off('userUpdate', userUpdate);
    };
  }, [socket]);

  return (
    <SideBar>
      <h3>Chat Room Users</h3>
      <SideBarList>
        {users.length ? (
          users.map(user => (
            <SideBarListItem key={user.socketId}>{user.username}</SideBarListItem>
          ))
        ) : (
          <p>Nobody Here</p>
        )}
      </SideBarList>
    </SideBar>
  )
}

export default ChatRoomUsers