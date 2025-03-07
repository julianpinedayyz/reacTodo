import { TodoItem } from './TodoItem';
import { useThemeUtils, useIconLibrary } from '../../ui';

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
  const { isDarkMode, themeClass } = useThemeUtils();
  const { useOcticons } = useIconLibrary();

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
