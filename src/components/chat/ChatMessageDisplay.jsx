import React from 'react'
import ChatMessage from './ChatMessage'
const ChatMessageDisplay = ({messages,currentUser,activeUserId,users}) => {
  if(activeUserId && users.length>0){
    messages = users.find(user => user.id == activeUserId).messages
  }
  return (
    <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
        <ChatMessage
            key={message.id}
            message={message}
            isOwn={message.senderId === currentUser.id}
        />
        ))}
    </div>
  )
}

export default ChatMessageDisplay
