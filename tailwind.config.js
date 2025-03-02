/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Gruvbox color palette
        gruvbox: {
          bg: '#282828',
          fg: '#ebdbb2',
          red: '#cc241d',
          green: '#98971a',
          yellow: '#d79921',
          blue: '#458588',
          purple: '#b16286',
          aqua: '#689d6a',
          orange: '#d65d0e',
          gray: '#a89984',
          darkgray: '#928374',
          // Light mode variants
          light: {
            bg: '#fbf1c7',
            fg: '#3c3836',
            red: '#9d0006',
            green: '#79740e',
            yellow: '#b57614',
            blue: '#076678',
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