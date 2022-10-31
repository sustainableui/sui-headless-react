import { useCallback, useReducer } from 'react';
import { SuiApi, SuiConfig, SuiCustomConfig, SuiDisplayModes, SuiGridCarbonIntensity } from '../../types';
import { initialState as SUI_INITIAL_STATE } from '../../constants';
import { Sui } from '../sui-context.types';
import { getLocalStorageDisplayMode, getLocalStorageLocalizationTimestamp, isDisplayModeStale } from '../../utils';
import useGridCarbonIntensity from './use-grid-carbon-intensity';
import { SuiActions, SuiState } from './types';
import { cancelLocalization, determineDisplayMode, selectDisplayMode, startLocalization } from './actions';
import { isSuiDisplayMode, isValidTimestamp } from './use-sui.types';
import useLocalStorageSync from './use-local-storage-sync';

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

function suiReducerInit(initialState: SuiState, customConfig: SuiCustomConfig, defaultConfig: SuiConfig): SuiState {
  const config: SuiConfig = {
    ...defaultConfig,
    ...customConfig,
  };

  let displayMode = initialState.displayMode;

  const localStorageLocalizationTimestamp = getLocalStorageLocalizationTimestamp(config.localStorageId);
  const localStorageDisplayMode = getLocalStorageDisplayMode(config.localStorageId);

  if (isValidTimestamp(localStorageLocalizationTimestamp) && isSuiDisplayMode(localStorageDisplayMode)) {
    if (!isDisplayModeStale(localStorageLocalizationTimestamp, config.displayModeTimeout)) {
      displayMode = localStorageDisplayMode;
    }
  }

  return {
    ...{ ...initialState, displayMode },
    config,
  };
}

function useSui(api: SuiApi, customConfig: SuiCustomConfig, defaultConfig: SuiConfig): Sui {
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

  useGridCarbonIntensity(
    api,
    state.displayMode !== null,
    {
      localizationTimeout: state.config.localizationTimeout,
    },
    {
      onLocalizationStart: startLocalization,
      onLocalizationSuccess: determineDisplayMode,
      onLocalizationFailure: cancelLocalization,
    },
  );

  useLocalStorageSync(state);

  return {
    state: {
      ...state,
      isLoading: state.displayMode === null,
    },
    handlers: {
      onLocalizationCancel: cancelLocalization,
      onDisplayModeSelect: selectDisplayMode,
    },
  };
}

export default useSui;
