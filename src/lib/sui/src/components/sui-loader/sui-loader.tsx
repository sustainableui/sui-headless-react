import React from 'react';
import { useSuiContext } from '../../base/context/sui-context';

function SuiLoader() {
  const {
    handlers: { onLocalizationCancel },
  } = useSuiContext();

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    onLocalizationCancel();
  }

  return (
    <div>
      <p>Determining the best display mode for a given grid carbon intensity..</p>
      <p>This requires location data of your device, skipping if unable to get them</p>
      <button onClick={handleClick}>Skip personalization</button>
    </div>
  );
}

export default SuiLoader;
