import React from 'react';
import { useSuiContext } from '../../base/context/sui';
import determineSuiComponent from '../../base/utils/determineSuiComponent';

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

export default withSui;
