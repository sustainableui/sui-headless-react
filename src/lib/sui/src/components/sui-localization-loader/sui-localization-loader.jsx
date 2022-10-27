import { useSuiContext } from '../../base/context/suiContext';

function SuiLocalizationLoader() {
  const {
    handlers: { onLocalizationCancel },
  } = useSuiContext();

  function handleClick(event) {
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

export default SuiLocalizationLoader;
