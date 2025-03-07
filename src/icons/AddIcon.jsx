import { useIconLibrary } from '../features/ui';
import { PlusIcon } from '@primer/octicons-react';
import { FaPlus } from 'react-icons/fa';

function AddIcon({ size = 16 }) {
  const { useOcticons } = useIconLibrary();

  return useOcticons ? (
    <PlusIcon size={size} />
  ) : (
    <FaPlus size={size} />
  );
}

export default AddIcon;
