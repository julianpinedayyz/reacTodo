import { useThemeUtils } from './ui/hooks/useThemeUtils';
import { useIconLibrary } from './ui/contexts/IconContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeUtils();
  const { icons } = useIconLibrary();

  // Get icons from the icon library
  const MoonIcon = icons.moon;
  const SunIcon = icons.sun;

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;