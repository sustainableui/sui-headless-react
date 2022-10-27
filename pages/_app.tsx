import { useCallback, useEffect, useReducer } from 'react';
import { SuiContext } from '../src/base/context/sui';
import SuiLocalizationLoader from '../src/components/sui-localization-loader';
import SuiSwitch from '../src/components/sui-switch';
import SuiDisplayModes from '../src/lib/sui/types/displayModes';
import SuiConfig from '../src/lib/sui/types/config';
import SuiState, { SuiLocalizationStatus } from '../src/lib/sui/reducer/types/state';
import SuiReducerActionTypes from '../src/lib/sui/reducer/types/actionTypes';

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
};

function selectDisplayMode(state, newDisplayMode) {
  return {
    ...state,
    displayMode: newDisplayMode,
  };
}

function startLocalization(state) {
  return { ...state, localizationStatus: SuiLocalizationStatus.InProgress, localizationError: null };
}

function cancelLocalization(state, reason) {
  return {
    ...state,
    displayMode: SuiDisplayModes.Moderate,
    localizationStatus: reason ? SuiLocalizationStatus.Failure : SuiLocalizationStatus.Cancelled,
    localizationError: reason || null,
  };
}

function determineDisplayMode(state, gridCarbonIntensityData) {
  if (gridCarbonIntensityData.value > state.config.thresholds[SuiDisplayModes.Low]) {
    return {
      ...state,
      displayMode: SuiDisplayModes.Low,
      gridCarbonIntensityData,
      localizationStatus: SuiLocalizationStatus.Success,
      localizationError: null,
    };
  }

  if (gridCarbonIntensityData.value > state.config.thresholds[SuiDisplayModes.Moderate]) {
    return {
      ...state,
      displayMode: SuiDisplayModes.Moderate,
      gridCarbonIntensityData,
      localizationStatus: SuiLocalizationStatus.Success,
      localizationError: null,
    };
  }

  return {
    ...state,
    displayMode: SuiDisplayModes.High,
    gridCarbonIntensityData,
    localizationStatus: SuiLocalizationStatus.Success,
    localizationError: null,
  };
}

function suiReducer(state, action) {
  switch (action.type) {
    case SuiReducerActionTypes.SelectDisplayMode:
      return selectDisplayMode(state, action.payload);
    case SuiReducerActionTypes.StartLocalization:
      return startLocalization(state);
    case SuiReducerActionTypes.CancelLocalization:
      return cancelLocalization(state, action.payload);
    case SuiReducerActionTypes.DetermineDisplayMode:
      return determineDisplayMode(state, action.payload);
    default:
      throw new Error('Invalid action type');
  }
}

function useGridCarbonIntensityData(startLocalization, cancelLocalization, determineDisplayMode, locationTimeout) {
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
      { timeout: locationTimeout },
    );
  }, [startLocalization, cancelLocalization, determineDisplayMode, locationTimeout]);
}

function useSui(config) {
  const [state, dispatch] = useReducer(suiReducer, SUI_INITIAL_STATE, initialState => ({
    ...initialState,
    config,
  }));

  const selectDisplayMode = useCallback(function (displayMode) {
    dispatch({ type: SuiReducerActionTypes.SelectDisplayMode, payload: displayMode });
  }, []);

  const startLocalization = useCallback(function () {
    dispatch({
      type: SuiReducerActionTypes.StartLocalization,
    });
  }, []);

  const cancelLocalization = useCallback(function (reason = null) {
    dispatch({
      type: SuiReducerActionTypes.CancelLocalization,
      payload: reason,
    });
  }, []);

  const determineDisplayMode = useCallback(function (gridCarbonIntensityData) {
    dispatch({
      type: SuiReducerActionTypes.DetermineDisplayMode,
      payload: gridCarbonIntensityData,
    });
  }, []);

  useGridCarbonIntensityData(startLocalization, cancelLocalization, determineDisplayMode, state.config.locationTimeout);

  return {
    state: {
      ...state,
      isLocalizationInProgress: state.localizationStatus === SuiLocalizationStatus.InProgress,
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
