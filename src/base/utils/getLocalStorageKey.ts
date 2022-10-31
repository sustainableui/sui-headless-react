function getLocalStorageKey(localStorageId: string, localStorageValueKey: string): string {
  return `${localStorageId}_${localStorageValueKey}`;
}

export default getLocalStorageKey;
