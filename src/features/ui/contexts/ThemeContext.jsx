import { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../../../utils/storageUtils';

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  // Get theme from localStorage or system preference
  const getInitialTheme = () => {
    // If we're in the browser and localStorage is available
    if (typeof window !== 'undefined') {
      const storedTheme = loadFromStorage('theme', null);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Return stored theme if available, otherwise use system preference
      return storedTheme === 'dark' || (storedTheme !== 'light' && prefersDark);
    }

    // Default to light theme as fallback
    return false;
  };

  const [isDark, setIsDark] = useState(getInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsTransitioning(true);
    setIsDark(prev => !prev);
  };

  // Apply theme changes to DOM and localStorage
  useEffect(() => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add('dark-theme');
      html.setAttribute('data-theme', 'dark');
      document.documentElement.style.backgroundColor = '#353747'; // Slightly lighter than widget background
    } else {
      html.classList.remove('dark-theme');
      html.setAttribute('data-theme', 'light');
      document.documentElement.style.backgroundColor = '#f3f4f6'; // Light gray background
    }

    // Save to localStorage
    saveToStorage('theme', isDark ? 'dark' : 'light');

    // Disable transition during theme change
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 200); // Match with CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [isDark, isTransitioning]);

  // Add/remove transition disabling class
  useEffect(() => {
    const html = document.documentElement;
    if (isTransitioning) {
      html.classList.add('no-transition');
    } else {
      html.classList.remove('no-transition');
    }
  }, [isTransitioning]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}