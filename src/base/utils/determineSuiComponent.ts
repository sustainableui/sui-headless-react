import { SuiDisplayModes } from '../../../pages/_app';

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

export default determineSuiComponent;
