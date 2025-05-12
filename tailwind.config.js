/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/react");
const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#570091",
          dark: "#7E3AF2",
          hoverdark: "#6a30ce",
          hover: "#4a196b",
          light: "#C8E6C9",
        },
        secondary: "#FF5722",
      },
      fontFamily: {
        heading2: ['Montserrat', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [heroui(), flowbiteReact],
}