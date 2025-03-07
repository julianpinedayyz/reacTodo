import React, { createContext, useState, useContext, useMemo } from 'react';
import * as Octicons from '@primer/octicons-react';
import * as ReactIcons from 'react-icons/fa';

// Create context
const IconContext = createContext();

// Hook for consuming the context
export function useIconLibrary() {
  return useContext(IconContext);
}

export function IconLibraryProvider({ children }) {
  const [useOcticons, setUseOcticons] = useState(false);

  // Setup icons based on the current selection
  const icons = useMemo(() => {
    // Map common icon names to their implementations
    return {
      // UI icons
      sun: useOcticons ? Octicons.SunIcon : ReactIcons.FaSun,
      moon: useOcticons ? Octicons.MoonIcon : ReactIcons.FaMoon,

      // Action icons
      add: useOcticons ? Octicons.PlusIcon : ReactIcons.FaPlus,
      edit: useOcticons ? Octicons.PencilIcon : ReactIcons.FaPencilAlt,
      save: useOcticons ? Octicons.CheckIcon : ReactIcons.FaCheck,
      cancel: useOcticons ? Octicons.XIcon : ReactIcons.FaTimes,

      // Sort and navigation icons
      sort: useOcticons ? Octicons.SortAscIcon : ReactIcons.FaSort,
      arrowUp: useOcticons ? Octicons.ArrowUpIcon : ReactIcons.FaArrowUp,
      arrowDown: useOcticons ? Octicons.ArrowDownIcon : ReactIcons.FaArrowDown,

      // Status icons
      check: useOcticons ? Octicons.CheckCircleIcon : ReactIcons.FaCheckCircle,
      error: useOcticons ? Octicons.XCircleIcon : ReactIcons.FaTimesCircle,
      warning: useOcticons ? Octicons.AlertIcon : ReactIcons.FaExclamationTriangle,

      // Todo-specific icons
      archive: useOcticons ? Octicons.ArchiveIcon : ReactIcons.FaArchive,
      trash: useOcticons ? Octicons.TrashIcon : ReactIcons.FaTrash,
      restore: useOcticons ? Octicons.ArrowUpIcon : ReactIcons.FaArrowUp,
      list: useOcticons ? Octicons.ListOrderedIcon : ReactIcons.FaListOl,
      storage: useOcticons ? Octicons.DatabaseIcon : ReactIcons.FaDatabase,

      // Branding icons
      github: useOcticons ? Octicons.MarkGithubIcon : ReactIcons.FaGithub,
      react: ReactIcons.FaReact,
    };
  }, [useOcticons]);

  // Provide the icon library and toggle function to children
  const value = {
    useOcticons,
    toggleIconLibrary: () => setUseOcticons(prev => !prev),
    icons
  };

  return (
    <IconContext.Provider value={value}>
      {children}
    </IconContext.Provider>
  );
}