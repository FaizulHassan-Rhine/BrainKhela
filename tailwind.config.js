/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        secondary: '#4F46E5',
        accent: '#F59E0B',
        success: '#10B981',
        error: '#EF4444',
      },
      fontFamily: {
        bangla: ['var(--font-hind-siliguri)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
