import DisplayModes from '../../types/displayModes';
import Config from '../../types/config';
import GridCarbonIntensity from '../../types/gridCarbonIntensity';

interface State {
  displayMode?: DisplayModes;
  localization: {
    status: 'in-progress' | 'success' | 'failure' | 'cancelled';
    error: string;
  };
  gridCarbonIntensity: GridCarbonIntensity;
  config: Config;
}

export default State;
