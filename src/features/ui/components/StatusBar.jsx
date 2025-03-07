import { useThemeUtils } from '../hooks/useThemeUtils';
import { useIconLibrary } from '../contexts/IconContext';

function StatusBar({ storageAvailable, todoCount, archivedCount = 0, expiringCount = 0 }) {
  const { themeClass } = useThemeUtils();
  const { icons } = useIconLibrary();

  // Get icons from the library
  const CheckIcon = icons.check || icons.checkCircle;
  const ErrorIcon = icons.error || icons.xCircle;
  const ListIcon = icons.list || icons.listOrdered;
  const ArchiveIcon = icons.archive || icons.box;
  const WarningIcon = icons.warning || icons.alert;

  return (
    <footer className={`mt-6 pt-4 border-t text-xs ${themeClass('border-dracula-comment text-dracula-comment', 'border-t border-light-comment text-light-comment')}`}>
      <div className="flex justify-between items-center">
        {/* Improve contrast for status text */}
        <div className="flex items-center">
          {storageAvailable ? (
            <>
              <CheckIcon size={14} className={themeClass('text-dracula-green', 'text-light-green')} />
              <span className={`ml-1 ${themeClass('text-dracula-foreground', 'text-light-foreground')}`}>
                Storage available
              </span>
            </>
          ) : (
            <>
              <ErrorIcon size={14} className={themeClass('text-dracula-red', 'text-light-red')} />
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
                  <WarningIcon size={14} className={themeClass('text-dracula-red', 'text-light-red')} />
                  <span className={`ml-1 ${themeClass('text-dracula-foreground', 'text-light-foreground')}`}>
                    {expiringCount} expiring soon
                  </span>
                </>
              ) : (
                <>
                  <ArchiveIcon size={14} className={themeClass('text-dracula-red', 'text-light-red')} />
                  <span className={`ml-1 ${themeClass('text-dracula-foreground', 'text-light-foreground')}`}>
                    {archivedCount} archived
                  </span>
                </>
              )}
            </div>
          )}
          {storageAvailable && (
            <div className="flex items-center">
              <ListIcon size={14} className={themeClass('text-dracula-purple', 'text-light-purple')} />
              <span className={`ml-1 ${themeClass('text-dracula-foreground', 'text-light-foreground')}`}>
                {todoCount} {todoCount === 1 ? 'item' : 'items'}
              </span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default StatusBar;