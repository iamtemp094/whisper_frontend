import { motion } from 'framer-motion';
    import UserListItem from './UserListItem';
    import UserAvatar from './UserAvatar';
    import { useState } from 'react';
    import AddUserModal from './AddUserModal';

    export default function Sidebar({ currentUser, users, activeUserId, onUserSelect }) {
      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleOpenModal = () => {
        setIsModalOpen(true);
      };

      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

      return (
        <div className="w-80 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <UserAvatar name={currentUser.name} size="lg" />
              <div>
                <h2 className="font-semibold text-neon-primary">Chats</h2>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleOpenModal}
              className="bg-gradient-to-r from-neon-primary to-neon-secondary text-black font-semibold px-3 py-1 rounded-lg hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all"
            >
              +
            </motion.button>
          </div>

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
          {isModalOpen && <AddUserModal onClose={handleCloseModal} />}
        </div>
      );
    }
