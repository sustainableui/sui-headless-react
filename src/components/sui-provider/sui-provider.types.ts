import React from 'react';
import { SuiDisplayModes, SuiGridCarbonIntensity, SuiOptions } from '../../base/types';

type SuiProviderProps = SuiOptions & {
  LoaderComponent: React.FC<Record<string, unknown> & { onLocalizationCancel: () => void }>;
  loaderComponentProps?: Record<string, unknown>;
  SwitchComponent: React.FC<
    Record<string, unknown> & {
      gridCarbonIntensity: SuiGridCarbonIntensity;
      recommendedDisplayMode: SuiDisplayModes;
      displayMode: SuiDisplayModes;
      onDisplayModeSelect: (displayMode: SuiDisplayModes) => void;
    }
  >;
  switchComponentProps?: Record<string, unknown>;
  children: React.ReactNode | React.ReactNode[];
};

export type { SuiProviderProps };
