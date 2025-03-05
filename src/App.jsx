import { useState, useEffect } from 'react'
import ThemeToggle from './components/ThemeToggle'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoStats from './components/TodoStats'
import StatusBar from './components/StatusBar'
import TodoFilters from './components/TodoFilters'
import IconToggle from './components/IconToggle'
import ExpirationNotice from './components/ExpirationNotice'
import { useTheme } from './contexts/ThemeContext'
import { useIconLibrary } from './contexts/IconContext'
import { ArchiveIcon } from '@primer/octicons-react'
import { FaArchive } from 'react-icons/fa'

// Constants for the application
const ARCHIVE_DURATION_DAYS = 30; // Days before permanent deletion
const EXPIRATION_WARNING_DAYS = 7; // Show warnings for items expiring within this many days

function App() {
  const { isDark } = useTheme();
  const { useOcticons } = useIconLibrary();
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

  // Check for expired archived todos (older than 30 days)
  useEffect(() => {
    const checkExpiredArchives = () => {
      const now = Date.now();
      const expiredTodos = todos.filter(todo =>
        todo.archived &&
        (now - todo.archivedAt) > (ARCHIVE_DURATION_DAYS * 24 * 60 * 60 * 1000)
      );

      if (expiredTodos.length > 0) {
        // Permanently delete expired archived todos
        setTodos(prevTodos =>
          prevTodos.filter(todo =>
            !todo.archived ||
            (now - todo.archivedAt) <= (ARCHIVE_DURATION_DAYS * 24 * 60 * 60 * 1000)
          )
        );
      }
    };

    // Check on app start and then daily
    checkExpiredArchives();
    const interval = setInterval(checkExpiredArchives, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [todos]);

  const handleAddTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(),
      text: text,
      completed: false,
      archived: false,
      archivedAt: null
    }])
  }

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleArchiveTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            archived: true,
            archivedAt: Date.now()
          }
        : todo
    ));
  }

  const handleRestoreTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            archived: false,
            archivedAt: null
          }
        : todo
    ));
  }

  const handlePermanentDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const handleEditTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  }

  // Calculate days remaining before permanent deletion
  const getDaysUntilDeletion = (archivedAt) => {
    const now = Date.now();
    const daysPassed = Math.floor((now - archivedAt) / (24 * 60 * 60 * 1000));
    return Math.max(0, ARCHIVE_DURATION_DAYS - daysPassed);
  };

  // Get filtered and sorted todos
  const getFilteredAndSortedTodos = () => {
    // First, filter the todos
    let filteredTodos = [...todos];

    if (filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed && !todo.archived);
    } else if (filter === 'archived') {
      filteredTodos = filteredTodos.filter(todo => todo.archived);
    } else {
      // 'all' filter should not include archived items
      filteredTodos = filteredTodos.filter(todo => !todo.archived);
    }

    // Then sort them
    return filteredTodos.sort((a, b) => {
      // Always put completed at the bottom if not in completed filter
      if (filter !== 'completed' && filter !== 'archived') {
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

  // Count archived todos
  const archivedCount = todos.filter(todo => todo.archived).length;

  // Get todos that are about to expire (within EXPIRATION_WARNING_DAYS days)
  const expiringTodos = todos
    .filter(todo => {
      if (!todo.archived) return false;
      const daysLeft = getDaysUntilDeletion(todo.archivedAt);
      return daysLeft <= EXPIRATION_WARNING_DAYS && daysLeft > 0;
    })
    .map(todo => ({
      ...todo,
      daysLeft: getDaysUntilDeletion(todo.archivedAt)
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft); // Sort by days left (ascending)

  // Count archived todos that will expire soon
  const expiringCount = expiringTodos.length;

  // Show archive view when clicking notification
  const handleViewArchive = () => {
    setFilter('archived');
  };

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
          {filter !== 'archived' && expiringTodos.length > 0 && (
            <ExpirationNotice
              expiringTodos={expiringTodos}
              onViewArchive={handleViewArchive}
            />
          )}

          {filter !== 'archived' && <TodoForm onAddTodo={handleAddTodo} />}

          {filter === 'archived' && (
            <div className="mb-4 p-3 rounded-md border border-opacity-50 flex items-center justify-between">
              <div className={`font-medium ${themeClass('text-dracula-red', 'text-light-red')}`}>
                <h2 className="flex items-center">
                  {useOcticons ? (
                    <ArchiveIcon className="mr-2" size={16} />
                  ) : (
                    <FaArchive className="mr-2" size={16} />
                  )}
                  Archive View - Items will be deleted after {ARCHIVE_DURATION_DAYS} days
                </h2>
                {expiringTodos.length > 0 && (
                  <p className="text-xs mt-1 ml-6">
                    {expiringTodos.length} {expiringTodos.length === 1 ? 'item' : 'items'} expiring soon
                  </p>
                )}
              </div>
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs rounded-md ${
                  themeClass(
                    'bg-dracula-currentLine text-dracula-foreground hover:bg-dracula-purple/20',
                    'bg-light-comment text-white hover:bg-light-comment/80'
                  )
                }`}
              >
                Back to Tasks
              </button>
            </div>
          )}

          <TodoFilters
            filter={filter}
            setFilter={setFilter}
            sortOrder={sortOrder}
            toggleSortOrder={toggleSortOrder}
            archivedCount={archivedCount}
            expiringCount={expiringCount}
          />

          <TodoList
            todos={getFilteredAndSortedTodos()}
            onToggle={handleToggleTodo}
            onDelete={handleArchiveTodo}
            onEdit={handleEditTodo}
            onRestore={handleRestoreTodo}
            onPermanentDelete={handlePermanentDeleteTodo}
            getDaysUntilDeletion={getDaysUntilDeletion}
            isArchiveView={filter === 'archived'}
          />

          <TodoStats todos={todos} archivedCount={archivedCount} expiringCount={expiringCount} />
        </main>

        <StatusBar
          storageAvailable={storageAvailable}
          todoCount={todos.filter(todo => !todo.archived).length}
          archivedCount={archivedCount}
          expiringCount={expiringCount}
        />
      </div>

      {/* Icon library toggle */}
      <IconToggle />
    </>
  )
}

export default App
