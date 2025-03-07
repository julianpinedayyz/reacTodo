import { useThemeUtils } from '../../ui/hooks/useThemeUtils';

function TodoStats({ todos, archivedCount = 0, expiringCount = 0 }) {
  const { themeClass } = useThemeUtils();

  // Calculate stats
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed && !todo.archived).length;
  const active = total - completed - archivedCount;

  // Don't render if there are no todos
  if (total === 0 && archivedCount === 0) return null;

  return (
    <div className={`text-xs mt-4 pt-4 border-t ${themeClass('border-dracula-comment', 'border-light-comment')}`}>
      <div className="flex justify-between">
        <span className={themeClass('text-dracula-foreground', 'text-light-foreground')}>
          {active} active
        </span>
        {completed > 0 && (
          <span className={themeClass('text-dracula-green', 'text-light-green')}>
            {completed} completed
          </span>
        )}
        {archivedCount > 0 && (
          <span className={`${expiringCount > 0 ? themeClass('text-dracula-red', 'text-light-red') : themeClass('text-dracula-orange', 'text-light-orange')}`}>
            {archivedCount} archived {expiringCount > 0 ? `(${expiringCount} expiring)` : ''}
          </span>
        )}
      </div>
    </div>
  );
}

export default TodoStats;