import { useCallback, useEffect, useReducer } from 'react';
import { SuiContext } from '../src/base/context/sui';
import SuiLocalizationLoader from '../src/components/sui-localization-loader';
import SuiSwitch from '../src/components/sui-switch';
import SuiDisplayModes from '../src/lib/sui/types/displayModes';
import SuiConfig from '../src/lib/sui/types/config';
import SuiState from '../src/lib/sui/reducer/types/state';
import Actions from '../src/lib/sui/reducer/types/actions';
import GridCarbonIntensity from '../src/lib/sui/types/gridCarbonIntensity';

const SUI_CONFIG: SuiConfig = {
  gracefulDegradationThresholds: {
    [SuiDisplayModes.Low]: 350,
    [SuiDisplayModes.Moderate]: 150,
    [SuiDisplayModes.High]: 0,
  },
  localizationTimeout: 8000,
  userControlAllowed: true,
};

const SUI_INITIAL_STATE: SuiState = {
  displayMode: null,
  localization: {
    status: null,
    error: null,
  },
  gridCarbonIntensity: {
    value: null,
    measurementRegion: null,
  },
  config: null,
};

function selectDisplayMode(state: SuiState, newDisplayMode: SuiDisplayModes): SuiState {
  return {
    ...state,
    displayMode: newDisplayMode,
  };
}

function startLocalization(state: SuiState): SuiState {
  return {
    ...state,
    localization: {
      status: 'in-progress',
      error: null,
    },
  };
}

function cancelLocalization(state: SuiState, reason?: string): SuiState {
  return {
    ...state,
    displayMode: SuiDisplayModes.Moderate,
    localization: {
      status: reason ? 'failure' : 'cancelled',
      error: reason || null,
    },
  };
}

function determineDisplayMode(state: SuiState, gridCarbonIntensity: GridCarbonIntensity): SuiState {
  if (gridCarbonIntensity.value > state.config.gracefulDegradationThresholds[SuiDisplayModes.Low]) {
    return {
      ...state,
      displayMode: SuiDisplayModes.Low,
      gridCarbonIntensity,
      localization: {
        status: 'success',
        error: null,
      },
    };
  }

  if (gridCarbonIntensity.value > state.config.gracefulDegradationThresholds[SuiDisplayModes.Moderate]) {
    return {
      ...state,
      displayMode: SuiDisplayModes.Moderate,
      gridCarbonIntensity,
      localization: {
        status: 'success',
        error: null,
      },
    };
  }

  return {
    ...state,
    displayMode: SuiDisplayModes.High,
    gridCarbonIntensity,
    localization: {
      status: 'success',
      error: null,
    },
  };
}

function suiReducer(state: SuiState, action: Actions): SuiState {
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

function useGridCarbonIntensityData(startLocalization, cancelLocalization, determineDisplayMode, localizationTimeout) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        startLocalization();

        const gridCarbonIntensityResponse = await fetch(
          `/api/grid-carbon-intensity?lat=${coords.latitude}&lon=${coords.longitude}`,
        );

        if (gridCarbonIntensityResponse.ok) {
          const data = await gridCarbonIntensityResponse.json();
          determineDisplayMode(data);
        } else {
          cancelLocalization(gridCarbonIntensityResponse.statusText);
        }
      },
      error => {
        cancelLocalization(error.message);
      },
      { timeout: localizationTimeout },
    );
  }, [startLocalization, cancelLocalization, determineDisplayMode, localizationTimeout]);
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

  const determineDisplayMode = useCallback(function (gridCarbonIntensity: GridCarbonIntensity) {
    dispatch({
      type: 'determine-display-mode',
      payload: gridCarbonIntensity,
    });
  }, []);

  useGridCarbonIntensityData(
    startLocalization,
    cancelLocalization,
    determineDisplayMode,
    state.config.localizationTimeout,
  );

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

function MyApp({ Component, pageProps }) {
  const sui = useSui(SUI_CONFIG);

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
      <Component {...pageProps} />
    </SuiContext.Provider>
  );
}

export default MyApp;
