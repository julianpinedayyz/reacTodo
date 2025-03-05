import TodoItem from './TodoItem';
import { useTheme } from '../contexts/ThemeContext';
import { useIconLibrary } from '../contexts/IconContext';

const TodoList = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onRestore,
  onPermanentDelete,
  getDaysUntilDeletion,
  isArchiveView = false
}) => {
  const { isDark } = useTheme();
  const { useOcticons } = useIconLibrary();

  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  if (todos.length === 0) {
    return (
      <p className="text-center py-4">
        {isArchiveView ? "No archived tasks." : "No todos yet. Add one above!"}
      </p>
    );
  }

  return (
    <ul className="mb-6 space-y-3" aria-label={isArchiveView ? "Archived items list" : "Todo items list"}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onRestore={onRestore}
          onPermanentDelete={onPermanentDelete}
          getDaysUntilDeletion={getDaysUntilDeletion}
          isArchiveView={isArchiveView}
          useOcticons={useOcticons}
        />
      ))}
    </ul>
  );
};

export default TodoList;
