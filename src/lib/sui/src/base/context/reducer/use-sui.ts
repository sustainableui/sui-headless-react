import { useCallback, useReducer } from 'react';
import { SuiConfig, SuiDisplayModes, SuiGridCarbonIntensity } from '../../types';
import SUI_INITIAL_STATE from '../../constants/initialState';
import { Sui } from '../sui-context.types';
import useGridCarbonIntensity from './use-grid-carbon-intensity';
import { SuiActions, SuiState } from './types';
import { cancelLocalization, determineDisplayMode, selectDisplayMode, startLocalization } from './actions';

function suiReducer(state: SuiState, action: SuiActions): SuiState {
  switch (action.type) {
    case 'select-display-mode':
      return selectDisplayMode(state, action.payload);
    case 'start-localization':
      return startLocalization(state);
    case 'cancel-localization':
      return cancelLocalization(state, action.payload);
    case 'determine-display-mode':
      return determineDisplayMode(state, action.payload);
    default:
      throw new Error('Invalid action type');
  }
}

function suiReducerInit(initialState: SuiState, customConfig: SuiConfig, defaultConfig: SuiConfig): SuiState {
  return {
    ...initialState,
    config: {
      ...defaultConfig,
      ...customConfig,
    },
  };
}

function useSui(customConfig: SuiConfig, defaultConfig: SuiConfig): Sui {
  const [state, dispatch] = useReducer(suiReducer, SUI_INITIAL_STATE, initialState =>
    suiReducerInit(initialState, customConfig, defaultConfig),
  );

  const selectDisplayMode = useCallback(function (displayMode: SuiDisplayModes) {
    dispatch({ type: 'select-display-mode', payload: displayMode });
  }, []);

  const startLocalization = useCallback(function () {
    dispatch({
      type: 'start-localization',
    });
  }, []);

  const cancelLocalization = useCallback(function (reason: string = null) {
    dispatch({
      type: 'cancel-localization',
      payload: reason,
    });
  }, []);

  const determineDisplayMode = useCallback(function (gridCarbonIntensity: SuiGridCarbonIntensity) {
    dispatch({
      type: 'determine-display-mode',
      payload: gridCarbonIntensity,
    });
  }, []);

  useGridCarbonIntensity(startLocalization, cancelLocalization, determineDisplayMode, state.config.localizationTimeout);

  return {
    state: {
      ...state,
      isLocalizationInProgress: state.localization.status === 'in-progress',
    },
    handlers: {
      onLocalizationCancel: cancelLocalization,
      onDisplayModeSelect: selectDisplayMode,
    },
  };
}

export default useSui;
