import { useCallback, useReducer } from 'react';
import SuiConfig from '../../types/suiConfig';
import SuiDisplayModes from '../../types/suiDisplayModes';
import SuiGridCarbonIntensity from '../../types/suiGridCarbonIntensity';
import SUI_INITIAL_STATE from '../../constants/initialState';
import useGridCarbonIntensity from './use-grid-carbon-intensity';
import SuiState from './types/suiState';
import SuiActions from './types/suiActions';
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

function useSui(config: SuiConfig) {
  const [state, dispatch] = useReducer(
    suiReducer,
    SUI_INITIAL_STATE,
    (initialState: SuiState): SuiState => ({
      ...initialState,
      config,
    }),
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
