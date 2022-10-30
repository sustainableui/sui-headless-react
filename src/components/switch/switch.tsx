import { Button, ButtonGroup } from '@mui/material';
import { useSuiContext } from '../../lib/sui/src/base/context/sui-context';
import { SuiDisplayModes } from '../../lib/sui/src/base/types';

function getColor(displayMode) {
  switch (displayMode) {
    case SuiDisplayModes.Low:
      return 'error';
    case SuiDisplayModes.Moderate:
      return 'warning';
    case SuiDisplayModes.High:
      return 'success';
    default:
      throw new Error('Unsupported display mode');
  }
}

function Switch({ onDisplayModeSelect }) {
  const sui = useSuiContext();
  const { displayMode } = sui.state;

  function handleClick(displayMode) {
    return () => {
      onDisplayModeSelect(displayMode);
    };
  }

  return (
    <ButtonGroup variant="contained" color={getColor(displayMode)}>
      <Button disabled={displayMode === SuiDisplayModes.Low} onClick={handleClick(SuiDisplayModes.Low)}>
        Low
      </Button>
      <Button disabled={displayMode === SuiDisplayModes.Moderate} onClick={handleClick(SuiDisplayModes.Moderate)}>
        Moderate
      </Button>
      <Button disabled={displayMode === SuiDisplayModes.High} onClick={handleClick(SuiDisplayModes.High)}>
        High
      </Button>
    </ButtonGroup>
  );
}

export default Switch;
