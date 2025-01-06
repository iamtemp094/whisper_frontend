import { motion } from 'framer-motion';
import UserListItem from './UserListItem';
import UserAvatar from './UserAvatar';

export default function Sidebar({ currentUser, users, activeUserId, onUserSelect }) {
  return (
    <div className="w-80 border-r border-gray-800 flex flex-col">
      {/* Current User Profile */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <UserAvatar name={currentUser.name} size="lg" />
          <div>
            <h2 className="font-semibold text-neon-primary">{currentUser.name}</h2>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-neon-success"
            >
              Online
            </motion.span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-800">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full bg-cyber-darker border border-gray-700 rounded-lg px-4 py-2 
            focus:outline-none focus:border-neon-primary/50 focus:shadow-[0_0_10px_rgba(0,255,255,0.2)]"
        />
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto p-2">
        {users.map(user => (
          <UserListItem
            key={user.id}
            user={user}
            isActive={user.id === activeUserId}
            onClick={onUserSelect}
          />
        ))}
      </div>
    </div>
  );
}