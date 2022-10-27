import SuiDisplayModes from '../../types/displayModes';

enum SuiLocalizationStatus {
  InProgress,
  Success,
  Failure,
  Cancelled,
}

interface SuiState {
  displayMode?: SuiDisplayModes;
  localization: {
    status: SuiLocalizationStatus | null;
    error: string | null;
  };
  gridCarbonIntensity: {
    value: number | null;
    measurementRegion: string | null;
  };
}

export { SuiLocalizationStatus };

export default SuiState;
