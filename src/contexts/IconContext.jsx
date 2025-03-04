import { createContext, useState, useContext } from 'react';

const IconContext = createContext();

export function useIconLibrary() {
  return useContext(IconContext);
}

export function IconProvider({ children }) {
  const [useOcticons, setUseOcticons] = useState(true);

  const toggleIconLibrary = () => {
    setUseOcticons(prev => !prev);
  };

  return (
    <IconContext.Provider value={{ useOcticons, toggleIconLibrary }}>
      {children}
    </IconContext.Provider>
  );
}
