export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon': {
          primary: '#0ff',
          secondary: '#f0f',
          accent: '#ff0',
          error: '#f00',
          success: '#0f0',
        },
        'cyber': {
          dark: '#0a0a0f',
          darker: '#151520',
          darkest: '#1a1a25',
        }
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}