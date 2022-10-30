function isDisplayModeStale(localStorageLocalizationTimestamp: string, displayModeTimeout: number): boolean {
  const now = new Date().getTime();
  const backThen = new Date(Number(localStorageLocalizationTimestamp)).getTime();
  return now - backThen >= displayModeTimeout;
}

export default isDisplayModeStale;
