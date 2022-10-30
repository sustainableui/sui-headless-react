import React from 'react';
import { SuiDisplayModes, SuiOptions } from '../../base/types';

type SuiProviderProps = SuiOptions & {
  LoaderComponent: React.ElementType<Record<string, unknown> & { onLocalizationCancel: () => void }>;
  loaderComponentProps?: Record<string, unknown>;
  SwitchComponent: React.FC<
    Record<string, unknown> & {
      displayMode: SuiDisplayModes;
      onDisplayModeSelect: (displayMode: SuiDisplayModes) => void;
    }
  >;
  switchComponentProps?: Record<string, unknown>;
  children: React.ReactNode | React.ReactNode[];
};

export type { SuiProviderProps };
