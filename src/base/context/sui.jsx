import React, { useContext } from 'react';
import { SuiDisplayModes } from '../../../pages/_app';

const SuiContext = React.createContext(undefined);
SuiContext.displayName = 'SuiContext';

function useSuiContext() {
  return useContext(SuiContext);
}

function determineSuiComponent(components, displayMode) {
  switch (displayMode) {
    case SuiDisplayModes.Low:
      return components[0];
    case SuiDisplayModes.Moderate:
      return components[1];
    case SuiDisplayModes.High:
      return components[2];
    default:
      return components[1];
  }
}

function SuiComponentWrapper({ components, ...props }) {
  const {
    state: { displayMode },
  } = useSuiContext();

  const SuiComponent = determineSuiComponent(components, displayMode);

  return <SuiComponent {...props} />;
}

function withSui(components) {
  return props => <SuiComponentWrapper components={components} {...props} />;
}

export { SuiContext, useSuiContext, withSui };
