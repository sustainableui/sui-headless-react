import SuiDisplayModes from '../types/suiDisplayModes';
import { SuiConfig, SuiGridCarbonIntensity } from '../types';

function getDisplayModeFromGridCarbonIntensity(gridCarbonIntensity: SuiGridCarbonIntensity, config: SuiConfig) {
  if (gridCarbonIntensity.value > config.gracefulDegradationThresholds[SuiDisplayModes.Low]) {
    return SuiDisplayModes.Low;
  }

  if (gridCarbonIntensity.value > config.gracefulDegradationThresholds[SuiDisplayModes.Moderate]) {
    return SuiDisplayModes.Moderate;
  }

  return SuiDisplayModes.High;
}

export default getDisplayModeFromGridCarbonIntensity;
