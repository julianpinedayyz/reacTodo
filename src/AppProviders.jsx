import React from 'react';
import { IconLibraryProvider } from './features/ui/contexts/IconContext';

export function AppProviders({ children }) {
  return children; // Simply pass through children without wrapping in ThemeProvider
}