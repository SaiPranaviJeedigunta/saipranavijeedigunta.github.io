/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Gruvbox color palette
        gruvbox: {
          bg: '#3C3836',
          fg: '#ebdbb2',
          red: '#cc241d',
          green: '#98971a',
          yellow: '#689d6a',
          blue: '#3E9EBF',
          purple: '#b16286',
          aqua: '#689d6a',
          orange: '#d65d0e',
          gray: '#a89984',
          darkgray: '#928374',
          // Light mode variants
          light: {
            bg: '#E8EAEB',
            fg: '#3c3836',
            red: '#9d0006',
            green: '#79740e',
            yellow: '#b57614',
            blue: '#0F4C75',
            purple: '#8f3f71',
            aqua: '#427b58',
            orange: '#af3a03',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};