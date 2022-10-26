import React from 'react';
import { useSuiContext } from '../../base/context/sui';
import determineSuiComponent from '../../base/utils/determineSuiComponent';

export type SuiComponents = [React.ElementType, React.ElementType, React.ElementType];

function SuiComponentWrapper(props) {
  const {
    state: { displayMode },
  } = useSuiContext();

  const SuiComponent = determineSuiComponent(props.components, displayMode);

  return <SuiComponent {...props} />;
}

function withSui(components: SuiComponents) {
  return props => <SuiComponentWrapper components={components} {...props} />;
}

export default withSui;
