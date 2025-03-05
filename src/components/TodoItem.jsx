import { useState } from 'react';
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';
import SaveIcon from '../icons/SaveIcon';
import CancelIcon from '../icons/CancelIcon';
import RestoreIcon from '../icons/RestoreIcon';
import TrashIcon from '../icons/TrashIcon';
import { useTheme } from '../contexts/ThemeContext';
// Import both icon libraries
import { FaClock } from 'react-icons/fa';
import { ClockIcon } from '@primer/octicons-react';

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onRestore,
  onPermanentDelete,
  getDaysUntilDeletion,
  isArchiveView = false,
  useOcticons = true
}) {
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

  // Format the timestamp (todo.id) to a readable date and time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Choose which clock icon to use based on the useOcticons prop
  const TimeIcon = useOcticons ? ClockIcon : FaClock;

  // Get days until permanent deletion for archived items
  const daysUntilDeletion = todo.archived ? getDaysUntilDeletion(todo.archivedAt) : null;

  return (
    <li className={`relative flex flex-col px-2.5 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-200 text-sm mb-3 ${
      themeClass(
        `bg-dracula-selection ${todo.archived ? 'border border-dracula-red bg-opacity-50' : ''}`,
        `bg-light-selection ${todo.archived ? 'border border-light-red bg-opacity-50' : ''}`
      )
    }`}>
      {/* Actions row with timestamp on left, buttons on right */}
      <div className="flex justify-between items-center mb-1 w-full">
        {/* Timestamp display with clock icon */}
        <div className={`flex items-center text-[0.65rem] ${themeClass('text-dracula-cyan', 'text-light-pink')}`}>
          {useOcticons ? (
            <ClockIcon size={10} className="mr-1" aria-hidden="true" />
          ) : (
            <FaClock size={10} className="mr-1" aria-hidden="true" />
          )}
          <span>{formatTimestamp(todo.id)}</span>
        </div>

        {/* Show expiration info for archived items */}
        {todo.archived && daysUntilDeletion !== null && (
          <div className={`text-[0.65rem] ${
            daysUntilDeletion <= 7
              ? themeClass('text-dracula-red', 'text-light-red')
              : themeClass('text-dracula-comment', 'text-light-comment')
          }`}>
            {daysUntilDeletion === 0
              ? "Expires today"
              : `Expires in ${daysUntilDeletion} days`}
          </div>
        )}

        {/* Action buttons - with fixed size and padding */}
        {!isEditing && (
          <div className="flex shrink-0 gap-1">
            {todo.archived ? (
              <>
                {/* Restore button */}
                <button
                  onClick={() => onRestore(todo.id)}
                  className={`p-1.5 rounded-md transition-all duration-200 ${
                    themeClass(
                      'text-dracula-green hover:bg-dracula-green hover:text-dracula-background focus-visible:outline-dracula-green',
                      'text-light-green hover:bg-light-green hover:text-light-background focus-visible:outline-light-green'
                    )
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                  aria-label={`Restore todo: ${todo.text}`}
                  title="Move back to active tasks"
                >
                  <RestoreIcon size={14} />
                  <span className="sr-only">Restore</span>
                </button>

                {/* Permanent delete button */}
                <button
                  onClick={() => onPermanentDelete(todo.id)}
                  className={`p-1.5 rounded-md transition-all duration-200 ${
                    themeClass(
                      'text-dracula-red hover:bg-dracula-red hover:text-dracula-background focus-visible:outline-dracula-red',
                      'text-light-red hover:bg-light-red hover:text-light-background focus-visible:outline-light-red'
                    )
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                  aria-label={`Permanently delete todo: ${todo.text}`}
                  title="Delete permanently (cannot be undone)"
                >
                  <TrashIcon size={14} />
                  <span className="sr-only">Delete permanently</span>
                </button>
              </>
            ) : (
              <>
                {/* Edit button */}
                <button
                  onClick={startEditing}
                  className={`p-1.5 rounded-md transition-all duration-200 ${
                    themeClass(
                      'text-dracula-cyan hover:bg-dracula-cyan hover:text-dracula-background focus-visible:outline-dracula-cyan',
                      'text-light-cyan hover:bg-light-cyan hover:text-light-background focus-visible:outline-light-cyan'
                    )
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                  aria-label={`Edit todo: ${todo.text}`}
                  title="Edit task"
                >
                  <EditIcon size={14} />
                  <span className="sr-only">Edit</span>
                </button>

                {/* Archive/delete button */}
                <button
                  onClick={() => onDelete(todo.id)}
                  className={`p-1.5 rounded-md transition-all duration-200 ${
                    themeClass(
                      'text-dracula-red hover:bg-dracula-red hover:text-dracula-background focus-visible:outline-dracula-red',
                      'text-light-red hover:bg-light-red hover:text-light-background focus-visible:outline-light-red'
                    )
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                  aria-label={`Archive todo: ${todo.text}`}
                  title="Move to archive (can be restored later)"
                >
                  <DeleteIcon size={14} />
                  <span className="sr-only">Archive</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Todo content */}
      <div className="flex-1 flex justify-between items-center mt-1">
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
            <div className="flex ml-2 gap-1">
              <button
                onClick={saveEdit}
                className={`p-1.5 flex items-center justify-center rounded-md transition-all duration-200 ${
                  themeClass(
                    'text-dracula-green hover:bg-dracula-green hover:text-dracula-background focus-visible:outline-dracula-green',
                    'text-light-green hover:bg-light-green hover:text-light-background focus-visible:outline-light-green'
                  )
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                aria-label="Save changes"
                disabled={editValue.trim() === ''}
              >
                <SaveIcon size={14} />
                <span className="sr-only">Save changes</span>
              </button>
              <button
                onClick={cancelEdit}
                className={`p-1.5 flex items-center justify-center rounded-md transition-all duration-200 ${
                  themeClass(
                    'text-dracula-orange hover:bg-dracula-orange hover:text-dracula-background focus-visible:outline-dracula-orange',
                    'text-light-orange hover:bg-light-orange hover:text-light-background focus-visible:outline-light-orange'
                  )
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                aria-label="Cancel editing"
              >
                <CancelIcon size={14} />
                <span className="sr-only">Cancel editing</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center flex-1">
            {!todo.archived && (
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
            )}
            <label
              htmlFor={todo.archived ? undefined : `todo-${todo.id}`}
              className={`${todo.archived ? '' : 'cursor-pointer'} text-sm mr-2 ${
                todo.completed || todo.archived
                  ? themeClass('line-through text-dracula-comment', 'line-through text-light-comment')
                  : themeClass('text-dracula-foreground', 'text-light-foreground')
              }`}
            >
              {todo.text}
            </label>

            {todo.archived && (
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                themeClass('bg-dracula-red bg-opacity-20 text-dracula-red', 'bg-light-red bg-opacity-20 text-light-red')
              }`}>
                Archived
              </span>
            )}
          </div>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
