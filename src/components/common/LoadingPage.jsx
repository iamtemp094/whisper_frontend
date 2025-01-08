import { motion } from 'framer-motion';

export default function LoadingPage({ message = "Logging out..." }) {
  return (
    <div className="fixed inset-0 bg-cyber-dark flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 mb-4 mx-auto border-4 border-t-neon-primary border-r-neon-secondary border-b-neon-primary border-l-neon-secondary rounded-full animate-spin"
        />
        <motion.p
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-neon-primary text-lg font-medium"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}