# reacTodo - AI Collaborative Todo App

## 🤖 Built with AI Collaboration

This project demonstrates the power of human-AI collaboration in software development. The entire application was built through iterative conversations with advanced AI models like **Claude 3.7 Sonnet** and **GPT-4o**. This README itself was generated through the same collaborative process!

The code structure, component design, accessibility features, and visual styling were all developed through a conversational approach with AI, showing how developers can leverage these tools to accelerate development while maintaining high-quality code.

## 📝 Project Overview

reacTodo is a feature-rich, accessible React todo application with support for:

- Creating, editing, and deleting todo items
- Marking todos as complete/incomplete
- Sorting by recency and completion status
- Theme switching (light/dark modes)
- Icon library switching (Octicons/React Icons)
- Persistent storage using localStorage
- Full keyboard accessibility
- Responsive design

## 🚀 Features

- **Timestamp Display**: Each todo shows when it was created
- **Sorting**: Most recent todos at top, completed todos moved to bottom
- **Theme Toggle**: Switch between light and dark themes with Dracula-inspired colors
- **Icon Library Switching**: Toggle between GitHub Octicons and React Icons
- **Local Storage**: Todos persist across browser sessions
- **Accessibility**: Full keyboard navigation, ARIA attributes, screen reader support
- **Responsive Design**: Works on devices of all sizes

## 💾 Advanced Storage Implementation

The app features a sophisticated localStorage implementation:

- **Robust Storage Detection**: Automatically detects if localStorage is available in the user's browser
- **Graceful Fallbacks**: Functions normally even when localStorage is unavailable
- **User Feedback**: Transparently communicates storage availability status to users
- **Data Persistence**: Maintains todos, theme preferences, and icon library selections across sessions
- **Storage Security**: Safely handles potential storage errors and quota limitations
- **Optimized Saving**: Only writes to storage when data actually changes

## 🛠️ Technologies Used

- **React**: UI framework
- **Tailwind CSS**: Utility-first styling
- **React Icons**: Icon collection
- **Octicons**: GitHub's icon set
- **localStorage API**: For data persistence
- **React Context API**: For theme and icon management
