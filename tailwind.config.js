/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  variants: {
    extend: {
      backgroundColor: ['active'], // Enable active variant for background color
    }
  },
  theme: {
    extend: {},
  },
  plugins: [],
}