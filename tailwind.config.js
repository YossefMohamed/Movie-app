module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "rgba(0, 0, 0,0.95)",
        "primary-light": "#F2F2F2",
        "secondary-dark": "rgba(30,30,30)",
        "secondary-light": "#F2F2F2",
        "text-dark": "rgb(255 255 255 / 0.8)",
        "text-light": "rgb(0 0 0 / 0.8)",
        "button-primary": "rgb(7, 25, 46)",
        "button-secondary": "rgb(255 255 255 / 0.8)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
