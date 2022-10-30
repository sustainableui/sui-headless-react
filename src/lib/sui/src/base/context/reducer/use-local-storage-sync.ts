import { useEffect } from 'react';
import { setLocalStorageDisplayMode, setLocalStorageLocalizationTimestamp } from '../../utils';
import SuiState from './types/suiState';

function useLocalStorageSync(state: SuiState) {
  useEffect(() => {
    if (state.displayMode === null) return;
    setLocalStorageDisplayMode(state.config.localStorageId, state.displayMode);
  }, [state.config.localStorageId, state.displayMode]);

  useEffect(() => {
    if (state.gridCarbonIntensity.value === null) return;
    setLocalStorageLocalizationTimestamp(state.config.localStorageId);
  }, [state.config.localStorageId, state.gridCarbonIntensity.value]);
}

export default useLocalStorageSync;
