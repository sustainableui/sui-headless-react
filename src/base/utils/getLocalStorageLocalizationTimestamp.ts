import { localStorage } from '../constants';
import getLocalStorageValue from './getLocalStorageValue';

function getLocalStorageDisplayMode(localStorageId: string): string | null {
  return getLocalStorageValue(localStorageId, localStorage.localizationTimestampKey);
}

export default getLocalStorageDisplayMode;
