/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mainOrange: "#FBBD08",
        mainGray: "#313031",
        mainDarkGray: "#181818",
        darkestBlack: "#121212"
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideOutLeft: {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(-100%)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
