/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#161615',
          'dark-gray': '#2d2d2c',
          cream: '#f1efe7',
          'medium-gray': '#706f6b',
        },
      },
    },
  },
  plugins: [],
};
