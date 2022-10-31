import { localStorage } from '../constants';
import setLocalStorageValue from './setLocalStorageValue';

function setLocalStorageLocalizationTimestamp(localStorageId: string) {
  setLocalStorageValue(localStorageId, localStorage.localizationTimestampKey, new Date().getTime().toString());
}

export default setLocalStorageLocalizationTimestamp;
