/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        exo: ['Exo2-VariableFont_wght', 'sans'],
        rob: ['RobotoMono-Light', 'sans'],
        robfat: ['RobotoMono-VariableFont_wght'],
        foxus: ['FOXUS', 'sans']
      }
    }
  },
  plugins: []
}
