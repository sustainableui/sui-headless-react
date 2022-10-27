import React from 'react';
import SuiLocalizationLoader from '../../components/sui-localization-loader';
import SuiSwitch from '../../components/sui-switch';
import SuiConfig from '../types/suiConfig';
import SuiDisplayModes from '../types/suiDisplayModes';
import useSui from './reducer';
import { SuiContext } from './sui-context';
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
