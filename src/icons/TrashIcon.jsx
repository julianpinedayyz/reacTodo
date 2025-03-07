import { useIconLibrary } from '../features/ui';
import { TrashIcon as OcticonTrashIcon } from '@primer/octicons-react';
import { FaTrashAlt } from 'react-icons/fa';

function TrashIcon({ size = 16 }) {
  const { useOcticons } = useIconLibrary();

  return useOcticons ? (
    <OcticonTrashIcon size={size} />
  ) : (
    <FaTrashAlt size={size} />
  );
}

export default TrashIcon;
