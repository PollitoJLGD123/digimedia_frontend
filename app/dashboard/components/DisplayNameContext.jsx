import { createContext } from 'react';

export const DisplayNameContext = createContext({
  displayName: 'Usuario',
  updateDisplayName: () => {},
});
