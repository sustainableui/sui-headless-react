import SuiState from '../types/suiState';
import SuiGridCarbonIntensity from '../../../types/suiGridCarbonIntensity';
import SuiDisplayModes from '../../../types/suiDisplayModes';

function determineDisplayMode(state: SuiState, gridCarbonIntensity: SuiGridCarbonIntensity): SuiState {
  if (gridCarbonIntensity.value > state.config.gracefulDegradationThresholds[SuiDisplayModes.Low]) {
    return {
      ...state,
      displayMode: SuiDisplayModes.Low,
      gridCarbonIntensity,
      localization: {
        status: 'success',
        error: null,
      },
    };
  }

  if (gridCarbonIntensity.value > state.config.gracefulDegradationThresholds[SuiDisplayModes.Moderate]) {
    return {
      ...state,
      displayMode: SuiDisplayModes.Moderate,
      gridCarbonIntensity,
      localization: {
        status: 'success',
        error: null,
      },
    };
  }

  return {
    ...state,
    displayMode: SuiDisplayModes.High,
    gridCarbonIntensity,
    localization: {
      status: 'success',
      error: null,
    },
  };
}

export default determineDisplayMode;
