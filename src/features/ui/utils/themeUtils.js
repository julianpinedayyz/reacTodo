import { isStorageAvailable } from '../../todos/utils/storageUtils';

// Theme constants
export const THEME_STORAGE_KEY = 'theme_preference';
export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

// Save theme preference to storage - direct string storage, no JSON
export function saveThemePreference(isDark) {
  if (!isStorageAvailable()) return false;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? DARK_THEME : LIGHT_THEME);
    return true;
  } catch (e) {
    console.error('Error saving theme preference:', e);
    return false;
  }
}

// Load theme preference from storage - direct string retrieval, no JSON parsing
export function loadThemePreference() {
  if (!isStorageAvailable()) {
    return getSystemPreference();
  }

  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    // If no saved preference, use system preference
    return savedTheme || getSystemPreference();
  } catch (e) {
    console.error('Error loading theme preference:', e);
    return getSystemPreference();
  }
}

// Helper to get system color scheme preference
function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? DARK_THEME
    : LIGHT_THEME;
}

// Check if current theme is dark
export function isDarkTheme(theme) {
  return theme === DARK_THEME;
}
