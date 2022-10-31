import SuiState from '../types/suiState';
import SuiGridCarbonIntensity from '../../../types/suiGridCarbonIntensity';
import getDisplayModeFromGridCarbonIntensity from '../../../utils/getDisplayModeFromGridCarbonIntensity';

function determineDisplayMode(state: SuiState, gridCarbonIntensity: SuiGridCarbonIntensity): SuiState {
  return {
    ...state,
    displayMode: getDisplayModeFromGridCarbonIntensity(gridCarbonIntensity, state.config),
    gridCarbonIntensity,
    localization: {
      status: 'success',
      error: null,
    },
  };
}

export default determineDisplayMode;
