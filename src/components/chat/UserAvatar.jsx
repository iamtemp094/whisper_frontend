import { motion } from 'framer-motion';

export default function UserAvatar({ name, online, size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`${sizes[size]} rounded-full bg-gradient-to-r from-neon-primary to-neon-secondary 
        flex items-center justify-center text-black font-bold relative`}
    >
      {name[0].toUpperCase()}
      {online !== undefined && (
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full 
          ${online ? 'bg-neon-success' : 'bg-gray-500'} 
          border-2 border-cyber-dark`}
        />
      )}
    </motion.div>
  );
}