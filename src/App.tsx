import NavBar from './Components/Navbar';
import ChatApp from './Components/ChatApp';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw', display: "flex", flexDirection: "column" }}>
      <NavBar />
      <ChatApp />
    </div>
  );
}

export default App;
