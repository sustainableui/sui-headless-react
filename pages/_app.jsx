import { useCallback, useEffect, useReducer } from 'react';
import { SuiContext } from '../src/base/context/sui';
import SuiLocalizationLoader from '../src/components/sui-localization-loader';
import SuiSwitch from '../src/components/sui-switch';
import '../styles/globals.css';

const SuiDisplayModes = {
  Low: 'low',
  Moderate: 'moderate',
  High: 'high',
};

const SuiLocalizationStatus = {
  InProgress: 'in-progress',
  Success: 'success',
  Failure: 'failure',
  Cancelled: 'cancelled',
};

const SuiConfig = {
  thresholds: {
    [SuiDisplayModes.Low]: 350,
    [SuiDisplayModes.Moderate]: 150,
    [SuiDisplayModes.High]: 0,
  },
  displayModes: SuiDisplayModes,
  locationTimeout: 8000,
  userControl: true,
  gracefulDegradationTheme: {
    image: {
      [SuiDisplayModes.Low]: 1,
      [SuiDisplayModes.Moderate]: 2,
      [SuiDisplayModes.High]: 3,
    },
    video: {
      [SuiDisplayModes.Low]: 1,
      [SuiDisplayModes.Moderate]: 1,
      [SuiDisplayModes.High]: 2,
    },
    carousel: {
      [SuiDisplayModes.Low]: 1,
      [SuiDisplayModes.Moderate]: 2,
      [SuiDisplayModes.High]: 3,
    },
  },
};

const SuiReducerInitialState = {
  displayMode: null,
  gridCarbonIntensityData: {
    value: null,
    measurementRegion: null,
  },
  localizationStatus: null,
  localizationError: null,
  config: SuiConfig,
};

const SuiReducerActionTypes = {
  SelectDisplayMode: 'select-display-mode',
  StartLocalization: 'start-localization',
  CancelLocalization: 'cancel-localization',
  DetermineDisplayMode: 'determine-display-mode',
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
  if (gridCarbonIntensityData.value > SuiConfig.thresholds[SuiDisplayModes.Low])
    return {
      ...state,
      displayMode: SuiDisplayModes.Low,
      gridCarbonIntensityData,
      localizationStatus: SuiLocalizationStatus.Success,
      localizationError: null,
    };

  if (gridCarbonIntensityData.value > SuiConfig.thresholds[SuiDisplayModes.Moderate])
    return {
      ...state,
      displayMode: SuiDisplayModes.Moderate,
      gridCarbonIntensityData,
      localizationStatus: SuiLocalizationStatus.Success,
      localizationError: null,
    };

  return {
    ...state,
    displayMode: SuiDisplayModes.High,
    gridCarbonIntensityData,
    localizationStatus: SuiLocalizationStatus.Success,
    localizationError: null,
  };
}

function SuiReducer(state, action) {
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

function useSui() {
  const [state, dispatch] = useReducer(SuiReducer, SuiReducerInitialState);

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
    config: state.config,
  };
}

function MyApp({ Component, pageProps }) {
  const sui = useSui();

  if (sui.state.isLocalizationInProgress)
    return (
      <SuiContext.Provider value={sui}>
        <SuiLocalizationLoader />
      </SuiContext.Provider>
    );

  return (
    <SuiContext.Provider value={sui}>
      <SuiSwitch />
      <Component {...pageProps} />
    </SuiContext.Provider>
  );
}

export default MyApp;
