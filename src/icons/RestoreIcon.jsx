import { useIconLibrary } from '../contexts/IconContext';
import { ReplyIcon } from '@primer/octicons-react';
import { FaReply } from 'react-icons/fa';

function RestoreIcon({ size = 16 }) {
  const { useOcticons } = useIconLibrary();

  return useOcticons ? (
    <ReplyIcon size={size} />
  ) : (
    <FaReply size={size} />
  );
}

export default RestoreIcon;
