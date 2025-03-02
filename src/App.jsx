import { useState, useEffect } from 'react'
import AddIcon from './icons/AddIcon'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import SaveIcon from './icons/SaveIcon'
import CancelIcon from './icons/CancelIcon'

function App() {
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

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-dracula-background rounded-lg shadow-lg text-dracula-foreground" role="application" aria-label="Todo application">
      <h1 className="text-2xl font-bold text-center text-dracula-pink mb-6">Todo App</h1>

      <div className="flex mb-4" role="form" aria-label="Add new todo">
        <label htmlFor="new-todo-input" className="sr-only">Add a new task</label>
        <input
          id="new-todo-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-dracula-comment bg-dracula-currentLine rounded-l-lg focus:outline-none focus:ring-2 focus:ring-dracula-pink text-dracula-foreground placeholder-dracula-comment"
          aria-required="true"
        />
        <button
          onClick={handleAddTodo}
          className="flex items-center justify-center px-4 py-2 rounded-r-lg bg-dracula-pink text-dracula-background hover:bg-dracula-purple hover:text-dracula-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dracula-pink active:transform active:scale-95 transition-all duration-200"
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
            <li key={todo.id} className="flex items-center justify-between p-3 bg-dracula-selection rounded-lg hover:bg-opacity-80 transition-colors duration-200">
              {editingId === todo.id ? (
                <div className="flex-1 flex pr-2" role="form" aria-label="Edit todo">
                  <label htmlFor={`edit-todo-${todo.id}`} className="sr-only">Edit todo</label>
                  <input
                    id={`edit-todo-${todo.id}`}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleEditKeyDown}
                    className="flex-1 px-2 py-1 border border-dracula-comment bg-dracula-currentLine rounded focus:outline-none focus:ring-2 focus:ring-dracula-pink text-dracula-foreground"
                    autoFocus
                    aria-required="true"
                  />
                  <div className="flex ml-2">
                    <button
                      onClick={saveEdit}
                      className="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 mr-1 text-dracula-green hover:bg-dracula-green hover:text-dracula-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dracula-green"
                      aria-label="Save changes"
                      disabled={editValue.trim() === ''}
                    >
                      <SaveIcon />
                      <span className="sr-only">Save changes</span>
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 text-dracula-orange hover:bg-dracula-orange hover:text-dracula-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dracula-orange"
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
                      className="w-4 h-4 mr-3 text-dracula-pink accent-dracula-pink border-dracula-comment rounded focus:ring-dracula-pink focus:ring-2"
                      aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`cursor-pointer ${todo.completed ? 'line-through text-dracula-comment' : 'text-dracula-foreground'}`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      className="ml-2 w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 text-dracula-cyan hover:bg-dracula-cyan hover:text-dracula-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dracula-cyan"
                      aria-label={`Edit todo: ${todo.text}`}
                    >
                      <EditIcon />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="ml-2 w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 text-dracula-red hover:bg-dracula-red hover:text-dracula-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dracula-red"
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
            <li className="p-3 bg-dracula-currentLine rounded-lg text-center text-dracula-comment">
              No todos yet. Add one above!
            </li>
          )}
        </ul>
      </div>

      {todos.length > 0 && (
        <div className="mt-6 pt-4 border-t border-dracula-comment text-sm text-dracula-pink" aria-live="polite" aria-atomic="true">
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

      {/* Footer with storage status */}
      <footer className="mt-8 pt-4 border-t border-dracula-comment text-xs text-dracula-comment" role="contentinfo">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" aria-live="polite">
            <span id="storage-status-label">Storage:</span>
            {storageAvailable ? (
              <span
                className="px-2 py-1 bg-dracula-currentLine text-dracula-green rounded-md flex items-center"
                role="status"
                aria-labelledby="storage-status-label"
              >
                <span className="w-2 h-2 bg-dracula-green rounded-full mr-1" aria-hidden="true"></span>
                Available
              </span>
            ) : (
              <span
                className="px-2 py-1 bg-dracula-currentLine text-dracula-red rounded-md flex items-center"
                role="alert"
                aria-labelledby="storage-status-label"
              >
                <span className="w-2 h-2 bg-dracula-red rounded-full mr-1" aria-hidden="true"></span>
                Unavailable
              </span>
            )}
          </div>

          {storageAvailable && (
            <div className="flex items-center gap-2" aria-live="polite">
              <span id="stored-todos-label">Stored todos:</span>
              <span
                className="px-2 py-1 bg-dracula-currentLine text-dracula-cyan rounded-md"
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
