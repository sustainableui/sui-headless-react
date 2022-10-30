import React from 'react';
import SuiOptions from '../../base/types/suiOptions';

type SuiProviderProps = SuiOptions & {
  children: React.ReactNode | React.ReactNode[];
};

export type { SuiProviderProps };
