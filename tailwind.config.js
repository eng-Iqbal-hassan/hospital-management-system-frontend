/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",         // your main HTML file
    "./src/**/*.{js,jsx,ts,tsx}"  // all JS/TS/JSX/TSX files inside src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5f6fff",
      },
    },
  },
  plugins: [],
};
