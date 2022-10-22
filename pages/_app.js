import { useEffect, useState } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [gridIntensity, setGridIntensity] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const gridIntensityResponse = await fetch(`/api/grid-intensity?lat=${coords.latitude}&lon=${coords.longitude}`);
      const gridIntensity = await gridIntensityResponse.json();
      setGridIntensity(gridIntensity.value);
    });
  }, []);

  console.log(gridIntensity);

  return <Component {...pageProps} />;
}

export default MyApp;
