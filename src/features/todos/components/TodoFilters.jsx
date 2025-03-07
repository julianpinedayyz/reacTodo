import { useThemeUtils } from '../../ui/hooks/useThemeUtils';
import { useIconLibrary } from '../../ui/contexts/IconContext';

function TodoFilters({
  filter,
  setFilter,
  sortOrder,
  toggleSortOrder,
  archivedCount = 0,
  expiringCount = 0
}) {
  const { isDarkMode, themeClass } = useThemeUtils();
  const { icons } = useIconLibrary();

  // Get icons from library
  const SortIcon = icons.sort || (sortOrder === 'asc' ? icons.arrowUp : icons.arrowDown);

  // Filter button active state styling
  const getActiveClass = (buttonFilter) => {
    return filter === buttonFilter
      ? themeClass(
          'bg-dracula-purple text-dracula-foreground',
          'bg-light-purple text-light-foreground'
        )
      : themeClass(
          'bg-dracula-currentLine text-dracula-foreground hover:bg-dracula-purple/20',
          'bg-light-selection text-light-foreground hover:bg-light-purple/20'
        );
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-2.5 py-1.5 text-xs rounded-md transition-colors ${getActiveClass('all')}`}
          aria-pressed={filter === 'all'}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-2.5 py-1.5 text-xs rounded-md transition-colors ${getActiveClass('active')}`}
          aria-pressed={filter === 'active'}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-2.5 py-1.5 text-xs rounded-md transition-colors ${getActiveClass('completed')}`}
          aria-pressed={filter === 'completed'}
        >
          Completed
        </button>
        {archivedCount > 0 && (
          <button
            onClick={() => setFilter('archived')}
            className={`px-2.5 py-1.5 text-xs rounded-md transition-colors flex items-center ${getActiveClass('archived')}`}
            aria-pressed={filter === 'archived'}
          >
            Archived
            {expiringCount > 0 && (
              <span className={`ml-1.5 inline-flex items-center justify-center w-4 h-4 text-[0.65rem] rounded-full
                ${themeClass('bg-dracula-red text-dracula-background', 'bg-light-red text-light-background')}`}
              >
                {expiringCount}
              </span>
            )}
          </button>
        )}
      </div>

      <button
        onClick={toggleSortOrder}
        className={`p-1.5 rounded-md ${
          themeClass(
            'text-dracula-comment hover:bg-dracula-currentLine hover:text-dracula-purple',
            'text-light-comment hover:bg-light-currentLine hover:text-light-purple'
          )
        }`}
        title={sortOrder === 'asc' ? 'Oldest first' : 'Newest first'}
        aria-label={sortOrder === 'asc' ? 'Currently sorted oldest first, click to sort newest first' : 'Currently sorted newest first, click to sort oldest first'}
      >
        <SortIcon size={14} />
      </button>
    </div>
  );
}

export default TodoFilters;