import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // Initialize theme from localStorage, default to dark if preferred by system
  const [isDark, setIsDark] = useState(() => {
    // Don't run localStorage check on initial render to avoid hydration mismatch
    if (typeof window === 'undefined') return false;

    // Check localStorage first
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') return true;
    if (storedTheme === 'light') return false;

    // If not set, use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme to document when it changes
  useEffect(() => {
    const darkBackground = '#353747'; // Slightly lighter than widget background
    const lightBackground = '#f3f4f6'; // Light gray background

    if (isDark) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.style.backgroundColor = darkBackground;
      document.documentElement.style.backgroundColor = darkBackground;
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.style.backgroundColor = lightBackground;
      document.documentElement.style.backgroundColor = lightBackground;
    }

    // Store the selection in localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      // Only change theme if user hasn't explicitly selected one
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };

    // Add listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Older browsers support
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, themeClass: (darkClass, lightClass) => isDark ? darkClass : lightClass }}>
      {children}
    </ThemeContext.Provider>
  );
}
