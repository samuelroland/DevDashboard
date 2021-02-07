// tailwind.config.js

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      textColor: ["disabled"],
      borderWidth: ["hover", "focus"],
    },
  },
  plugins: [],
};
