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

  // Button base classes with improved contrast
  const buttonClass = (isActive) => `
    flex items-center justify-center px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors
    ${isActive
      ? themeClass('bg-dracula-purple text-dracula-foreground', 'bg-light-purple text-white')
      : themeClass(
          'bg-dracula-currentLine text-dracula-foreground hover:bg-dracula-purple/20',
          'bg-light-currentLine text-light-foreground hover:bg-light-purple/20'
        )
    }
  `;

  return (
    <div className="mb-4 flex flex-wrap gap-2 justify-between" role="toolbar" aria-label="Todo filtering options">
      <div className="flex gap-2">
        <button
          className={buttonClass(filter === 'all')}
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
          className={buttonClass(filter === 'completed')}
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

        {/* Fix archive button styling */}
        <button
          className={`${buttonClass(filter === 'archived')} relative`}
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
                'bg-dracula-red text-white', // Better contrast for dark mode
                'bg-light-red text-white'    // Keep white text on red for light mode
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
        className={buttonClass(true)}
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
