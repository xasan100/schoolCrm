/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./node_modules/flowbite/**/*.js"],

  theme: {
    extend: {
      rotateY: {
        0: "0deg",
        180: "180deg",
      },
      colors: {
        primary: "#445C96",
      },
      width: {
        76: "306px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
