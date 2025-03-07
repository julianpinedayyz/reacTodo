import { useIconLibrary } from '../features/ui';
import { PencilIcon } from '@primer/octicons-react';
import { FaPencilAlt } from 'react-icons/fa';

function EditIcon({ size = 16 }) {
  const { useOcticons } = useIconLibrary();

  return useOcticons ? (
    <PencilIcon size={size} />
  ) : (
    <FaPencilAlt size={size} />
  );
}

export default EditIcon;
