/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl': '0 5px 10px 0 rgba(0, 0, 0, 0.2)',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#09090b',
      'white': '#fafafa',
      'gray': '#52525b',
      'green': '#166534',
      'purple': '#6b21a8',
      'yellow': '#eab308',
      'pink': '#f472b6',
      'cinzaBlack': '#333333',
      'cinzaWhite': '#3B3B3B',
      'vermelhoSanguino': '#AD5E5E',
      'amareloOcre': '#E2C09B',
      'amareloPalido': '#FAEFEC',
    },
  },
  plugins: [],
}

