import { useTheme } from '../contexts/ThemeContext';
import { useIconLibrary } from '../contexts/IconContext';
import { ListUnorderedIcon, CheckIcon, ArchiveIcon, SortAscIcon, SortDescIcon } from '@primer/octicons-react';
import { FaList, FaCheck, FaArchive, FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';

const TodoFilters = ({
  filter,
  setFilter,
  sortOrder,
  toggleSortOrder,
  archivedCount = 0,
  expiringCount = 0
}) => {
  const { isDark } = useTheme();
  const { useOcticons } = useIconLibrary();

  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  // Custom button styles using Dracula theme colors
  const getButtonClass = (buttonType, isActive) => {
    // Base styles for all buttons
    const baseStyles = `
      flex items-center justify-center px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors
    `;

    // Button type specific styles - using Dracula theme colors
    if (buttonType === 'all') {
      return `${baseStyles} ${
        isActive
          ? themeClass('bg-dracula-purple text-dracula-background', 'bg-light-purple text-white')
          : themeClass('bg-dracula-currentLine text-dracula-purple hover:bg-dracula-purple/20', 'bg-light-currentLine text-light-purple hover:bg-light-purple/20')
      }`;
    }

    if (buttonType === 'completed') {
      return `${baseStyles} ${
        isActive
          ? themeClass('bg-dracula-green text-dracula-background', 'bg-light-green text-white')
          : themeClass('bg-dracula-currentLine text-dracula-green hover:bg-dracula-green/20', 'bg-light-currentLine text-light-green hover:bg-light-green/20')
      }`;
    }

    if (buttonType === 'archived') {
      return `${baseStyles} ${
        isActive
          ? themeClass('bg-dracula-orange text-dracula-background', 'bg-light-orange text-white')
          : themeClass('bg-dracula-currentLine text-dracula-orange hover:bg-dracula-orange/20', 'bg-light-currentLine text-light-orange hover:bg-light-orange/20')
      }`;
    }

    if (buttonType === 'sort') {
      return `${baseStyles} ${
        themeClass('bg-dracula-currentLine text-dracula-cyan hover:bg-dracula-cyan/20', 'bg-light-currentLine text-light-cyan hover:bg-light-cyan/20')
      }`;
    }

    return baseStyles;
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2 justify-between" role="toolbar" aria-label="Todo filtering options">
      <div className="flex gap-2">
        <button
          className={getButtonClass('all', filter === 'all')}
          onClick={() => setFilter('all')}
          aria-pressed={filter === 'all'}
        >
          {useOcticons ? (
            <ListUnorderedIcon size={14} className="mr-1" aria-hidden="true" />
          ) : (
            <FaList size={14} className="mr-1" aria-hidden="true" />
          )}
          <span>All</span>
        </button>

        <button
          className={getButtonClass('completed', filter === 'completed')}
          onClick={() => setFilter('completed')}
          aria-pressed={filter === 'completed'}
        >
          {useOcticons ? (
            <CheckIcon size={14} className="mr-1" aria-hidden="true" />
          ) : (
            <FaCheck size={14} className="mr-1" aria-hidden="true" />
          )}
          <span>Completed</span>
        </button>

        <button
          className={`${getButtonClass('archived', filter === 'archived')} relative`}
          onClick={() => setFilter('archived')}
          aria-pressed={filter === 'archived'}
          disabled={archivedCount === 0}
          title={archivedCount === 0 ? "No archived items" : `${archivedCount} archived items${expiringCount > 0 ? `, ${expiringCount} expiring soon` : ''}`}
        >
          {useOcticons ? (
            <ArchiveIcon size={14} className="mr-1" aria-hidden="true" />
          ) : (
            <FaArchive size={14} className="mr-1" aria-hidden="true" />
          )}
          <span>Archived</span>
          {archivedCount > 0 && (
            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              themeClass(
                'bg-dracula-red text-dracula-background',
                'bg-light-red text-white'
              )
            }`}>
              {archivedCount}
            </span>
          )}
          {archivedCount > 0 && filter !== 'archived' && expiringCount > 0 && (
            <span className={`absolute top-0 right-0 -mt-1 -mr-1 w-2 h-2 rounded-full ${
              themeClass('bg-dracula-red', 'bg-light-red')
            }`}></span>
          )}
        </button>
      </div>

      <button
        className={getButtonClass('sort', true)}
        onClick={toggleSortOrder}
        aria-pressed={true}
        title={sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
      >
        {useOcticons ? (
          sortOrder === 'desc' ? (
            <SortDescIcon size={14} className="mr-1" aria-hidden="true" />
          ) : (
            <SortAscIcon size={14} className="mr-1" aria-hidden="true" />
          )
        ) : (
          sortOrder === 'desc' ? (
            <FaSortAmountDown size={14} className="mr-1" aria-hidden="true" />
          ) : (
            <FaSortAmountDownAlt size={14} className="mr-1" aria-hidden="true" />
          )
        )}
        <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'} first</span>
      </button>
    </div>
  );
};

export default TodoFilters;
