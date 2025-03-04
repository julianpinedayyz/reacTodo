import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { IconProvider } from './contexts/IconContext'

// Wrapper to handle transition class
function AppWithTransitionHandling() {
  useEffect(() => {
    // Remove the no-transition class after the app has rendered
    document.body.classList.remove('no-transition');
  }, []);

  return (
    <React.StrictMode>
      <ThemeProvider>
        <IconProvider>
          <App />
        </IconProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

// Add no-transition class to prevent transitions during initial render
document.body.classList.add('no-transition');

ReactDOM.createRoot(document.getElementById('root')).render(<AppWithTransitionHandling />);
