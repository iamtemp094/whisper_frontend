import { motion } from 'framer-motion';

export default function Input({
  type = 'text',
  label,
  name,
  value,
  onChange,
  error,
  ...props
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-300 mb-2" htmlFor={name}>
        {label}
      </label>
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 bg-cyber-darker border rounded-lg focus:outline-none transition-colors duration-300
          ${error 
            ? 'border-neon-error shadow-[0_0_10px_rgba(255,0,0,0.3)]' 
            : 'border-neon-primary/30 focus:border-neon-primary shadow-[0_0_10px_rgba(0,255,255,0.1)] focus:shadow-[0_0_15px_rgba(0,255,255,0.2)]'
          }`}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-neon-error text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}