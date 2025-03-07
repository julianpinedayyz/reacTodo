import { useIconLibrary } from '../features/ui';
import { SunIcon as OcticonSunIcon } from '@primer/octicons-react';
import { FaSun } from 'react-icons/fa';

function SunIcon({ size = 16 }) {
  const { useOcticons } = useIconLibrary();

  return useOcticons ? (
    <OcticonSunIcon size={size} />
  ) : (
    <FaSun size={size} />
  );
}

export default SunIcon;
