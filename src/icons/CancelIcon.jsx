import { useIconLibrary } from '../features/ui';
import { XIcon } from '@primer/octicons-react';
import { FaTimes } from 'react-icons/fa';

function CancelIcon({ size = 16 }) {
  const { useOcticons } = useIconLibrary();

  return useOcticons ? (
    <XIcon size={size} />
  ) : (
    <FaTimes size={size} />
  );
}

export default CancelIcon;
