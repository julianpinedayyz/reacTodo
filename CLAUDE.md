# CLAUDE.md - Guide for Agentic Coding Assistance

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Code Style Guidelines

### Imports
- React imports first, followed by third-party packages, then local imports
- Group imports by type, with a blank line between groups

### Component Structure
- Use functional components with hooks
- Use named exports for components
- Fragment syntax (`<>...</>`) for multiple elements

### Naming Conventions
- PascalCase for components and React files (`.jsx`)
- camelCase for variables, functions, and instances
- UPPER_SNAKE_CASE for constants

### Types
- Include prop types or TypeScript types for component props
- Use specific types over generic ones (e.g., `string[]` over `any[]`)

### Error Handling
- Use try/catch blocks for async operations
- Provide meaningful error messages to users

### ESLint Config Notes
- ECMAScript 2020 features supported
- React Hooks and React Refresh plugins configured
- Unused variables must be prefixed with uppercase letter or underscore