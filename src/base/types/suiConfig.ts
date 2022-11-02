import SuiDisplayModes from './suiDisplayModes';

interface SuiConfig {
  gracefulDegradationThresholds: {
    [SuiDisplayModes.Low]: number;
    [SuiDisplayModes.Moderate]: number;
    [SuiDisplayModes.High]: number;
  };
  localizationTimeout: number;
  displayModeTimeout: number;
  localStorageId: string;
}

export default SuiConfig;
