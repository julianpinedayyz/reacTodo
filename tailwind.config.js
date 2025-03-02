/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dracula Theme (Dark)
        dracula: {
          background: '#282A36',
          currentLine: '#44475A',
          foreground: '#F8F8F2',
          comment: '#6272A4',
          cyan: '#8BE9FD',
          green: '#50FA7B',
          orange: '#FFB86C',
          pink: '#FF79C6',
          purple: '#BD93F9',
          red: '#FF5555',
          yellow: '#F1FA8C'
        },
        // Ghostty Theme (Light)
        ghostty: {
          background: '#FFFFFF',
          foreground: '#11111B',
          comment: '#7F849C',
          cyan: '#209FB5',
          green: '#40A02B',
          orange: '#FE640B',
          pink: '#EA76CB',
          purple: '#8839EF',
          red: '#D20F39',
          yellow: '#DF8E1D'
        }
      }
    },
  },
  plugins: [],
}