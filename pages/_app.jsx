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
    button: {
      [SuiDisplayModes.High]: 1,
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

// TODO: implement missing logic
// eslint-disable-next-line no-unused-vars
function determineDisplayModeFromGridCarbonIntensity(state, gridCarbonIntensity) {
  return { ...state, displayMode: SuiDisplayModes.Moderate };
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

function useSui() {
  const [state, dispatch] = useReducer(SuiReducer, SuiReducerInitialState);

  const selectModerateDisplayMode = useCallback(function () {
    dispatch({ type: SuiReducerActionTypes.SelectDisplayMode, payload: SuiDisplayModes.Moderate });
  }, []);

  const determineDisplayModeFromGridCarbonIntensity = useCallback(function (gridCarbonIntensity) {
    dispatch({ type: SuiReducerActionTypes.DetermineDisplayModeFromGridCarbonIntensity, payload: gridCarbonIntensity });
  }, []);

  useGridCarbonIntensity(determineDisplayModeFromGridCarbonIntensity);

  return {
    displayMode: state.displayMode,
    isPersonalizationInProgress: !state.displayMode,
    onPersonalizationCancel: selectModerateDisplayMode,
    config: SuiConfig,
  };
}

function MyApp({ Component, pageProps }) {
  const sui = useSui();
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
