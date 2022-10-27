import SuiDisplayModes from './suiDisplayModes';

interface SuiConfig {
  gracefulDegradationThresholds: {
    [SuiDisplayModes.Low]: number;
    [SuiDisplayModes.Moderate]: number;
    [SuiDisplayModes.High]: number;
  };
  userControlAllowed: boolean;
  localizationTimeout: number;
}

export default SuiConfig;
