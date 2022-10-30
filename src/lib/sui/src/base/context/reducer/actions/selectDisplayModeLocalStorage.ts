import { setLocalStorageDisplayMode } from '../../../utils';
import SuiState from '../types/suiState';
import SuiDisplayModes from '../../../types/suiDisplayModes';

function selectDisplayModeLocalStorage(state: SuiState, newDisplayMode: SuiDisplayModes) {
  setLocalStorageDisplayMode(state.config.localStorageId, newDisplayMode);
}

export default selectDisplayModeLocalStorage;
