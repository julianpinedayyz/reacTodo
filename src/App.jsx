import { useState, useEffect } from 'react'

// SVG Icon Components with improved accessibility
const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true" focusable="false">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
  </svg>
)

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true" focusable="false">
    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
  </svg>
)

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true" focusable="false">
    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
  </svg>
)

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true" focusable="false">
    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z" clipRule="evenodd" />
  </svg>
)

const CancelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true" focusable="false">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
)

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
            <li key={todo.id} className="flex items-center justify-between p-3 bg-[#44475A] rounded-lg hover:bg-opacity-80 transition-colors duration-200">
              {editingId === todo.id ? (
                <div className="flex-1 flex pr-2" role="form" aria-label="Edit todo">
                  <label htmlFor={`edit-todo-${todo.id}`} className="sr-only">Edit todo</label>
                  <input
                    id={`edit-todo-${todo.id}`}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleEditKeyDown}
                    className="flex-1 px-2 py-1 border border-[#6272A4] bg-[#282A36] rounded focus:outline-none focus:ring-2 focus:ring-[#FF79C6] text-[#F8F8F2]"
                    autoFocus
                    aria-required="true"
                  />
                  <div className="flex ml-2">
                    <button 
                      onClick={saveEdit}
                      className="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 mr-1 text-[#50FA7B] hover:bg-[#50FA7B] hover:text-[#282A36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#50FA7B]"
                      aria-label="Save changes"
                      disabled={editValue.trim() === ''}
                    >
                      <SaveIcon />
                      <span className="sr-only">Save changes</span>
                    </button>
                    <button 
                      onClick={cancelEdit}
                      className="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 text-[#FFB86C] hover:bg-[#FFB86C] hover:text-[#282A36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB86C]"
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
                      className="w-4 h-4 mr-3 text-[#FF79C6] accent-[#FF79C6] border-[#6272A4] rounded focus:ring-[#FF79C6] focus:ring-2"
                      aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                    />
                    <label 
                      htmlFor={`todo-${todo.id}`}
                      className={`cursor-pointer ${todo.completed ? 'line-through text-[#6272A4]' : 'text-[#F8F8F2]'}`}
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
