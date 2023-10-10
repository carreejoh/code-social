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

        // BLUE TINT Dark Mode

        darkestBaseGray: '#010508',
        darkBaseGray: '#0D1117',
        baseGray: '#161B22',
        lightestGray: '#31373D',
        darkBaseWhite: '#EBEFF4',
        baseWhite: '#FEFFFE'

        // BLUE TINT White Mode (Crusaders color scheme)

        // darkestBaseGray: '#AABACE',
        // darkBaseGray: '#EAEFF5',
        // baseGray: '#FEFFFE'

        // BROWN TINT Dark Mode

        // darkestBaseGray: '#050404',
        // darkBaseGray: '#1A1B1B',
        // // baseGray: '#1F1F1E',
        // baseGray: '#4C4D4D',
        // darkBaseWhite: '#EBEFF4',
        // baseWhite: '#FEFFFE'
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
