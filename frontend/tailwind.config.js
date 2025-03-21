/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        scrollBehavior: ['smooth'],
        NewAmsterdam:  ["New Amsterdam", "sans-serif"],
        Exo:  ["Exo", "sans-serif"],


      }
    },
  },
  plugins: [],
}

