import { useState, useEffect } from 'react';

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
} from '../utils/todoUtils';

// Import storage utilities
import {
  isStorageAvailable,
  saveToStorage,
  loadFromStorage
} from '../utils/storageUtils';

/**
 * Custom hook for todo management
 * @returns {Object} Todo state and functions for managing todos
 */
export function useTodos() {
  // Initialize state from localStorage
  const [todos, setTodos] = useState(() => loadFromStorage('todos', []));
  const [storageAvailable, setStorageAvailable] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'archived'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' (newest first) or 'asc' (oldest first)

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

  // Calculate active todos count
  const activeTodoCount = todos.filter(todo => !todo.archived).length;

  // Get filtered and sorted todos
  const filteredAndSortedTodos = getFilteredAndSortedTodos(todos, filter, sortOrder);

  return {
    todos,
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
    handleAddTodo,
    handleToggleTodo,
    handleArchiveTodo,
    handleRestoreTodo,
    handlePermanentDeleteTodo,
    handleEditTodo,
    handleViewArchive,
    getDaysUntilDeletion
  };
}