/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./node_modules/flowbite/**/*.js"],

  theme: {
    screens: {
      sx: { max: "576px" },
      sm: "576px",
      md: "960px",
      lg: "1440px",
    },
    extend: {
      rotateY: {
        0: "0deg",
        180: "180deg",
      },
      colors: {
        primary: "#445C96",
        "custom-green": "#62B238",
      },
      width: {
        76: "306px",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hide": {
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
