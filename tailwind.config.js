module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "white-soft": "#FAFAFA",
      },
      fontFamily: {
        cool: ["TTCommons", "sans-serif"],
      },
      screens: {
        phone: "400px",
        laptop: "1028px",
      },
    },
  },
  variants: {
    scrollbar: ["rounded"],
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
