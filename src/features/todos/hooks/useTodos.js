import { useState, useEffect, useCallback } from 'react';
import {
  addTodo,
  toggleTodo,
  editTodo,
  archiveTodo,
  restoreTodo,
  permanentDeleteTodo,
  getFilteredAndSortedTodos,
  getExpiringTodos,
  removeExpiredTodos,
  saveTodos,
  loadTodos,
  getDaysUntilDeletion,
  isStorageAvailable
} from '../utils';

// This hook needs to be exported as a named export
export function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos());
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc'); // Newest first by default
  const storageAvailable = isStorageAvailable();

  // Load todos on mount
  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    if (todos.length > 0 || localStorage.getItem('todos')) {
      saveTodos(todos);
    }
  }, [todos]);

  // Remove expired todos on mount and whenever todos change
  useEffect(() => {
    const updatedTodos = removeExpiredTodos(todos);
    if (updatedTodos.length !== todos.length) {
      setTodos(updatedTodos);
    }
  }, [todos]);

  // Calculate derived state
  const filteredAndSortedTodos = getFilteredAndSortedTodos(todos, filter, sortOrder);
  const archivedCount = todos.filter(todo => todo.archived).length;
  const expiringTodos = getExpiringTodos(todos);
  const expiringCount = expiringTodos.length;
  const activeTodoCount = todos.filter(todo => !todo.archived).length;

  // Todo handlers
  const handleAddTodo = useCallback(text => {
    setTodos(prevTodos => [...prevTodos, addTodo(text)]);
  }, []);

  const handleToggleTodo = useCallback(id => {
    setTodos(prevTodos => toggleTodo(prevTodos, id));
  }, []);

  const handleEditTodo = useCallback((id, text) => {
    setTodos(prevTodos => editTodo(prevTodos, id, text));
  }, []);

  const handleArchiveTodo = useCallback(id => {
    setTodos(prevTodos => archiveTodo(prevTodos, id));
  }, []);

  const handleRestoreTodo = useCallback(id => {
    setTodos(prevTodos => restoreTodo(prevTodos, id));
  }, []);

  const handlePermanentDeleteTodo = useCallback(id => {
    setTodos(prevTodos => permanentDeleteTodo(prevTodos, id));
  }, []);

  // View helpers
  const handleViewArchive = useCallback(() => {
    setFilter('archived');
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  return {
    todos,
    filteredAndSortedTodos,
    filter,
    setFilter,
    sortOrder,
    toggleSortOrder,
    archivedCount,
    expiringCount,
    activeTodoCount,
    expiringTodos,
    storageAvailable,
    handleAddTodo,
    handleToggleTodo,
    handleEditTodo,
    handleArchiveTodo,
    handleRestoreTodo,
    handlePermanentDeleteTodo,
    handleViewArchive,
    getDaysUntilDeletion
  };
}