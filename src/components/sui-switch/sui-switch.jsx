import { useSuiContext } from '../../base/context/sui';
import s from './sui-switch.module.css';

function SuiSwitch() {
  const {
    handlers: { onDisplayModeSelect },
    state: { displayMode: activeDisplayMode, config },
  } = useSuiContext();

  const { userControl, displayModes } = config;

  function handleClick(displayMode) {
    return event => {
      event.preventDefault();
      onDisplayModeSelect(displayMode);
    };
  }

  if (!userControl) return null;

  return (
    <div className={s.container}>
      {Object.keys(displayModes).map(displayModeKey => {
        const displayMode = displayModes[displayModeKey];
        return (
          <button key={displayMode} disabled={displayMode === activeDisplayMode} onClick={handleClick(displayMode)}>
            {displayMode}
          </button>
        );
      })}
    </div>
  );
}

export default SuiSwitch;
