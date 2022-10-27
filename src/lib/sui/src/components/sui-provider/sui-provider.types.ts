import React from 'react';
import SuiConfig from '../../base/types/suiConfig';

interface SuiProviderProps {
  config?: SuiConfig;
  children: React.ReactNode | React.ReactNode[];
}

export type { SuiProviderProps };
