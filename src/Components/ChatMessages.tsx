import { MessageProps } from "./ChatApp"

interface ChatMessagesProps {
  username: string;
  messages: MessageProps[];
}

function ChatMessages({ messages, username }: ChatMessagesProps) {

  return (
    <div>
      <h3>Chat</h3>
      {messages.map((message, index) => {
        if (message.type === 'message') {
          return <p key={index}>{message.username}: {message.message}</p>
        }

        if ((message.type === 'join' || message.type === 'leave') && message.username !== username) {
          return <p key={index}>{message.message}</p>
        }

        return null;
        
      })}
    </div>
  )
}

export default ChatMessages