import SuiDisplayModes from '../types/suiDisplayModes';
import SuiState from './reducer/types/suiState';

interface Sui {
  state: SuiState;
  handlers: {
    onLocalizationCancel: () => void;
    onDisplayModeSelect: (displayMode: SuiDisplayModes) => void;
  };
}

export type { Sui };
