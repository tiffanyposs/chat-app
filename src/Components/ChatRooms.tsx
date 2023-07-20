import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface ChatRoomsProps {
  socket: Socket;
  selectRoom: (room: string) => void;
}

export interface RoomProps {
  [room: string]: string[]; 
}

function ChatRooms({ socket, selectRoom }: ChatRoomsProps) {
  const [ rooms, setRooms ] = useState<RoomProps>({});

  useEffect(() => {
    socket.on('roomUpdate', setRooms);

    return () => {
      socket.off('roomUpdate', setRooms)
    };
  }, [])

  const roomList = Object.keys(rooms);

  return (
    <div>
      <h3>Open Rooms</h3>
      {!!roomList.length ? (
        roomList.map(room => (
          <p key={room} onClick={() => selectRoom(room)}>
            {room} - {rooms[room].length}
          </p>
        ))
      ) : (
        <p>There are 0 rooms open.</p>
      )}
    </div>
  )
}

export default ChatRooms;