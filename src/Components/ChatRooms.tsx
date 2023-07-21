import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { colors } from './constants';
import styled from '@emotion/styled';


const List = styled.ul({
  backgroundColor: colors.yellow,
  flexGrow: '1',
  border: `1px solid ${colors.black}`,
  overflow: 'scroll',
});

const ListItem = styled.li({
  padding: '15px 5px',
  borderBottom: `1px solid ${colors.black}`
})

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
  })

  const roomList = Object.keys(rooms);

  return (
    <div style={{ 
      padding: '20px', 
      borderLeft: `1px solid ${colors.black}`, 
      height: '100%',
      overflow: 'hidden',
      minWidth: '200px',
      maxWidth: '300px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3>Open Rooms</h3>
      <List>
        {!!roomList.length ? (
          roomList.map(room => (
            <ListItem key={room} onClick={() => selectRoom(room)}>
              {room} - {rooms[room].length}
            </ListItem>
          ))
        ) : (
          <ListItem>There are 0 rooms open.</ListItem>
        )}
      </List>
    </div>
  )
}

export default ChatRooms;