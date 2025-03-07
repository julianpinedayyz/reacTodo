// Import from features module
import {
  // Todo-related imports
  TodoForm,
  TodoList,
  TodoStats,
  ExpirationNotice,
  TodoFilters,
  useTodos,
  ARCHIVE_DURATION_DAYS,
  // UI-related imports
  ThemeToggle,
  StatusBar,
  IconToggle,
  useIconLibrary,
  useThemeUtils
} from './features';

function App() {
  // Custom hooks provide all the state and functions we need
  const {
    filteredAndSortedTodos,
    storageAvailable,
    filter,
    setFilter,
    sortOrder,
    toggleSortOrder,
    archivedCount,
    expiringCount,
    activeTodoCount,
    expiringTodos,
    todos,
    handleAddTodo,
    handleToggleTodo,
    handleArchiveTodo,
    handleRestoreTodo,
    handlePermanentDeleteTodo,
    handleEditTodo,
    handleViewArchive,
    getDaysUntilDeletion
  } = useTodos();

  const { themeClass } = useThemeUtils();
  const { useOcticons, icons } = useIconLibrary();

  // Get the archive icon from the icon library
  const ArchiveViewIcon = icons.archive || icons.box;

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
                  <ArchiveViewIcon className="mr-2" size={16} />
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
            todos={filteredAndSortedTodos}
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
          todoCount={activeTodoCount}
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
