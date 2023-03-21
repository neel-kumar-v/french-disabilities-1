/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html'
  ],
  theme: {
    colors: {
      'cambridge': '#9CC5A1',
      'jungle': '#49A078',
      'current': '#216869',
      'platinum': '#DCE1DE'
    },
    extend: {},
  },
  plugins: [require('daisyui')],
}
