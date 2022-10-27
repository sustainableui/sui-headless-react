import React, { useContext } from 'react';
import { Sui } from './sui-context.types';

const SuiContext = React.createContext<Sui>(undefined);
SuiContext.displayName = 'SuiContext';

function useSuiContext() {
  return useContext(SuiContext);
}

export { SuiContext, useSuiContext };
