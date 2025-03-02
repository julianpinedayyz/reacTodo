import TodoItem from './TodoItem';
import { useTheme } from '../contexts/ThemeContext';

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  const { isDark } = useTheme();

  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  return (
    <div role="region" aria-label="Todo list" tabIndex="0">
      <ul className="space-y-2" aria-label="Todo items list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
        {todos.length === 0 && (
          <li className={`p-3 rounded-lg text-center ${themeClass('bg-dracula-currentLine text-dracula-comment', 'bg-light-currentLine text-light-comment')}`}>
            No todos yet. Add one above!
          </li>
        )}
      </ul>
    </div>
  );
}

export default TodoList;
