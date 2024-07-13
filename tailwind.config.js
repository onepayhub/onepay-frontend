/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#323b6d',
        lightblue: '#3745c0',
        darkblue: '#002D3A',
        blueish: '#0096C1',
        lightgray: '#5F5F5F'
      },
    },
  },
  plugins: [],
}

