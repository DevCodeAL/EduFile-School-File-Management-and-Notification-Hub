import flowbite from 'flowbite/plugin';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // Add Flowbite's path
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite, 
  ],
}

