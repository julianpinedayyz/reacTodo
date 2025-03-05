import { useTheme } from '../contexts/ThemeContext';

function TodoStats({ todos, archivedCount = 0, expiringCount = 0 }) {
  const { isDark } = useTheme();
  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  const activeTodos = todos.filter(todo => !todo.archived);
  const totalActive = activeTodos.length;
  const completedActive = activeTodos.filter(todo => todo.completed).length;
  const pendingActive = totalActive - completedActive;

  if (totalActive === 0 && archivedCount === 0) {
    return null; // Don't show stats if there are no todos
  }

  return (
    <div
      className={`mt-4 pt-4 text-sm ${themeClass('border-t border-dracula-comment', 'border-t border-light-comment')}`}
      aria-label="Todo statistics"
    >
      <h2 className="sr-only">Todo Statistics</h2>
      <div className="flex justify-between">
        {/* Improve contrast for "Active tasks" text */}
        <div>
          <span className={themeClass('text-dracula-foreground', 'text-light-foreground')}>
            Active tasks: {totalActive}
          </span>
        </div>
        <div className="flex gap-x-4">
          <span className={themeClass('text-dracula-green', 'text-light-green')}>
            Completed: {completedActive}
          </span>
          <span className={themeClass('text-dracula-orange', 'text-light-orange')}>
            Pending: {pendingActive}
          </span>
          {archivedCount > 0 && (
            <span
              className={`${themeClass(
                `text-dracula-red ${expiringCount > 0 ? 'font-semibold' : ''}`,
                `text-light-red ${expiringCount > 0 ? 'font-semibold' : ''}`
              )}`}
              title={expiringCount > 0 ? `${expiringCount} archived items will expire soon` : ''}
            >
              Archived: {archivedCount}
              {expiringCount > 0 && (
                <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-opacity-20 inline-block" style={{
                  backgroundColor: isDark ? 'rgba(255, 85, 85, 0.3)' : 'rgba(255, 85, 85, 0.2)',
                  verticalAlign: 'text-top'
                }}>
                  {expiringCount} expiring
                </span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoStats;
