import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../components/forms/Input';
import {login} from '../utils/auth';

import { useNavigate } from 'react-router-dom';


import {useDispatch,useSelector} from 'react-redux'
import {setAuthData,removeAuthData} from '../store/slices/auth/authSlice'



export default function Login() {
  const dispatch = useDispatch()
  const authData = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      const data = await login(formData.email, formData.password);
      if(data=="missing user"){
        console.log("wrong email or password")
      }
      dispatch(
        setAuthData({
              user_id: data.user_id,
              user_name: data.user_name,
              token: data.token,
              isLoggedIn: true,
        }))
      setIsLoading(false);
      try{
        navigate('/chat')
      }
      catch(error){
        console.log(error);
      }

    } else {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-lg bg-cyber-darker border border-neon-primary/20"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-neon-primary to-neon-secondary bg-clip-text text-transparent">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg bg-gradient-to-r from-neon-primary to-neon-secondary text-black font-bold mt-6
              ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]'}
              transition-all duration-300`}
          >
            {isLoading ? (
              <span className="inline-block animate-pulse">Loading...</span>
            ) : (
              'Login'
            )}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-neon-primary hover:text-neon-secondary transition-colors">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}