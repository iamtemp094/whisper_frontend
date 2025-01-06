import { motion } from 'framer-motion';
import UserAvatar from './UserAvatar';

export default function UserListItem({ user, isActive, onClick }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      onClick={() => onClick(user)}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer
        ${isActive 
          ? 'bg-gradient-to-r from-neon-primary/20 to-neon-secondary/20 border border-neon-primary/30' 
          : 'hover:bg-cyber-darker'
        }`}
    >
      <UserAvatar name={user.name} online={user.online} size="sm" />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-200 truncate">{user.name}</h3>
        <p className="text-xs text-gray-400 truncate">{user.status}</p>
      </div>
    </motion.div>
  );
}