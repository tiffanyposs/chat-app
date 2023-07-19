import { ChangeEvent, FormEvent } from 'react';
import { MessageProps } from './ChatApp';

interface ChatProps {
  messages: MessageProps[];
  room: string;
  message: string;
  onSubmit: (event: FormEvent) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Chat({ messages, message, room, onSubmit, onChange }: ChatProps) {
  return (
    <div>
      <div>
        <h3>Room: {room}</h3>
        {messages.map((message, index) => (
          <p key={index}>{message.username}: {message.message}.</p>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input value={message} onChange={onChange} placeholder="Write a message" />
        <button>Send</button>
      </form>
    </div>
  )
}

export default Chat;