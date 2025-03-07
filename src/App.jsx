import { useState, useEffect } from 'react';

// Import components
import ThemeToggle from './components/ThemeToggle';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import StatusBar from './components/StatusBar';
import TodoFilters from './components/TodoFilters';
import IconToggle from './components/IconToggle';
import ExpirationNotice from './components/ExpirationNotice';

// Import contexts
import { useTheme } from './contexts/ThemeContext';
import { useIconLibrary } from './contexts/IconContext';

// Import icons
import { ArchiveIcon } from '@primer/octicons-react';
import { FaArchive } from 'react-icons/fa';

// Import utility functions
import {
  ARCHIVE_DURATION_DAYS,
  EXPIRATION_WARNING_DAYS,
  addTodo,
  toggleTodo,
  archiveTodo,
  restoreTodo,
  permanentDeleteTodo,
  editTodo,
  getDaysUntilDeletion,
  getFilteredAndSortedTodos,
  removeExpiredTodos,
  getExpiringTodos
} from './utils/todoUtils';

// Import storage utilities
import {
  isStorageAvailable,
  saveToStorage,
  loadFromStorage
} from './utils/storageUtils';

function App() {
  const { isDark } = useTheme();
  const { useOcticons } = useIconLibrary();
  const [todos, setTodos] = useState(() => loadFromStorage('todos', []));
  const [storageAvailable, setStorageAvailable] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'archived'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (newest first) or 'asc' (oldest first)

  // Create a dynamic theme class based on current theme
  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  // Check if localStorage is available
  useEffect(() => {
    setStorageAvailable(isStorageAvailable());
  }, []);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    if (storageAvailable) {
      saveToStorage('todos', todos);
    }
  }, [todos, storageAvailable]);

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
        setTodos(removeExpiredTodos);
      }
    };

    // Check on app start and then daily
    checkExpiredArchives();
    const interval = setInterval(checkExpiredArchives, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [todos]);

  // Handler functions that use the utility functions
  const handleAddTodo = (text) => {
    setTodos(todos => addTodo(todos, text));
  };

  const handleToggleTodo = (id) => {
    setTodos(todos => toggleTodo(todos, id));
  };

  const handleArchiveTodo = (id) => {
    setTodos(todos => archiveTodo(todos, id));
  };

  const handleRestoreTodo = (id) => {
    setTodos(todos => restoreTodo(todos, id));
  };

  const handlePermanentDeleteTodo = (id) => {
    setTodos(todos => permanentDeleteTodo(todos, id));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(todos => editTodo(todos, id, newText));
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  // Count archived todos
  const archivedCount = todos.filter(todo => todo.archived).length;

  // Get todos that are about to expire (within EXPIRATION_WARNING_DAYS days)
  const expiringTodos = getExpiringTodos(todos);

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
            todos={getFilteredAndSortedTodos(todos, filter, sortOrder)}
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
  );
}

export default App;
