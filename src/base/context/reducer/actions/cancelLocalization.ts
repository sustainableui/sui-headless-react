import SuiState from '../types/suiState';
import SuiDisplayModes from '../../../types/suiDisplayModes';

function cancelLocalization(state: SuiState, reason?: string): SuiState {
  return {
    ...state,
    displayMode: SuiDisplayModes.Moderate,
    localization: {
      status: reason ? 'failure' : 'cancelled',
      error: reason || null,
    },
  };
}

export default cancelLocalization;
