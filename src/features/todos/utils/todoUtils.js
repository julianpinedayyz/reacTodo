// Constants for the application
export const ARCHIVE_DURATION_DAYS = 30; // Days before permanent deletion
export const EXPIRATION_WARNING_DAYS = 7; // Show warnings for items expiring within this many days

// Import from the feature's own storage utils
import { saveToStorage, loadFromStorage } from './storageUtils';

// Todo creation
export function addTodo(text) {
  return {
    id: Date.now(),
    text,
    completed: false,
    archived: false,
    archivedAt: null
  };
}

// Todo manipulation functions
export function toggleTodo(todos, id) {
  return todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
}

export function editTodo(todos, id, text) {
  return todos.map(todo =>
    todo.id === id ? { ...todo, text } : todo
  );
}

export function archiveTodo(todos, id) {
  return todos.map(todo =>
    todo.id === id ? { ...todo, archived: true, archivedAt: Date.now() } : todo
  );
}

export function restoreTodo(todos, id) {
  return todos.map(todo =>
    todo.id === id ? { ...todo, archived: false, archivedAt: null } : todo
  );
}

export function deleteTodo(todos, id) {
  return todos.filter(todo => todo.id !== id);
}

// Function for permanently deleting todos from archive
export function permanentDeleteTodo(todos, id) {
  // This performs the same operation as deleteTodo, but semantically
  // represents permanent deletion from the archive
  return todos.filter(todo => todo.id !== id);
}

// Calculate days until permanent deletion
export function getDaysUntilDeletion(archivedTimestamp) {
  if (!archivedTimestamp) return null;

  const now = Date.now();
  const deletionTime = archivedTimestamp + (ARCHIVE_DURATION_DAYS * 24 * 60 * 60 * 1000);
  const daysLeft = Math.ceil((deletionTime - now) / (24 * 60 * 60 * 1000));

  return Math.max(0, daysLeft);
}

// Get todos that are about to expire from the archive
export function getExpiringTodos(todos) {
  if (!todos || !todos.length) return [];

  return todos.filter(todo => {
    if (!todo.archived || !todo.archivedAt) return false;

    const daysLeft = getDaysUntilDeletion(todo.archivedAt);
    return daysLeft !== null && daysLeft <= EXPIRATION_WARNING_DAYS;
  });
}

// Remove todos that have expired from archive
export function removeExpiredTodos(todos) {
  if (!todos || !todos.length) return [];

  const now = Date.now();
  return todos.filter(todo => {
    // Keep all non-archived todos
    if (!todo.archived || !todo.archivedAt) return true;

    // Check if the archived todo has expired
    const expirationTime = todo.archivedAt + (ARCHIVE_DURATION_DAYS * 24 * 60 * 60 * 1000);
    return now < expirationTime;
  });
}

// Storage related functions
export function saveTodos(todos) {
  saveToStorage('todos', todos);
  return todos;
}

export function loadTodos() {
  return loadFromStorage('todos', []);
}

// Todo filtering and sorting functions
export function filterTodos(todos, filter) {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed && !todo.archived);
    case 'completed':
      return todos.filter(todo => todo.completed && !todo.archived);
    case 'archived':
      return todos.filter(todo => todo.archived);
    case 'all':
    default:
      return todos.filter(todo => !todo.archived);
  }
}

export function sortTodos(todos, sortOrder) {
  return [...todos].sort((a, b) => {
    return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
  });
}

// Combined filtering and sorting function
export function getFilteredAndSortedTodos(todos, filter, sortOrder) {
  const filteredTodos = filterTodos(todos, filter);
  return sortTodos(filteredTodos, sortOrder);
}