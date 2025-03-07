# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Update filter buttons with Dracula theme colors
- Update TodoStats with archive information
- Implement archive system in App component
- Update StatusBar to show archive and expiration info
- Update TodoList to support archive functionality
- Enhance TodoItem with archive functionality
- Create ExpirationNotice component
- Update DeleteIcon to use archive icons
- Create TrashIcon component for permanent deletion
- Create RestoreIcon component for archived items
- Add filtering and sorting functionality to App
- Create TodoFilters component for filtering and sorting
- Enhanced PostCSS configuration with postcss-nested and postcss-preset-env plugins
- Added example CSS file demonstrating PostCSS features
- Created feature-based architecture for better scalability
- Added comprehensive ARCHITECTURE.md documentation
- Implemented barrel file pattern for simplified imports

### Fixed
- Improve contrast on Archive View back button
- Improve text contrast in StatusBar component
- Fix contrast issues in TodoStats component
- Improve button contrast in TodoFilters component
- Improve archive button styling
- Improve theme transition handling during app initialization

### Changed
- Updated AddIcon, MoonIcon, and SunIcon to support icon library switching
- Standardized all icon components to use the UI feature's public API
- Added ArchiveViewIcon component for archive view header
- Moved TodoFilters component from UI to todos feature for better code organization
- Updated all feature-related imports to use proper paths
- Consolidated icon imports to use barrel file
- Improved feature isolation between UI and todos features
- Restructured application to use feature modules (todos, ui)
- Consolidated imports using barrel files at various levels
- Refactored App.jsx to use the new modular structure

### Technical Improvements
- Improved code maintainability through focused feature modules
- Enhanced scalability by organizing related code together
- Better developer experience with simplified import patterns

### Documentation
- Update README with archive system details

### Style
- Clean up CSS to prevent background color conflicts

### Testing
- Implement test for rendering Todo App header
- Add test coverage for creating new todos
- Add test coverage for toggling todo completion status
- Implement test for archiving todos
