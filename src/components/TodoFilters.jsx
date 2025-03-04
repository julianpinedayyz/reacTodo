import { useTheme } from '../contexts/ThemeContext';
import { useIconLibrary } from '../contexts/IconContext';
import { ListUnorderedIcon, CheckIcon, ArchiveIcon, SortAscIcon, SortDescIcon } from '@primer/octicons-react';
import { FaList, FaCheck, FaArchive, FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';

const TodoFilters = ({
  filter,
  setFilter,
  sortOrder,
  toggleSortOrder
}) => {
  const { isDark } = useTheme();
  const { useOcticons } = useIconLibrary();

  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  // Button base classes
  const buttonClass = (isActive) => `
    flex items-center justify-center px-3 py-1.5 rounded-md text-xs sm:text-sm transition-colors
    ${isActive
      ? themeClass('bg-dracula-purple text-dracula-foreground', 'bg-light-purple text-white')
      : themeClass('bg-dracula-currentLine text-dracula-comment hover:text-dracula-foreground', 'bg-light-currentLine text-light-comment hover:text-light-foreground')
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

        <button
          className={buttonClass(filter === 'archived')}
          onClick={() => setFilter('archived')}
          aria-pressed={filter === 'archived'}
          disabled={true} // Will implement later
          title="Coming soon"
        >
          {useOcticons ? (
            <ArchiveIcon size={14} className="mr-1" aria-hidden="true" />
          ) : (
            <FaArchive size={14} className="mr-1" aria-hidden="true" />
          )}
          <span>Archived</span>
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
