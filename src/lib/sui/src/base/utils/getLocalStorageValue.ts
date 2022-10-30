import getLocalStorageKey from './getLocalStorageKey';

function getLocalStorageValue(localStorageId: string, localStorageValueKey: string): string | null {
  if (typeof window === 'undefined') return null;
  const key = getLocalStorageKey(localStorageId, localStorageValueKey);
  return window.localStorage.getItem(key);
}

export default getLocalStorageValue;
