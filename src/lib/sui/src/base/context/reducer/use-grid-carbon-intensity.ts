import { useEffect } from 'react';

function useGridCarbonIntensity(startLocalization, cancelLocalization, determineDisplayMode, localizationTimeout) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        startLocalization();

        const gridCarbonIntensityResponse = await fetch(
          `/api/grid-carbon-intensity?lat=${coords.latitude}&lon=${coords.longitude}`,
        );

        if (gridCarbonIntensityResponse.ok) {
          const data = await gridCarbonIntensityResponse.json();
          determineDisplayMode(data);
        } else {
          cancelLocalization(gridCarbonIntensityResponse.statusText);
        }
      },
      error => {
        cancelLocalization(error.message);
      },
      { timeout: localizationTimeout },
    );
  }, [startLocalization, cancelLocalization, determineDisplayMode, localizationTimeout]);
}

export default useGridCarbonIntensity;
