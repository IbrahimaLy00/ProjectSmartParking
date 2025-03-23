/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'parking-green': '#10B981',
        'parking-red': '#EF4444',
        'parking-yellow': '#F59E0B',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 