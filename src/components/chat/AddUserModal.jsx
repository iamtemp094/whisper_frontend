import { useState } from 'react';
    import { motion } from 'framer-motion';

    export default function AddUserModal({ onClose }) {
      const [searchQuery, setSearchQuery] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [loading, setLoading] = useState(false);

      const handleSearch = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          const results = [
            { id: 1, name: 'User 1' },
            { id: 2, name: 'User 2' },
            { id: 3, name: 'User 3' },
          ].filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
          setSearchResults(results);
          setLoading(false);
        }, 500);
      };

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-cyber-darker p-6 rounded-lg border border-neon-primary/20 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-neon-primary">Add New User</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200"
              >
                X
              </motion.button>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-cyber-darker border border-gray-700 rounded-lg px-4 py-2 
                  focus:outline-none focus:border-neon-primary/50 focus:shadow-[0_0_10px_rgba(0,255,255,0.2)]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-neon-primary to-neon-secondary text-black font-semibold px-4 py-2 rounded-lg hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all"
              >
                {loading ? 'Searching...' : 'Search'}
              </motion.button>
            </div>

            {searchResults.length > 0 ? (
              <ul className="max-h-48 overflow-y-auto">
                {searchResults.map(user => (
                  <li key={user.id} className="p-2 hover:bg-cyber-dark border-b border-gray-700 last:border-b-0 cursor-pointer">
                    {user.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">
                {searchQuery && !loading ? 'No users found.' : 'Start typing to search for users.'}
              </p>
            )}
          </motion.div>
        </motion.div>
      );
    }
