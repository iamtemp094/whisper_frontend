import { motion } from 'framer-motion';

export default function ChatMessage({ message, isOwn }) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isOwn
            ? 'bg-gradient-to-r from-neon-primary/20 to-neon-secondary/20 border border-neon-primary/30'
            : 'bg-cyber-darker border border-gray-700'
        }`}
      >
        <p className="text-sm text-gray-300">{message.text}</p>
        <span className="text-xs text-gray-500 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </motion.div>
  );
}