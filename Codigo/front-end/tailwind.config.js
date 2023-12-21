/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
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

