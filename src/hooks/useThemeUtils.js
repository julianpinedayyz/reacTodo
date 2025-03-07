import { useTheme } from '../contexts/ThemeContext';

/**
 * Custom hook that provides theme utility functions
 * @returns {Object} Theme utility functions
 */
export function useThemeUtils() {
  const { isDark } = useTheme();

  /**
   * Returns the appropriate class based on the current theme
   * @param {string} darkClass - Class to apply in dark mode
   * @param {string} lightClass - Class to apply in light mode
   * @returns {string} The appropriate class for the current theme
   */
  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  return {
    isDark,
    themeClass
  };
}