import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProviders } from './AppProviders';
import { IconLibraryProvider } from './features/ui/contexts/IconContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IconLibraryProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </IconLibraryProvider>
  </React.StrictMode>
);

