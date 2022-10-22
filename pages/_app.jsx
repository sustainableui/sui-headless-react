import { useCallback, useEffect, useReducer } from 'react';
import { SuiContext } from '../src/base/context/sui';
import SuiPersonalizationLoader from '../src/components/sui-personalization-loader';
import SuiSwitch from '../src/components/sui-switch';
import '../styles/globals.css';

const SuiDisplayModes = {
  Low: 'low-display-mode',
  Moderate: 'moderate-display-mode',
  High: 'high-display-mode',
};

const SuiConfig = {
  thresholds: {
    [SuiDisplayModes.Low]: 350,
    [SuiDisplayModes.Moderate]: 150,
    [SuiDisplayModes.High]: 0,
  },
  displayModes: SuiDisplayModes,
  personalizationTimeoutLimit: 8000,
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
};

const SuiReducerActionTypes = {
  SelectDisplayMode: 'select-display-mode',
  DetermineDisplayModeFromGridCarbonIntensity: 'determine-display-mode-from-grid-carbon-intensity',
};

function selectDisplayMode(state, newDisplayMode) {
  return { ...state, displayMode: newDisplayMode };
}

function determineDisplayModeFromGridCarbonIntensity(state, gridCarbonIntensity) {
  if (gridCarbonIntensity > SuiConfig.thresholds[SuiDisplayModes.Low])
    return {
      ...state,
      displayMode: SuiDisplayModes.Low,
    };

  if (gridCarbonIntensity > SuiConfig.thresholds[SuiDisplayModes.Moderate])
    return {
      ...state,
      displayMode: SuiDisplayModes.Moderate,
    };

  return { ...state, displayMode: SuiDisplayModes.High };
}

function SuiReducer(state, action) {
  switch (action.type) {
    case SuiReducerActionTypes.SelectDisplayMode:
      return selectDisplayMode(state, action.payload);
    case SuiReducerActionTypes.DetermineDisplayModeFromGridCarbonIntensity:
      return determineDisplayModeFromGridCarbonIntensity(state, action.payload);
    default:
      throw new Error('Invalid action type');
  }
}

function useGridCarbonIntensity(determineDisplayModeFromGridCarbonIntensity) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const gridCarbonIntensityResponse = await fetch(
        `/api/grid-intensity?lat=${coords.latitude}&lon=${coords.longitude}`,
      );
      const gridCarbonIntensity = await gridCarbonIntensityResponse.json();
      determineDisplayModeFromGridCarbonIntensity(gridCarbonIntensity.value);
    });
  }, [determineDisplayModeFromGridCarbonIntensity]);
}

function useSui(config) {
  const [state, dispatch] = useReducer(SuiReducer, SuiReducerInitialState);

  const selectDisplayMode = useCallback(function (displayMode) {
    dispatch({ type: SuiReducerActionTypes.SelectDisplayMode, payload: displayMode });
  }, []);

  const determineDisplayModeFromGridCarbonIntensity = useCallback(function (gridCarbonIntensity) {
    dispatch({ type: SuiReducerActionTypes.DetermineDisplayModeFromGridCarbonIntensity, payload: gridCarbonIntensity });
  }, []);

  useGridCarbonIntensity(determineDisplayModeFromGridCarbonIntensity);

  return {
    displayMode: state.displayMode,
    isPersonalizationInProgress: !state.displayMode,
    onPersonalizationCancel: () => selectDisplayMode(config.displayModes.Moderate),
    onDisplayModeSelect: selectDisplayMode,
    config: SuiConfig,
  };
}

function MyApp({ Component, pageProps }) {
  const sui = useSui(SuiConfig);
  const { isPersonalizationInProgress, onPersonalizationCancel, config } = sui;

  if (isPersonalizationInProgress)
    return (
      <SuiPersonalizationLoader
        timeoutLimit={config.personalizationTimeoutLimit}
        onPersonalizationCancel={onPersonalizationCancel}
        onTimeoutExpired={onPersonalizationCancel}
      />
    );

  return (
    <SuiContext.Provider value={sui}>
      <SuiSwitch />
      <Component {...pageProps} />
    </SuiContext.Provider>
  );
}

export default MyApp;
