import SuiDisplayModes from '../types/suiDisplayModes';
import { localStorage } from '../constants';
import setLocalStorageValue from './setLocalStorageValue';

function setLocalStorageDisplayMode(localStorageId: string, displayMode: SuiDisplayModes) {
  setLocalStorageValue(localStorageId, localStorage.displayModeKey, displayMode);
}

export default setLocalStorageDisplayMode;
