import SuiState from '../types/suiState';
import SuiDisplayModes from '../../../types/suiDisplayModes';

function selectDisplayMode(state: SuiState, newDisplayMode: SuiDisplayModes): SuiState {
  return {
    ...state,
    displayMode: newDisplayMode,
  };
}

export default selectDisplayMode;
