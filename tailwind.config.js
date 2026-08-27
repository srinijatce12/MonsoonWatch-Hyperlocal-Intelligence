/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbf0f9',
          100: '#f5d9ec',
          200: '#e9a8d0',
          300: '#d770b1',
          400: '#a83f86',
          500: '#7a245f',
          600: '#5e1a4d',
          700: '#450C3F',
          800: '#3a0a35',
          900: '#2c0829',
        },
        leaf: {
          50: '#F5FBDA',
          100: '#eef8c8',
          200: '#D9EFBD',
          300: '#c5e89e',
          400: '#B9D175',
          500: '#a3bd56',
          600: '#82a23f',
          700: '#647e31',
          800: '#4a5e24',
          900: '#324019',
        },
        cream: '#F5FBDA',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 3px rgba(69, 12, 63, 0.06), 0 4px 16px rgba(69, 12, 63, 0.04)',
        card: '0 1px 2px rgba(69, 12, 63, 0.05), 0 8px 24px rgba(69, 12, 63, 0.05)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        scaleIn: 'scaleIn 0.25s ease-out',
        pulseSoft: 'pulseSoft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
