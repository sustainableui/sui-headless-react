import React, { useContext } from 'react';

const SuiContext = React.createContext(undefined);
SuiContext.displayName = 'SuiContext';

function useSuiContext() {
  return useContext(SuiContext);
}

export { SuiContext, useSuiContext };
