const AZURE_REGIONS = require('./azure-regions.json');
const R = 6371e3;

function distance({ lat: lat1, lon: lon1 }, { lat: lat2, lon: lon2 }) {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  return Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R;
}

function getClosestAzureRegion(userCoords, azureRegions) {
  const azureRegionsDistances = azureRegions.map(azureRegion =>
    distance(userCoords, {
      lat: azureRegion.Latitude,
      lon: azureRegion.Longitude,
    }),
  );

  const closestAzureRegionDistance = Math.min(...azureRegionsDistances);

  const closestAzureRegionIndex = azureRegionsDistances.findIndex(
    azureRegionsDistance => azureRegionsDistance === closestAzureRegionDistance,
  );

  return azureRegions[closestAzureRegionIndex].RegionName;
}

async function handler(req, res) {
  const {
    query: { lat, lon },
  } = req;

  const closestAzureRegion = getClosestAzureRegion({ lat, lon }, AZURE_REGIONS);

  const gridIntensityResponse = await fetch(
    `https://carbon-aware-api.azurewebsites.net/emissions/bylocation?location=${closestAzureRegion}`,
  );

  if (gridIntensityResponse.status === 200) {
    const value = await gridIntensityResponse.json();
    res.status(200).json({ value: value[0].rating });
  } else {
    res.status(200).json({ value: null });
  }
}

export default handler;
