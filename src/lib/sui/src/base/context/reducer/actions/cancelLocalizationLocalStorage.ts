import { setLocalStorageDisplayMode } from '../../../utils';
import SuiState from '../types/suiState';
import { SuiDisplayModes } from '../../../types';

function cancelLocalizationLocalStorage(state: SuiState) {
  setLocalStorageDisplayMode(state.config.localStorageId, SuiDisplayModes.Moderate);
}

export default cancelLocalizationLocalStorage;
