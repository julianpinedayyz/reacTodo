import { useTheme } from '../contexts/ThemeContext';
import { useIconLibrary } from '../contexts/IconContext';
import { CheckCircleIcon, XCircleIcon, ListOrderedIcon, ArchiveIcon, AlertIcon } from '@primer/octicons-react';
import { FaCheckCircle, FaTimesCircle, FaListOl, FaArchive, FaExclamationTriangle } from 'react-icons/fa';

const StatusBar = ({ storageAvailable, todoCount, archivedCount = 0, expiringCount = 0 }) => {
  const { isDark } = useTheme();
  const { useOcticons } = useIconLibrary();

  const themeClass = (darkClass, lightClass) => isDark ? darkClass : lightClass;

  return (
    <footer className={`mt-6 pt-3 text-xs ${themeClass('border-t border-dracula-comment', 'border-t border-light-comment')}`}>
      <div className="flex justify-between items-center">
        {/* Improve contrast for status text */}
        <div className="flex items-center">
          {storageAvailable ? (
            <>
              {useOcticons ? (
                <CheckCircleIcon size={14} className={themeClass('text-dracula-green', 'text-light-green')} />
              ) : (
                <FaCheckCircle size={14} className={themeClass('text-dracula-green', 'text-light-green')} />
              )}
              <span className={`ml-1 ${themeClass('text-dracula-foreground', 'text-light-foreground')}`}>
                Storage available
              </span>
            </>
          ) : (
            <>
              {useOcticons ? (
                <XCircleIcon size={14} className={themeClass('text-dracula-red', 'text-light-red')} />
              ) : (
                <FaTimesCircle size={14} className={themeClass('text-dracula-red', 'text-light-red')} />
              )}
              <span className={`ml-1 ${themeClass('text-dracula-foreground', 'text-light-foreground')}`}>
                Storage unavailable
              </span>
            </>
          )}
        </div>

        <div className="flex gap-3">
          {archivedCount > 0 && (
            <div className="flex items-center">
              {expiringCount > 0 ? (
                <>
                  {useOcticons ? (
                    <AlertIcon size={14} className={themeClass('text-dracula-red', 'text-light-red')} />
                  ) : (
                    <FaExclamationTriangle size={14} className={themeClass('text-dracula-red', 'text-light-red')} />
                  )}
                  <span className={`ml-1 ${themeClass('text-dracula-foreground', 'text-light-foreground')}`}>
                    {expiringCount} expiring soon
                  </span>
                </>
              ) : (
                <>
                  {useOcticons ? (
                    <ArchiveIcon size={14} className={themeClass('text-dracula-red', 'text-light-red')} />
                  ) : (
                    <FaArchive size={14} className={themeClass('text-dracula-red', 'text-light-red')} />
                  )}
                  <span className={`ml-1 ${themeClass('text-dracula-foreground', 'text-light-foreground')}`}>
                    {archivedCount} archived
                  </span>
                </>
              )}
            </div>
          )}

          {storageAvailable && (
            <div className="flex items-center">
              {useOcticons ? (
                <ListOrderedIcon size={14} className={themeClass('text-dracula-purple', 'text-light-purple')} />
              ) : (
                <FaListOl size={14} className={themeClass('text-dracula-purple', 'text-light-purple')} />
              )}
              <span className={`ml-1 ${themeClass('text-dracula-foreground', 'text-light-foreground')}`}>
                {todoCount} {todoCount === 1 ? 'item' : 'items'}
              </span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
