import SuiDisplayModes from '../../../types/suiDisplayModes';
import SuiLocalization from '../../../types/suiLocalization';
import SuiGridCarbonIntensity from '../../../types/suiGridCarbonIntensity';
import SuiConfig from '../../../types/suiConfig';

interface SuiState {
  displayMode: SuiDisplayModes;
  localization: SuiLocalization;
  gridCarbonIntensity: SuiGridCarbonIntensity;
  config: SuiConfig;
}

export default SuiState;
