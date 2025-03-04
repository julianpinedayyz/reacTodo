import TodoItem from './TodoItem';
import { useTheme } from '../contexts/ThemeContext';
import { useIconLibrary } from '../contexts/IconContext';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
  const { isDark } = useTheme();
  const { useOcticons } = useIconLibrary();

  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  if (todos.length === 0) {
    return <p className="text-center py-4">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="mb-6 space-y-3" aria-label="Todo items list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          useOcticons={useOcticons}
        />
      ))}
    </ul>
  );
};

export default TodoList;
