/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        header_color: '#a39e9e36',
        white: '#ffffff',
        black: '#000000'
      },
      gridTemplateColumns: {
        '1fr-7fr': '1fr 7fr',
      },
      keyframes: {
        moveParagraph1: {
          '0%': { left: '-40%' },
          '100%': { left: '30%' },
        },
        moveParagraph2: {
          '0%': { left: '-30%' },
          '100%': { left: '50%' },
        },
      },
      animation: {
        moveParagraph1: 'moveParagraph1 10s linear infinite',
        moveParagraph2: 'moveParagraph2 10s linear infinite',
      },
    },
    
  },
  plugins: [],
}
