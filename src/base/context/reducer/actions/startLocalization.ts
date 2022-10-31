import SuiState from '../types/suiState';

function startLocalization(state: SuiState): SuiState {
  return {
    ...state,
    localization: {
      status: 'in-progress',
      error: null,
    },
  };
}

export default startLocalization;
