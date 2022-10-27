import SuiDisplayModes from '../../../types/suiDisplayModes';
import SuiGridCarbonIntensity from '../../../types/suiGridCarbonIntensity';

type SuiActions =
  | {
      type: 'select-display-mode';
      payload: SuiDisplayModes;
    }
  | {
      type: 'start-localization';
    }
  | {
      type: 'cancel-localization';
      payload?: string;
    }
  | {
      type: 'determine-display-mode';
      payload: SuiGridCarbonIntensity;
    };

export default SuiActions;
