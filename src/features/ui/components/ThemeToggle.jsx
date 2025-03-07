import React from 'react';
import { useThemeUtils } from '../hooks/useThemeUtils';
import { useIconLibrary } from '../contexts/IconContext';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeUtils();
  const { icons } = useIconLibrary();

  // Get icons from library
  const MoonIcon = icons.moon;
  const SunIcon = icons.sun;

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 focus:outline-none"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6" />
      )}
    </button>
  );
}

export default ThemeToggle;