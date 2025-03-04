import { useIconLibrary } from '../contexts/IconContext';
import { useTheme } from '../contexts/ThemeContext';
import { MarkGithubIcon } from '@primer/octicons-react';
import { FaReact } from 'react-icons/fa';

const IconToggle = () => {
  const { useOcticons, toggleIconLibrary } = useIconLibrary();
  const { isDark } = useTheme();

  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  return (
    <button
      onClick={toggleIconLibrary}
      className={`fixed bottom-4 right-4 p-2 rounded-full shadow-lg ${
        themeClass(
          'bg-dracula-selection text-dracula-foreground hover:bg-dracula-currentLine',
          'bg-light-selection text-light-foreground hover:bg-light-currentLine'
        )
      }`}
      aria-label={useOcticons ? 'Switch to React Icons' : 'Switch to Octicons'}
      title={useOcticons ? 'Using Octicons - Click to switch to React Icons' : 'Using React Icons - Click to switch to Octicons'}
    >
      {useOcticons ? (
        <MarkGithubIcon size={24} />
      ) : (
        <FaReact size={24} />
      )}
    </button>
  );
};

export default IconToggle;
