/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "dark-purple": "#081a51",
      "dark-blue": "#007ea7",
      "light-blue": "#00a8e8",
      "light-green": "#4c9f70",
      "light-red": "#ee6352",
      'light-white': 'rgba(255,255,255,0.18)',
      "primary-blue": "#165ea8",
      container: "#d4e3ff",
      warning: "#ffbc27",
      danger: "#db2943",
      succes: "#33a64b",
      amber: colors.amber,
      white: colors.white,
      blue: colors.blue,
      green: colors.green,
      yellow: colors.yellow,
      gray: colors.gray,
      red: colors.red,
      black: "#000000",
      transparent: "transparent",

    },
    fontFamily : {
      'lobster' : ['lobster', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
      'inter': ['"Inter"', 'sans-serif'],
    },
    extend: {
    },
  },
  plugins: [],
};