/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightOrange: '#FFEDD5', // Custom light orange color
      },
      animation: {
        'twinkle': 'twinkle 3s linear infinite',
      },
      keyframes: {
        twinkle: {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-100px) translateX(100px)' },
        }
      }
    },
  },
  plugins: [],
}

