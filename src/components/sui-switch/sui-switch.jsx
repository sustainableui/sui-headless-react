import { useSuiContext } from '../../base/context/sui';

function SuiSwitch() {
  const {
    onDisplayModeSelect,
    config: { userControl, displayModes },
  } = useSuiContext();

  function handleClick(displayMode) {
    return event => {
      event.preventDefault();
      onDisplayModeSelect(displayMode);
    };
  }

  if (!userControl) return null;

  return (
    <div>
      {Object.keys(displayModes).map(displayModeKey => (
        <button key={displayModes[displayModeKey]} onClick={handleClick(displayModes[displayModeKey])}>
          {displayModes[displayModeKey]}
        </button>
      ))}
    </div>
  );
}

export default SuiSwitch;
