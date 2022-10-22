import React, { useContext } from 'react';

const SuiContext = React.createContext(undefined);
SuiContext.displayName = 'SUI Context';

function useSuiContext() {
  return useContext(SuiContext);
}

export { SuiContext, useSuiContext };
