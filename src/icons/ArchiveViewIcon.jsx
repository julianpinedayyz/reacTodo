import { useIconLibrary } from '../features/ui';
import { ArchiveIcon } from '@primer/octicons-react';
import { FaArchive } from 'react-icons/fa';

function ArchiveViewIcon({ size = 16, className = '' }) {
  const { useOcticons } = useIconLibrary();

  return useOcticons ? (
    <ArchiveIcon size={size} className={className} />
  ) : (
    <FaArchive size={size} className={className} />
  );
}

export default ArchiveViewIcon;