import React from 'react';
import { SuiComponents } from '../../components/sui-component/sui-component.types';
import SuiDisplayModes from '../types/suiDisplayModes';

function determineSuiComponent(components: SuiComponents, displayMode: SuiDisplayModes): React.ElementType {
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

export default determineSuiComponent;
