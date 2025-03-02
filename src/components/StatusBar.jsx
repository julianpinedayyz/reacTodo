import { useTheme } from '../contexts/ThemeContext';

function StatusBar({ storageAvailable, todoCount }) {
  const { isDark } = useTheme();

  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  return (
    <footer className={`mt-8 pt-4 border-t text-xs ${themeClass('border-dracula-comment text-dracula-comment', 'border-light-comment text-light-comment')}`} role="contentinfo">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2" aria-live="polite">
          <span id="storage-status-label">Storage:</span>
          {storageAvailable ? (
            <span
              className={`px-2 py-1 rounded-md flex items-center ${themeClass('bg-dracula-currentLine text-dracula-green', 'bg-light-currentLine text-light-green')}`}
              role="status"
              aria-labelledby="storage-status-label"
            >
              <span className={`w-2 h-2 rounded-full mr-1 ${themeClass('bg-dracula-green', 'bg-light-green')}`} aria-hidden="true"></span>
              Available
            </span>
          ) : (
            <span
              className={`px-2 py-1 rounded-md flex items-center ${themeClass('bg-dracula-currentLine text-dracula-red', 'bg-light-currentLine text-light-red')}`}
              role="alert"
              aria-labelledby="storage-status-label"
            >
              <span className={`w-2 h-2 rounded-full mr-1 ${themeClass('bg-dracula-red', 'bg-light-red')}`} aria-hidden="true"></span>
              Unavailable
            </span>
          )}
        </div>

        {storageAvailable && (
          <div className="flex items-center gap-2" aria-live="polite">
            <span id="stored-todos-label">Stored todos:</span>
            <span
              className={`px-2 py-1 rounded-md ${themeClass('bg-dracula-currentLine text-dracula-cyan', 'bg-light-currentLine text-light-cyan')}`}
              aria-labelledby="stored-todos-label"
            >
              {todoCount}
            </span>
          </div>
        )}
      </div>
    </footer>
  );
}

export default StatusBar;
