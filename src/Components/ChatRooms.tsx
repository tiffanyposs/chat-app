import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import SideBar from './SideBar/SideBar';
import { SideBarList, SideBarListItem } from './SideBar/styled';

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
  }, [socket])

  const roomList = Object.keys(rooms);

  return (
    <SideBar>
      <h3>Open Rooms</h3>
      <SideBarList>
        {!!roomList.length ? (
          roomList.map(room => (
            <SideBarListItem style={{ cursor: 'pointer' }} key={room} onClick={() => selectRoom(room)}>
              {room} - {rooms[room].length}
            </SideBarListItem>
          ))
        ) : (
          <SideBarListItem>There are 0 rooms open.</SideBarListItem>
        )}
      </SideBarList>
    </SideBar>
  )
}

export default ChatRooms;