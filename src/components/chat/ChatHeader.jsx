import { motion } from 'framer-motion';

export default function ChatHeader({ users,activeUserId }) {
  if(users.length===0 || activeUserId=== undefined){
      return <div>No chat slected</div>
  }
  const user = users.find(user => user.id == activeUserId);
  return (
    <div className="border-b border-gray-800 p-4">
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-primary to-neon-secondary flex items-center justify-center text-black font-bold"
        >
          {user.name[0].toUpperCase()}
        </motion.div>
        <div>
          <h2 className="font-semibold text-neon-primary">{user.name}</h2>
          <span className="text-xs text-gray-400">
            {user.online ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </div>
  );
}