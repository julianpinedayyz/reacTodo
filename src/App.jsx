import { useState, useEffect } from 'react'
import ThemeToggle from './components/ThemeToggle'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoStats from './components/TodoStats'
import StatusBar from './components/StatusBar'
import TodoFilters from './components/TodoFilters'
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
  const [filter, setFilter] = useState('all') // 'all', 'completed', 'archived'
  const [sortOrder, setSortOrder] = useState('desc') // 'desc' (newest first) or 'asc' (oldest first)

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

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  }

  // Get filtered and sorted todos
  const getFilteredAndSortedTodos = () => {
    // First, filter the todos
    let filteredTodos = [...todos];

    if (filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    } else if (filter === 'archived') {
      // For now, no todos are archived, so return empty array
      // Will implement archive functionality later
      return [];
    }

    // Then sort them
    return filteredTodos.sort((a, b) => {
      // Always put completed at the bottom if not in completed filter
      if (filter !== 'completed') {
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
      }

      // Sort by timestamp according to sortOrder
      if (sortOrder === 'desc') {
        return b.id - a.id; // Newest first
      } else {
        return a.id - b.id; // Oldest first
      }
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

          <TodoFilters
            filter={filter}
            setFilter={setFilter}
            sortOrder={sortOrder}
            toggleSortOrder={toggleSortOrder}
          />

          <TodoList
            todos={getFilteredAndSortedTodos()}
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
