/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dracula Theme (Dark)
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
        },
        // Light Theme
        'light': {
          'background': '#ffffff',
          'currentLine': '#f1f5f9',
          'selection': '#e2e8f0',
          'foreground': '#334155',
          'comment': '#94a3b8',
          'cyan': '#06b6d4',
          'green': '#10b981',
          'orange': '#f97316',
          'pink': '#ec4899',
          'purple': '#8b5cf6',
          'red': '#ef4444',
          'yellow': '#eab308'
        }
      }
    },
  },
  plugins: [],
}