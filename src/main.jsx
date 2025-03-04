import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { IconProvider } from './contexts/IconContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <IconProvider>
        <App />
      </IconProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
