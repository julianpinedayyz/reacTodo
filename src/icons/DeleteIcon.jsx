import { useIconLibrary } from '../contexts/IconContext';
import { TrashIcon } from '@primer/octicons-react';
import { FaTrash } from 'react-icons/fa';

function DeleteIcon({ size = 16 }) {
  const { useOcticons } = useIconLibrary();

  return useOcticons ? (
    <TrashIcon size={size} />
  ) : (
    <FaTrash size={size} />
  );
}

export default DeleteIcon;
