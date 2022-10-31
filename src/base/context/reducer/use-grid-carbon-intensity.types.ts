import { SuiConfig, SuiGridCarbonIntensity } from '../../types';

type UseGridCarbonIntensityOptions = Pick<SuiConfig, 'localizationTimeout'>;

type UseGridCarbonIntensityHandlers = {
  onLocalizationStart: () => void;
  onLocalizationSuccess: (data: SuiGridCarbonIntensity) => void;
  onLocalizationFailure: (reason?: string) => void;
};

export type { UseGridCarbonIntensityOptions, UseGridCarbonIntensityHandlers };
