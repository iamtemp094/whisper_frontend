import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

import {useDispatch,useSelector} from 'react-redux'
import {setAuthData,removeAuthData} from '../store/slices/auth/authSlice'
import { verify_token } from '../utils/auth';


export default  function Landing() {
  const dispatch = useDispatch()
  const authData = useSelector(state => state.auth)
  // verify_token().then(data=>{
  //   console.log(data)


  // })

  return (
    <div className="min-h-screen bg-cyber-dark text-white relative overflow-hidden">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-neon-primary to-neon-secondary bg-clip-text text-transparent">
            Welcome to Whisper
          </h1>
          <p className="text-xl mb-12 text-gray-300">
            Secure, encrypted messaging for the digital age
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 my-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-lg bg-cyber-darker border border-neon-primary/20 hover:border-neon-primary/60 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-neon-primary">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-neon-primary to-neon-secondary rounded-full text-black font-bold hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "End-to-End Encryption",
    description: "Your messages are secured with military-grade encryption, ensuring complete privacy and security."
  },
  {
    title: "Lightning Fast",
    description: "Experience instant message delivery with our optimized infrastructure and minimal latency."
  },
  {
    title: "Cross-Platform",
    description: "Stay connected across all your devices with seamless synchronization and real-time updates."
  }
];