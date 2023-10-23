/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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

        // OG COLOR

        // darkestBaseGray: '#010508',
        // darkBaseGray: '#0D1117',
        // baseGray: '#161B22',
        // lightestGray: '#41474F',
        // baseWhite: '#E5E4E6',
        // darkBaseWhite: '#F2F4F7',
        // darkestBaseWhite: '#E5E4E6',
        // secondary: '#D926A9'

        // NEW NEW

        darkestBaseGray: '#010508',
        darkBaseGray: '#0D1117',
        baseGray: '#161B22',
        lightestGray: '#41474F',
        customCyan: '#1FB2A6',
        customPurple: '#6419E6',
        customPink: '#D926A9',
        customBlue: '#204881',

        baseWhite: `#EDEDEC`,
        darkBaseWhite: `#EDEDEC`,
        darkestBaseWhite: '#D1CBCE',
        lightModeGray: '#4F4E53'
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
      transitionTimingFunction: {
        'activeSplideCurve': 'cubic-bezier(0.17, 0.67, 0.06, 0.96)'
      }
    },
  },
  plugins: [require("daisyui")],
};
