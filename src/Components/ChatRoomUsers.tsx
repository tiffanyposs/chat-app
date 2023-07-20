import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

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
    <div>
      <h3>Chat Room Users</h3>
      <div>
        {users.length ? (
          users.map(user => (
            <p key={user.socketId}>{user.username}</p>
          ))
        ) : (
          <p>Nobody Here</p>
        )}
      </div>
    </div>
  )
}

export default ChatRoomUsers