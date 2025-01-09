import React from 'react';
    import ChatMessage from './ChatMessage';
    import { groupAndSortMessages } from '../../utils/messageUtils';

    const ChatMessageDisplay = ({ messages, currentUser, activeUserId, users }) => {
      let displayMessages = [];
      if (activeUserId && users.length > 0) {
        const user = users.find(user => user.id == activeUserId);
        displayMessages = user ? user.messages : [];
      }

      const groupedMessages = groupAndSortMessages(displayMessages);

      return (
        <div className="flex-1 overflow-y-auto p-4">
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
