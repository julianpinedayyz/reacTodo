/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dracula': {
          'background': '#282a36',
          'currentLine': '#44475a',
          'selection': '#44475a',
          'foreground': '#f8f8f2',
          'comment': '#6272a4',
          'cyan': '#8be9fd',
          'green': '#50fa7b',
          'orange': '#ffb86c',
          'pink': '#ff79c6',
          'purple': '#bd93f9',
          'red': '#ff5555',
          'yellow': '#f1fa8c'
        }
      }
    },
  },
  plugins: [],
}