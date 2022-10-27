import SuiState from '../context/reducer/types/suiState';

const SUI_INITIAL_STATE: SuiState = {
  displayMode: null,
  localization: {
    status: null,
    error: null,
  },
  gridCarbonIntensity: {
    value: null,
    measurementRegion: null,
  },
  config: null,
};

export default SUI_INITIAL_STATE;
