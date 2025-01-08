import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../components/forms/Input';

import { useNavigate } from 'react-router-dom';

import {useDispatch,useSelector} from 'react-redux'
import {setAuthData,removeAuthData} from '../store/slices/auth/authSlice'


import { signup } from '../utils/auth';

export default function Signup() {
  const dispatch = useDispatch()
  const authData = useSelector(state => state.auth)

  const navigate = useNavigate()

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.username) newErrors.username = 'Username is required';
    } else if (currentStep === 2) {
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      const data = await signup(formData.email, formData.username, formData.password);
      if(!data.id){
        console.log("wrong email or password")
        setIsLoading(false);
        setErrors(data);
        return;
      }
      dispatch(
        setAuthData({
              user_id: data.user_id,
              user_name: data.user_name,
              token: data.token,
        }))
      setIsLoading(false);
      navigate('/chat')
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
          Create Account
        </h2>

        <div className="mb-8 flex justify-center gap-2">
          {[1, 2].map((s) => (
            <motion.div
              key={s}
              className={`h-2 w-16 rounded-full ${
                s <= step ? 'bg-neon-primary' : 'bg-gray-700'
              }`}
              animate={{
                backgroundColor: s <= step ? '#0ff' : '#374151'
              }}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleNext}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-primary to-neon-secondary text-black font-bold mt-6 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
              >
                Next
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              {formData.password && (
                <div className="mb-4">
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-1 flex-1 rounded-full"
                        animate={{
                          backgroundColor: i < passwordStrength ? getStrengthColor(passwordStrength) : '#374151'
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Password strength: {getStrengthText(passwordStrength)}
                  </p>
                </div>
              )}

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />

              <div className="mb-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="form-checkbox text-neon-primary focus:ring-neon-primary h-4 w-4 rounded border-gray-600 bg-cyber-dark"
                  />
                  <span className="text-sm text-gray-300">
                    I accept the{' '}
                    <a href="#" className="text-neon-primary hover:text-neon-secondary">
                      terms and conditions
                    </a>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-neon-error text-sm mt-1">{errors.acceptTerms}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-primary to-neon-secondary text-black font-bold mt-6 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
              >
                Create Account
              </motion.button>
            </motion.div>
          )}
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-neon-primary hover:text-neon-secondary transition-colors">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

function getStrengthColor(strength) {
  switch (strength) {
    case 1: return '#f00';
    case 2: return '#ff0';
    case 3: return '#0ff';
    case 4: return '#0f0';
    default: return '#374151';
  }
}

function getStrengthText(strength) {
  switch (strength) {
    case 1: return 'Weak';
    case 2: return 'Fair';
    case 3: return 'Good';
    case 4: return 'Strong';
    default: return 'Very Weak';
  }
}