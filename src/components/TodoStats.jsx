import { useTheme } from '../contexts/ThemeContext';

function TodoStats({ todos }) {
  const { isDark } = useTheme();

  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  if (todos.length === 0) {
    return null;
  }

  return (
    <div className={`mt-6 pt-4 border-t text-sm ${themeClass('border-dracula-comment text-dracula-pink', 'border-light-comment text-light-pink')}`} aria-live="polite" aria-atomic="true">
      <p className="flex justify-between">
        <span>Total tasks:</span>
        <span>{todos.length}</span>
      </p>
      <p className="flex justify-between">
        <span>Completed:</span>
        <span>{todos.filter(todo => todo.completed).length}</span>
      </p>
    </div>
  );
}

export default TodoStats;
