// This file is deprecated in the new architecture
// Keeping compatibility layer for transition period

import React from 'react';
import { useThemeUtils } from '../features/ui/hooks/useThemeUtils';

// Create wrapper components that use the new hooks but expose the old API
const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const { isDarkMode, toggleTheme } = useThemeUtils();

  return (
    <ThemeContext.Provider value={{ isDark: isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Provide compatibility with existing components
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
