// Re-export everything from the todos feature
export * from './todos';

// Re-export everything from the UI feature
export * from './ui';

// Export components directly from the feature root
export { default as TodoForm } from './TodoForm';
export { default as TodoList } from './todos/components/TodoList';
export { default as TodoStats } from './todos/components/TodoStats';
export { default as ExpirationNotice } from './todos/components/ExpirationNotice';
export { default as TodoFilters } from './todos/components/TodoFilters';

// Export constants
export { ARCHIVE_DURATION_DAYS } from './todos/utils/todoUtils';

// Export UI components
export { default as ThemeToggle } from './ui/components/ThemeToggle';
export { default as StatusBar } from './ui/components/StatusBar';
export { default as IconToggle } from './ui/components/IconToggle';

// Export hooks
export { useTodos } from './todos/hooks/useTodos';
export { useThemeUtils } from './ui/hooks/useThemeUtils';
export { useIconLibrary } from './ui/contexts/IconContext';