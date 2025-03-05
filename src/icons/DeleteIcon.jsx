import { useIconLibrary } from '../contexts/IconContext';
import { ArchiveIcon } from '@primer/octicons-react';
import { FaArchive } from 'react-icons/fa';

function DeleteIcon({ size = 16 }) {
  const { useOcticons } = useIconLibrary();

  return useOcticons ? (
    <ArchiveIcon size={size} />
  ) : (
    <FaArchive size={size} />
  );
}

export default DeleteIcon;
