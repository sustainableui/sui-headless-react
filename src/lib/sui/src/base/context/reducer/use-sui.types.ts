import { SuiDisplayModes } from '../../types';

function isValidTimestamp(localStorageLocalizationTimestamp) {
  return new Date(Number(localStorageLocalizationTimestamp)).getTime() > 0;
}

function isSuiDisplayMode(localStorageDisplayMode): localStorageDisplayMode is SuiDisplayModes {
  return (
    localStorageDisplayMode === SuiDisplayModes.Low ||
    localStorageDisplayMode === SuiDisplayModes.Moderate ||
    localStorageDisplayMode === SuiDisplayModes.High
  );
}

export { isValidTimestamp, isSuiDisplayMode };
