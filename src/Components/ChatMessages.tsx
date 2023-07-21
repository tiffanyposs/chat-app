import { useRef, useEffect } from 'react';
import { MessageProps } from "./ChatApp"
import { colors } from "./constants";

interface ChatMessagesProps {
  username: string;
  messages: MessageProps[];
}

function ChatMessages({ messages, username }: ChatMessagesProps) {
  const scrollDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end', 
        inline: 'nearest' 
      })
    }
    
  })

  return (
    <div
      style={{ 
        flexGrow: '1', 
        height: '100%', 
        overflow: 'scroll', 
        marginBottom: '20px',
        padding: '20px',
        border: `1px solid ${colors.black}`,
        backgroundColor: colors.white
      }}
      >
      <div ref={scrollDiv} style={{ padding: '20px 0'}}>
        <p>Beginning of Chat</p>
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
    </div>
  )
}

export default ChatMessages