# reacTodo Architecture

This document describes the high-level architecture of reacTodo.

## Directory Structure

```
src/
├── features/           # Feature-based organization
│   ├── todos/         # Todo management feature
│   │   ├── components/    # Todo-specific components
│   │   ├── hooks/        # Todo-specific hooks
│   │   └── utils/        # Todo-specific utilities
│   └── ui/            # UI/Theme feature
│       ├── components/    # UI components
│       ├── contexts/     # Theme and icon contexts
│       └── hooks/        # UI-specific hooks
├── components/        # Shared components (if any)
├── contexts/         # App-level contexts (if any)
├── hooks/           # App-level hooks (if any)
├── utils/           # App-level utilities
└── icons/           # Shared icon components
```

## Feature Organization

The application is organized around features, with each feature containing its own components, hooks, utilities, and other related code. This organization promotes:

- Modularity: Each feature is self-contained
- Scalability: New features can be added without affecting existing ones
- Maintainability: Related code is co-located
- Reusability: Features can be shared across projects

### Todo Feature

The `todos` feature contains everything related to todo management:
- Components: TodoList, TodoItem, TodoForm, etc.
- Hooks: useTodos for todo state management
- Utils: Todo-related utilities and constants

### UI Feature

The `ui` feature manages the application's user interface:
- Components: ThemeToggle, StatusBar, IconToggle
- Contexts: Theme and icon library management
- Hooks: UI-specific hooks like useThemeUtils

## Shared Code

Code that is used across multiple features or is truly application-wide lives in the root src/ directories:
- components/: Shared components
- contexts/: Application-level contexts
- hooks/: Shared hooks
- utils/: Shared utilities
- icons/: Shared icon components

## Best Practices

1. Keep features isolated: New code should live in its feature directory
2. Minimize cross-feature dependencies
3. Use index files for clean exports
4. Keep shared code to a minimum