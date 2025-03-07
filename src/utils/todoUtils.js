// Constants for the application
export const ARCHIVE_DURATION_DAYS = 30; // Days before permanent deletion
export const EXPIRATION_WARNING_DAYS = 7; // Show warnings for items expiring within this many days

/**
 * Functions for todo list management
 */

// Add a new todo
export const addTodo = (todos, text) => {
  return [...todos, {
    id: Date.now(),
    text: text,
    completed: false,
    archived: false,
    archivedAt: null
  }];
};

// Toggle todo completion status
export const toggleTodo = (todos, id) => {
  return todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
};

// Archive a todo (soft delete)
export const archiveTodo = (todos, id) => {
  return todos.map(todo =>
    todo.id === id
      ? {
          ...todo,
          archived: true,
          archivedAt: Date.now()
        }
      : todo
  );
};

// Restore a todo from archive
export const restoreTodo = (todos, id) => {
  return todos.map(todo =>
    todo.id === id
      ? {
          ...todo,
          archived: false,
          archivedAt: null
        }
      : todo
  );
};

// Permanently delete a todo
export const permanentDeleteTodo = (todos, id) => {
  return todos.filter(todo => todo.id !== id);
};

// Edit a todo's text
export const editTodo = (todos, id, newText) => {
  return todos.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  );
};

// Calculate days remaining before permanent deletion
export const getDaysUntilDeletion = (archivedAt) => {
  const now = Date.now();
  const daysPassed = Math.floor((now - archivedAt) / (24 * 60 * 60 * 1000));
  return Math.max(0, ARCHIVE_DURATION_DAYS - daysPassed);
};

// Get filtered and sorted todos
export const getFilteredAndSortedTodos = (todos, filter, sortOrder) => {
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
};

// Check for and remove expired archived todos (older than ARCHIVE_DURATION_DAYS)
export const removeExpiredTodos = (todos) => {
  const now = Date.now();
  return todos.filter(todo =>
    !todo.archived ||
    (now - todo.archivedAt) <= (ARCHIVE_DURATION_DAYS * 24 * 60 * 60 * 1000)
  );
};

// Get todos that will expire soon
export const getExpiringTodos = (todos) => {
  return todos
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
};