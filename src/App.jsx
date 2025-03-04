import { useState, useEffect } from 'react'
import ThemeToggle from './components/ThemeToggle'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoStats from './components/TodoStats'
import StatusBar from './components/StatusBar'
import IconToggle from './components/IconToggle'
import { useTheme } from './contexts/ThemeContext'

function App() {
  const { isDark } = useTheme();
  const [todos, setTodos] = useState(() => {
    // Initialize state from localStorage on component mount
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [storageAvailable, setStorageAvailable] = useState(false)

  // Create a dynamic theme class based on current theme
  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

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

  const handleAddTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(),
      text: text,
      completed: false
    }])
  }

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEditTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  // Sort todos: most recent uncompleted at top, completed at bottom
  const sortedTodos = () => {
    return [...todos].sort((a, b) => {
      // If one is completed and the other isn't, the completed one goes later
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;

      // Within the same completion status, sort by ID (timestamp) descending
      // This puts the most recent items (higher IDs) first
      return b.id - a.id;
    });
  }

  return (
    <>
      {/* Skip to main content link - positioned at the top left of the page */}
      <a
        href="#main-content"
        className={`sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:p-3 focus:z-50 focus:rounded-br-md ${
          themeClass(
            'focus:bg-dracula-purple focus:text-dracula-foreground focus:outline-none focus:ring-2 focus:ring-dracula-pink',
            'focus:bg-light-purple focus:text-light-foreground focus:outline-none focus:ring-2 focus:ring-light-pink'
          )
        }`}
      >
        Skip to main content
      </a>

      <div className={`max-w-xl mx-auto my-8 p-6 rounded-lg shadow-xl relative ${themeClass('bg-dracula-background text-dracula-foreground', 'bg-white text-light-foreground')}`} role="application" aria-label="Todo application">
        <header className="mb-6">
          <ThemeToggle />
          <h1 className={`text-2xl font-bold text-center ${themeClass('text-dracula-cyan', 'text-light-pink')}`}>Todo App</h1>
        </header>

        <main id="main-content" tabIndex="-1" className="focus:outline-none">
          <TodoForm onAddTodo={handleAddTodo} />

          <TodoList
            todos={sortedTodos()}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />

          <TodoStats todos={todos} />
        </main>

        <StatusBar storageAvailable={storageAvailable} todoCount={todos.length} />
      </div>

      {/* Icon library toggle */}
      <IconToggle />
    </>
  )
}

export default App
