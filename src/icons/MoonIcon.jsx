import { useIconLibrary } from '../features/ui';
import { MoonIcon as OcticonMoonIcon } from '@primer/octicons-react';
import { FaMoon } from 'react-icons/fa';

function MoonIcon({ size = 16 }) {
  const { useOcticons } = useIconLibrary();

  return useOcticons ? (
    <OcticonMoonIcon size={size} />
  ) : (
    <FaMoon size={size} />
  );
}

export default MoonIcon;
