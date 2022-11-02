import React from 'react';
import useSui from '../../base/context/reducer';
import { SuiContext } from '../../base/context/sui-context';
import SuiDisplayModes from '../../base/types/suiDisplayModes';
import getDisplayModeFromGridCarbonIntensity from '../../base/utils/getDisplayModeFromGridCarbonIntensity';
import { SuiProviderProps } from './sui-provider.types';

const SUI_DEFAULT_CONFIG = {
  gracefulDegradationThresholds: {
    [SuiDisplayModes.Low]: 350,
    [SuiDisplayModes.Moderate]: 150,
    [SuiDisplayModes.High]: 0,
  },
  localizationTimeout: 8000,
  displayModeTimeout: 12000,
  localStorageId: 'sui',
};

function SuiProvider({
  api,
  LoaderComponent,
  loaderComponentProps = {},
  SwitchComponent,
  switchComponentProps = {},
  config: customConfig,
  children,
}: SuiProviderProps) {
  const sui = useSui(api, customConfig, SUI_DEFAULT_CONFIG);

  const {
    handlers: { onDisplayModeSelect, onLocalizationCancel },
    state: { config, displayMode, gridCarbonIntensity },
  } = sui;

  if (sui.state.isLoading) {
    return (
      <SuiContext.Provider value={sui}>
        <LoaderComponent {...loaderComponentProps} onLocalizationCancel={onLocalizationCancel} />
      </SuiContext.Provider>
    );
  }

  return (
    <SuiContext.Provider value={sui}>
      <SwitchComponent
        {...switchComponentProps}
        recommendedDisplayMode={getDisplayModeFromGridCarbonIntensity(gridCarbonIntensity, config)}
        gridCarbonIntensity={gridCarbonIntensity}
        displayMode={displayMode}
        onDisplayModeSelect={onDisplayModeSelect}
      />
      {children}
    </SuiContext.Provider>
  );
}

export default SuiProvider;
