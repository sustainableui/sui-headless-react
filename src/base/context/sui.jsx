import React, { useContext } from 'react';

const SuiContext = React.createContext(undefined);
SuiContext.displayName = 'SuiContext';

function useSuiContext() {
  return useContext(SuiContext);
}

function determineSuiComponent(components, displayMode, displayModes) {
  switch (displayMode) {
    case displayModes.Low:
      return components[0];
    case displayModes.Moderate:
      return components[1];
    case displayModes.High:
      return components[2];
    default:
      return components[1];
  }
}

function SuiComponentWrapper({ components, ...props }) {
  const {
    state: { displayMode, config },
  } = useSuiContext();

  const SuiComponent = determineSuiComponent(components, displayMode, config.displayModes);

  return <SuiComponent {...props} />;
}

function withSui(components) {
  return props => <SuiComponentWrapper components={components} {...props} />;
}

export { SuiContext, useSuiContext, withSui };
