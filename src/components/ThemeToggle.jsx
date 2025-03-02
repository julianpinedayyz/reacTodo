import { useTheme } from '../contexts/ThemeContext';
import MoonIcon from '../icons/MoonIcon';
import SunIcon from '../icons/SunIcon';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
        isDark
          ? 'bg-dracula-currentLine text-dracula-yellow hover:bg-dracula-selection'
          : 'bg-light-currentLine text-light-purple hover:bg-light-selection'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDark ? 'focus:ring-dracula-purple' : 'focus:ring-light-purple'
      }`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
