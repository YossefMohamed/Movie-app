module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "rgb(7, 25, 82)",
        "primary-light": "#F2F2F2",
        "secondary-dark": "#11235c",
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
