import React from 'react';
import { useIconLibrary } from '../contexts/IconContext';
import { useThemeUtils } from '../hooks/useThemeUtils';

function IconToggle() {
  const { useOcticons, toggleIconLibrary, icons } = useIconLibrary();
  const { themeClass } = useThemeUtils();

  // Get icons from the library
  const GithubIcon = icons.github || icons.markGithub;
  const ReactIcon = icons.react;

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
      {useOcticons ? <GithubIcon size={24} /> : <ReactIcon size={24} />}
    </button>
  );
}

export default IconToggle;