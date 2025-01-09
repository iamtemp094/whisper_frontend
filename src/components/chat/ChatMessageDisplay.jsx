import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { groupAndSortMessages } from '../../utils/messageUtils';

const ChatMessageDisplay = ({ messages, currentUser, activeUserId, users }) => {
  const containerRef = useRef(null); // Create a ref for the container

  let displayMessages = [];
  if (activeUserId && users.length > 0) {
    const user = users.find((user) => user.id == activeUserId);
    displayMessages = user ? user.messages : [];
  }

  const groupedMessages = groupAndSortMessages(displayMessages);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [groupedMessages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 max-h-[75vh]"
    >
      {groupedMessages.map((group, index) => (
        <div key={index}>
          <div className="text-center text-gray-500 text-sm my-2">
            {group.date.toLocaleDateString()}
          </div>
          {group.messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwn={message.senderId === currentUser.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChatMessageDisplay;
