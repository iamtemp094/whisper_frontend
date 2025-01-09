import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthData, setAuthData } from '../store/slices/auth/authSlice';
import { logout } from '../utils/auth';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth);
  const isLoggedIn = authData.user_id!==null;
  
  const handleLogout = () => {
    const token = authData.token;
    logout(token)
    dispatch(setAuthData({
        user_id: null,
        user_name: null,
        token: null,
    }));
    localStorage.removeItem('token')
    navigate('/');
  };
  const navItems = isLoggedIn 
    ? [
        { name: 'Home', path: '/' },
        { name: 'Chat', path: '/chat' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Login', path: '/login' },
        { name: 'Sign Up', path: '/signup' },
      ];
  
  return (
    <nav className="bg-cyber-darker border-b border-neon-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-neon-primary to-neon-secondary bg-clip-text text-transparent">
            Whisper
          </Link>
          
          <div className="flex space-x-4 items-center">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                className="relative group"
                onClick={() => navigate(item.path)}
              >
                <motion.span
                  className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer
                    ${window.location.pathname === item.path 
                      ? 'text-neon-primary' 
                      : 'text-gray-300 hover:text-neon-primary'
                    }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.name}
                </motion.span>
                {window.location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-primary"
                    initial={false}
                  />
                )}
              </motion.div>
            ))}
            {isLoggedIn && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-neon-primary"
              >
                Logout
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}