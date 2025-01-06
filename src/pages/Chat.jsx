import { useState } from 'react';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import Sidebar from '../components/chat/Sidebar';

// Dummy data
const currentUser = {
  id: '1',
  name: 'CyberUser',
};

const dummyUsers = [
  {
    id: '2',
    name: 'NeonRider',
    status: 'Ready for the future',
    online: true,
  },
  {
    id: '3',
    name: 'PixelPunk',
    status: 'Hacking the mainframe',
    online: true,
  },
  {
    id: '4',
    name: 'SynthWave',
    status: 'In the digital void',
    online: false,
  },
  {
    id: '5',
    name: 'ByteRunner',
    status: 'Exploring cyberspace',
    online: true,
  },
];

const initialMessages = [
  {
    id: 1,
    senderId: '2',
    text: 'Hey there! Welcome to CyberChat 🌐',
    timestamp: new Date(Date.now() - 360000).toISOString(),
  },
  {
    id: 2,
    senderId: '1',
    text: 'Thanks! Love the neon aesthetic here ✨',
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 3,
    senderId: '2',
    text: 'The future of communication is here. How are you finding it so far?',
    timestamp: new Date(Date.now() - 240000).toISOString(),
  },
  {
    id: 4,
    senderId: '1',
    text: 'It\'s amazing! The UI is so smooth and responsive.',
    timestamp: new Date(Date.now() - 180000).toISOString(),
  },
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [activeUserId, setActiveUserId] = useState('2');

  const handleSendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  const activeUser = dummyUsers.find(user => user.id === activeUserId);

  return (
    <div className="min-h-screen bg-cyber-dark flex">
      <Sidebar
        currentUser={currentUser}
        users={dummyUsers}
        activeUserId={activeUserId}
        onUserSelect={(user) => setActiveUserId(user.id)}
      />
      
      <div className="flex-1 flex flex-col">
        <ChatHeader user={activeUser} />
        
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwn={message.senderId === currentUser.id}
            />
          ))}
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}