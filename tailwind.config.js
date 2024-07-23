/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#323b6d",
        lightblue: "#3745c0",
        darkblue: "#002D3A",
        blueish: "#0096C1",
        lightgray: "#5F5F5F",
      },
      keyframes: {
        slide_right: {
          "0%": {
            opacity: "20",
            transform: "translateX(20rem)",
          },
          "50%": {
            opacity: "50",
            transform: "translateX(0)",
          },
          "100%": {
            opacity: "100",
            transform: "translateX(0)",
          },
        },
        slide_left: {
          "0%": {
            opacity: "0",
            transform: "translateX(-20rem)",
          },
          "50%": {
            opacity: "50",
            transform: "translateX(0)",
          },
          "100%": {
            opacity: "100",
            transform: "translateX(0)",
          },
        },
        slide_up: {
          "0%": {
            opacity: "0",
            transform: "translateY(2rem)",
          },
          "50%": {
            opacity: "50",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "100",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slide_up: "slide_up .7s ease-out",
        slide_right: "slide_right .8s ease-out",
      },
    },
  },
  plugins: [],
};
