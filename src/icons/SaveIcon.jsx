import { useIconLibrary } from '../features/ui';
import { CheckIcon } from '@primer/octicons-react';
import { FaCheck } from 'react-icons/fa';

function SaveIcon({ size = 16 }) {
  const { useOcticons } = useIconLibrary();

  return useOcticons ? (
    <CheckIcon size={size} />
  ) : (
    <FaCheck size={size} />
  );
}

export default SaveIcon;
