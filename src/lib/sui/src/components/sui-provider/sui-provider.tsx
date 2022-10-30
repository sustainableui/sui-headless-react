import React from 'react';
import SuiLoader from '../sui-loader';
import SuiSwitch from '../sui-switch';
import useSui from '../../base/context/reducer';
import { SuiContext } from '../../base/context/sui-context';
import SuiDisplayModes from '../../base/types/suiDisplayModes';
import { SuiProviderProps } from './sui-provider.types';

const SUI_DEFAULT_CONFIG = {
  gracefulDegradationThresholds: {
    [SuiDisplayModes.Low]: 350,
    [SuiDisplayModes.Moderate]: 150,
    [SuiDisplayModes.High]: 0,
  },
  localizationTimeout: 8000,
  userControlAllowed: true,
  displayModeTimeout: 12000,
  localStorageId: 'sui',
};

function SuiProvider({ api, config: customConfig, children }: SuiProviderProps) {
  const sui = useSui(api, customConfig, SUI_DEFAULT_CONFIG);

  if (sui.state.isLoading) {
    return (
      <SuiContext.Provider value={sui}>
        <SuiLoader />
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
