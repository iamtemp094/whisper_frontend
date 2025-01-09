import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatInput({ onSendMessage,activeUserId,users }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        onSendMessage(message,activeUserId,users);
      } catch (error) {
        console.log(error);
      }

      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-800 p-4">
      <div className="flex gap-2">
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-cyber-darker border border-neon-primary/20 rounded-lg px-4 py-2 focus:outline-none focus:border-neon-primary/50 focus:shadow-[0_0_10px_rgba(0,255,255,0.2)] transition-all"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-gradient-to-r from-neon-primary to-neon-secondary text-black font-semibold px-6 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all"
        >
          Send
        </motion.button>
      </div>
    </form>
  );
}