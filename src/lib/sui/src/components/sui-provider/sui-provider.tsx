import React from 'react';
import SuiLocalizationLoader from '../sui-localization-loader';
import SuiSwitch from '../sui-switch';
import { SuiConfig, SuiDisplayModes } from '../../base/types';
import useSui from '../../base/context/reducer';
import { SuiContext } from '../../base/context/sui-context';
import { SuiProviderProps } from './sui-provider.types';

const SUI_DEFAULT_CONFIG: SuiConfig = {
  gracefulDegradationThresholds: {
    [SuiDisplayModes.Low]: 350,
    [SuiDisplayModes.Moderate]: 150,
    [SuiDisplayModes.High]: 0,
  },
  localizationTimeout: 8000,
  userControlAllowed: true,
};

function SuiProvider({ config: customConfig, children }: SuiProviderProps) {
  const sui = useSui(customConfig, SUI_DEFAULT_CONFIG);

  if (sui.state.isLocalizationInProgress) {
    return (
      <SuiContext.Provider value={sui}>
        <SuiLocalizationLoader />
      </SuiContext.Provider>
    );
  }

  return (
    <SuiContext.Provider value={sui}>
      <SuiSwitch />
      {children}
    </SuiContext.Provider>
  );
}

export default SuiProvider;
