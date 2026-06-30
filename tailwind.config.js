/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: '#FDFCF9',
          DEFAULT: '#F3F2EE',
          dark: '#EBE7DD',
        },
        primary: {
          DEFAULT: '#5a5349',
          dark: '#433e38',
          light: '#EBE7DD',
          foreground: '#FDFCF9',
        },
        secondary: '#F3F2EE',
        accent: '#EBE7DD',
        surface: '#FDFCF9',
        success: '#5a5349',
        error: '#B85C5C',
        muted: {
          DEFAULT: '#EBE7DD',
          foreground: '#6b6560',
        },
      },
      fontFamily: {
        bangla: ['var(--font-hind-siliguri)', 'sans-serif'],
        'bn-digits': ['var(--font-noto-bengali)', 'var(--font-hind-siliguri)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(90, 83, 73, 0.1)',
        card: '0 2px 12px -2px rgba(90, 83, 73, 0.08)',
      },
    },
  },
  plugins: [],
};
