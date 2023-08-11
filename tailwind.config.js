/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./node_modules/flowbite/**/*.js"],

  theme: {
    extend: {
      colors:{
        "primary-100": ""
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
