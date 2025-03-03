import { useState } from 'react';
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';
import SaveIcon from '../icons/SaveIcon';
import CancelIcon from '../icons/CancelIcon';
import { useTheme } from '../contexts/ThemeContext';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const { isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  const startEditing = () => {
    setIsEditing(true);
    setEditValue(todo.text);
  };

  const saveEdit = () => {
    if (editValue.trim() !== '') {
      onEdit(todo.id, editValue);
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditValue(todo.text);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <li className={`flex items-center justify-between p-2.5 rounded-lg hover:bg-opacity-80 transition-colors duration-200 text-sm ${
      themeClass('bg-dracula-selection', 'bg-light-selection')
    }`}>
      {isEditing ? (
        <div className="flex-1 flex pr-2" role="form" aria-label="Edit todo">
          <label htmlFor={`edit-todo-${todo.id}`} className="sr-only">Edit todo</label>
          <input
            id={`edit-todo-${todo.id}`}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleEditKeyDown}
            className={`flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 text-sm ${
              themeClass(
                'border-dracula-comment bg-dracula-currentLine text-dracula-foreground focus:ring-dracula-pink',
                'border-light-comment bg-light-currentLine text-light-foreground focus:ring-light-pink'
              )
            }`}
            autoFocus
            aria-required="true"
          />
          <div className="flex ml-2">
            <button
              onClick={saveEdit}
              className={`w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 mr-1 ${
                themeClass(
                  'text-dracula-green hover:bg-dracula-green hover:text-dracula-background focus-visible:outline-dracula-green',
                  'text-light-green hover:bg-light-green hover:text-light-background focus-visible:outline-light-green'
                )
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
              aria-label="Save changes"
              disabled={editValue.trim() === ''}
            >
              <SaveIcon />
              <span className="sr-only">Save changes</span>
            </button>
            <button
              onClick={cancelEdit}
              className={`w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 ${
                themeClass(
                  'text-dracula-orange hover:bg-dracula-orange hover:text-dracula-background focus-visible:outline-dracula-orange',
                  'text-light-orange hover:bg-light-orange hover:text-light-background focus-visible:outline-light-orange'
                )
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
              aria-label="Cancel editing"
            >
              <CancelIcon />
              <span className="sr-only">Cancel editing</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center flex-1">
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className={`w-4 h-4 mr-3 rounded ${
                themeClass(
                  'text-dracula-pink accent-dracula-pink border-dracula-comment focus:ring-dracula-pink',
                  'text-light-pink accent-light-pink border-light-comment focus:ring-light-pink'
                )
              } focus:ring-2`}
              aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`cursor-pointer text-sm ${todo.completed ?
                themeClass('line-through text-dracula-comment', 'line-through text-light-comment') :
                themeClass('text-dracula-foreground', 'text-light-foreground')
              }`}
            >
              {todo.text}
            </label>
          </div>
          <div className="flex">
            <button
              onClick={startEditing}
              className={`ml-2 w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 ${
                themeClass(
                  'text-dracula-cyan hover:bg-dracula-cyan hover:text-dracula-background focus-visible:outline-dracula-cyan',
                  'text-light-cyan hover:bg-light-cyan hover:text-light-background focus-visible:outline-light-cyan'
                )
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
              aria-label={`Edit todo: ${todo.text}`}
            >
              <EditIcon />
              <span className="sr-only">Edit</span>
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className={`ml-2 w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 ${
                themeClass(
                  'text-dracula-red hover:bg-dracula-red hover:text-dracula-background focus-visible:outline-dracula-red',
                  'text-light-red hover:bg-light-red hover:text-light-background focus-visible:outline-light-red'
                )
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
              aria-label={`Delete todo: ${todo.text}`}
            >
              <DeleteIcon />
              <span className="sr-only">Delete</span>
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
