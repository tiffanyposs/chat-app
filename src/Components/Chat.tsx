import { io } from 'socket.io-client';


function Chat() {
  const REACT_APP_SOCKET_URL = process.env.REACT_APP_SOCKET_URL!;
  const socket = io(REACT_APP_SOCKET_URL);

  console.log(REACT_APP_SOCKET_URL);
  return (
    <div>Chat Component</div>
  )

}

export default Chat;