import React from 'react';
import { useSuiContext } from '../../base/context/sui-context';
import determineSuiComponent from '../../base/utils/determineSuiComponent';
import { SuiComponents } from './sui-component.types';

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
