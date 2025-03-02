import { useState } from 'react';
import AddIcon from '../icons/AddIcon';
import { useTheme } from '../contexts/ThemeContext';

function TodoForm({ onAddTodo }) {
  const { isDark } = useTheme();
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  // Create a dynamic theme class based on current theme
  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  return (
    <div className="flex mb-4" role="form" aria-label="Add new todo">
      <label htmlFor="new-todo-input" className="sr-only">Add a new task</label>
      <input
        id="new-todo-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..."
        className={`flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 ${
          themeClass(
            'border-dracula-comment bg-dracula-currentLine text-dracula-foreground placeholder-dracula-comment focus:ring-dracula-pink',
            'border-light-comment bg-light-currentLine text-light-foreground placeholder-light-comment focus:ring-light-pink'
          )
        }`}
        aria-required="true"
      />
      <button
        onClick={handleAddTodo}
        className={`flex items-center justify-center px-4 py-2 rounded-r-lg active:transform active:scale-95 transition-all duration-200 ${
          themeClass(
            'bg-dracula-pink text-dracula-background hover:bg-dracula-purple hover:text-dracula-foreground focus-visible:outline-dracula-pink',
            'bg-light-pink text-light-background hover:bg-light-purple hover:text-light-background focus-visible:outline-light-pink'
          )
        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
        aria-label="Add todo"
        disabled={inputValue.trim() === ''}
      >
        <AddIcon />
        <span className="sr-only">Add Todo</span>
      </button>
    </div>
  );
}

export default TodoForm;
