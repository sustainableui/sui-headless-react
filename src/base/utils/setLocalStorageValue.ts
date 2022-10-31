import getLocalStorageKey from './getLocalStorageKey';

function setLocalStorageValue(localStorageId: string, localStorageValueKey: string, localStorageValue: string): void {
  if (typeof window === 'undefined') return;
  const key = getLocalStorageKey(localStorageId, localStorageValueKey);
  window.localStorage.setItem(key, localStorageValue);
}

export default setLocalStorageValue;
