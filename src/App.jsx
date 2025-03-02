import { useState, useEffect } from 'react'
import AddIcon from './icons/AddIcon'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import SaveIcon from './icons/SaveIcon'
import CancelIcon from './icons/CancelIcon'
import ThemeToggle from './components/ThemeToggle'
import { useTheme } from './contexts/ThemeContext'

function App() {
  const { isDark } = useTheme();
  const [todos, setTodos] = useState(() => {
    // Initialize state from localStorage on component mount
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [storageAvailable, setStorageAvailable] = useState(false)

  // Check if localStorage is available
  useEffect(() => {
    const checkStorage = () => {
      try {
        const testKey = '__storage_test__'
        localStorage.setItem(testKey, testKey)
        localStorage.removeItem(testKey)
        setStorageAvailable(true)
      } catch (e) {
        setStorageAvailable(false)
      }
    }

    checkStorage()
  }, [])

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    if (storageAvailable) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, storageAvailable])

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }])
      setInputValue('')
    }
  }

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  const startEditing = (id, text) => {
    setEditingId(id)
    setEditValue(text)
  }

  const saveEdit = () => {
    if (editValue.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editValue } : todo
      ))
      setEditingId(null)
      setEditValue('')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEdit()
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  // Create a dynamic theme class based on current theme
  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  return (
    <div className={`max-w-md mx-auto my-8 p-6 rounded-lg shadow-xl relative ${themeClass('bg-dracula-background text-dracula-foreground', 'bg-white text-light-foreground')}`} role="application" aria-label="Todo application">
      <ThemeToggle />
      <h1 className={`text-2xl font-bold text-center mb-6 ${themeClass('text-dracula-pink', 'text-light-pink')}`}>Todo App</h1>

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

      <div role="region" aria-label="Todo list" tabIndex="0">
        <ul className="space-y-2" aria-label="Todo items list">
          {todos.map((todo) => (
            <li key={todo.id} className={`flex items-center justify-between p-3 rounded-lg hover:bg-opacity-80 transition-colors duration-200 ${
              themeClass('bg-dracula-selection', 'bg-light-selection')
            }`}>
              {editingId === todo.id ? (
                <div className="flex-1 flex pr-2" role="form" aria-label="Edit todo">
                  <label htmlFor={`edit-todo-${todo.id}`} className="sr-only">Edit todo</label>
                  <input
                    id={`edit-todo-${todo.id}`}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleEditKeyDown}
                    className={`flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 ${
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
                      onChange={() => handleToggleTodo(todo.id)}
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
                      className={`cursor-pointer ${todo.completed ?
                        themeClass('line-through text-dracula-comment', 'line-through text-light-comment') :
                        themeClass('text-dracula-foreground', 'text-light-foreground')
                      }`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
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
                      onClick={() => handleDeleteTodo(todo.id)}
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
          ))}
          {todos.length === 0 && (
            <li className={`p-3 rounded-lg text-center ${themeClass('bg-dracula-currentLine text-dracula-comment', 'bg-light-currentLine text-light-comment')}`}>
              No todos yet. Add one above!
            </li>
          )}
        </ul>
      </div>

      {todos.length > 0 && (
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
      )}

      <footer className={`mt-8 pt-4 border-t text-xs ${themeClass('border-dracula-comment text-dracula-comment', 'border-light-comment text-light-comment')}`} role="contentinfo">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" aria-live="polite">
            <span id="storage-status-label">Storage:</span>
            {storageAvailable ? (
              <span
                className={`px-2 py-1 rounded-md flex items-center ${themeClass('bg-dracula-currentLine text-dracula-green', 'bg-light-currentLine text-light-green')}`}
                role="status"
                aria-labelledby="storage-status-label"
              >
                <span className={`w-2 h-2 rounded-full mr-1 ${themeClass('bg-dracula-green', 'bg-light-green')}`} aria-hidden="true"></span>
                Available
              </span>
            ) : (
              <span
                className={`px-2 py-1 rounded-md flex items-center ${themeClass('bg-dracula-currentLine text-dracula-red', 'bg-light-currentLine text-light-red')}`}
                role="alert"
                aria-labelledby="storage-status-label"
              >
                <span className={`w-2 h-2 rounded-full mr-1 ${themeClass('bg-dracula-red', 'bg-light-red')}`} aria-hidden="true"></span>
                Unavailable
              </span>
            )}
          </div>

          {storageAvailable && (
            <div className="flex items-center gap-2" aria-live="polite">
              <span id="stored-todos-label">Stored todos:</span>
              <span
                className={`px-2 py-1 rounded-md ${themeClass('bg-dracula-currentLine text-dracula-cyan', 'bg-light-currentLine text-light-cyan')}`}
                aria-labelledby="stored-todos-label"
              >
                {todos.length}
              </span>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}

export default App
