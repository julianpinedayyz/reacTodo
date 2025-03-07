import { useState, useEffect, useCallback } from 'react';
import {
  saveThemePreference,
  loadThemePreference,
  isDarkTheme,
  DARK_THEME
} from '../utils/themeUtils';

export function useThemeUtils() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return isDarkTheme(loadThemePreference());
  });

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      saveThemePreference(!prev);
      return !prev;
    });
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);

    // Also add a data-theme attribute for additional styling hooks
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');

    // Update body background color directly to ensure the entire page changes
    document.body.style.backgroundColor = isDarkMode ? '#282a36' : '#f8f8f2';
  }, [isDarkMode]);

  // Helper for theme-conditional classes
  const themeClass = useCallback(
    (darkClass, lightClass) => (isDarkMode ? darkClass : lightClass),
    [isDarkMode]
  );

  return {
    isDarkMode,
    toggleTheme,
    themeClass
  };
}