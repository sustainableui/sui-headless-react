import { setLocalStorageDisplayMode, setLocalStorageLocalizationTimestamp } from '../../../utils';
import getDisplayModeFromGridCarbonIntensity from '../../../utils/getDisplayModeFromGridCarbonIntensity';
import SuiGridCarbonIntensity from '../../../types/suiGridCarbonIntensity';
import SuiState from '../types/suiState';

function determineDisplayModeLocalStorage(state: SuiState, gridCarbonIntensity: SuiGridCarbonIntensity) {
  const displayMode = getDisplayModeFromGridCarbonIntensity(gridCarbonIntensity, state.config);
  setLocalStorageDisplayMode(state.config.localStorageId, displayMode);
  setLocalStorageLocalizationTimestamp(state.config.localStorageId);
}

export default determineDisplayModeLocalStorage;
