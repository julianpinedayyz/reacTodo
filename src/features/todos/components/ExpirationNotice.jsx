import { useState } from 'react';
import { useTheme, useIconLibrary } from '../../ui';
import { AlertIcon } from '@primer/octicons-react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ExpirationNotice = ({ expiringTodos, onViewArchive }) => {
  const { isDark } = useTheme();
  const { useOcticons } = useIconLibrary();
  const [dismissed, setDismissed] = useState(false);

  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  // Don't show anything if there are no expiring todos or notification was dismissed
  if (expiringTodos.length === 0 || dismissed) {
    return null;
  }

  return (
    <div
      className={`mb-4 p-3 rounded-md border ${
        themeClass(
          'bg-dracula-red bg-opacity-10 border-dracula-red',
          'bg-light-red bg-opacity-10 border-light-red'
        )
      }`}
      role="alert"
    >
      <div className="flex items-center">
        {useOcticons ? (
          <AlertIcon className={`mr-2 ${themeClass('text-dracula-red', 'text-light-red')}`} size={16} />
        ) : (
          <FaExclamationTriangle className={`mr-2 ${themeClass('text-dracula-red', 'text-light-red')}`} size={16} />
        )}
        <div className="flex-1">
          <p className={`font-medium ${themeClass('text-dracula-red', 'text-light-red')}`}>
            {expiringTodos.length === 1
              ? '1 archived task is about to be permanently deleted'
              : `${expiringTodos.length} archived tasks are about to be permanently deleted`}
          </p>
          <p className="text-sm mt-1">
            {expiringTodos.length === 1
              ? 'Review it in the archive to restore if needed.'
              : 'Review them in the archive to restore any important tasks.'}
          </p>
        </div>
        <div className="flex ml-4 gap-2">
          <button
            onClick={onViewArchive}
            className={`px-3 py-1.5 text-xs rounded-md ${
              themeClass(
                'bg-dracula-red text-dracula-foreground hover:bg-opacity-80',
                'bg-light-red text-white hover:bg-opacity-80'
              )
            }`}
          >
            View Archive
          </button>
          <button
            onClick={() => setDismissed(true)}
            className={`px-3 py-1.5 text-xs rounded-md ${
              themeClass(
                'bg-dracula-comment text-dracula-foreground hover:bg-opacity-80',
                'bg-light-comment text-white hover:bg-opacity-80'
              )
            }`}
            aria-label="Dismiss notification"
          >
            Dismiss
          </button>
        </div>
      </div>
      {/* Show brief details about expiring tasks */}
      {expiringTodos.length > 0 && (
        <div className="mt-2 text-sm max-h-24 overflow-y-auto">
          <ul className="list-disc pl-5 space-y-1">
            {expiringTodos.map((todo) => (
              <li key={todo.id} className="truncate">
                <span className={themeClass('text-dracula-foreground', 'text-light-foreground')}>
                  {todo.text}
                </span>
                <span className={`ml-2 ${themeClass('text-dracula-red', 'text-light-red')}`}>
                  {todo.daysLeft === 0
                    ? '(expires today)'
                    : `(expires in ${todo.daysLeft} day${todo.daysLeft > 1 ? 's' : ''})`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExpirationNotice;