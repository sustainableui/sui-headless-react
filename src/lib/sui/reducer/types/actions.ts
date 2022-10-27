import DisplayModes from '../../types/displayModes';
import GridCarbonIntensity from '../../types/gridCarbonIntensity';

type Actions =
  | {
      type: 'select-display-mode';
      payload: DisplayModes;
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
      payload: GridCarbonIntensity;
    };

export default Actions;
