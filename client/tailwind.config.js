/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      colors: {
        brand: {
          pink: "#FFD1DC",
          peach: "#FFDAB9",
          cream: "#FFFDD0",
          yellow: "#FDFD96",
          dark: "#4A4A4A",
        },
      },
    },
  },
  plugins: [],
};
