/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        secondary: '#7e22ce',
        dark: '#0f172a',
        light: '#f8fafc'
      }
    },
  },
  plugins: [],
}