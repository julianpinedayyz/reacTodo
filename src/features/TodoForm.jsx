import { useState } from 'react';
import { useIconLibrary } from './ui/contexts/IconContext';
import { PlusIcon } from '@primer/octicons-react';
import { FaPlus } from 'react-icons/fa';

const TodoForm = ({ onAddTodo }) => {
  const { icons, useOcticons } = useIconLibrary();

  // Create a safe fallback if icons are not loaded
  // Use concrete implementations rather than relying on the icon library
  const AddIcon = useOcticons ? PlusIcon : FaPlus;

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-grow p-2 border rounded-l-md focus:outline-none"
        placeholder="Add a new task"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
      >
        <AddIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default TodoForm;