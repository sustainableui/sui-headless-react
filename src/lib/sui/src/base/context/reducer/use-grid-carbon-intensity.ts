import { useEffect } from 'react';
import { SuiApi, SuiGridCarbonIntensity } from '../../types';
import { UseGridCarbonIntensityHandlers, UseGridCarbonIntensityOptions } from './use-grid-carbon-intensity.types';

function useGridCarbonIntensity(
  api: SuiApi,
  skip: boolean,
  options: UseGridCarbonIntensityOptions,
  handlers: UseGridCarbonIntensityHandlers,
) {
  const { localizationTimeout: timeout } = options;
  const { onLocalizationStart, onLocalizationSuccess, onLocalizationFailure } = handlers;

  useEffect(() => {
    if (skip) return;
    onLocalizationStart();
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const gridCarbonIntensityResponse = await fetch(`${api}?lat=${coords.latitude}&lon=${coords.longitude}`);

        if (gridCarbonIntensityResponse.ok) {
          const data: SuiGridCarbonIntensity = await gridCarbonIntensityResponse.json();
          onLocalizationSuccess(data);
        } else {
          onLocalizationFailure(gridCarbonIntensityResponse.statusText);
        }
      },
      (error: GeolocationPositionError) => {
        onLocalizationFailure(error.message);
      },
      { timeout },
    );
  }, [skip, timeout, api, onLocalizationStart, onLocalizationSuccess, onLocalizationFailure]);
}

export default useGridCarbonIntensity;
