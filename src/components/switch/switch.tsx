import { Button, ButtonGroup, Typography } from '@mui/material';
import { SuiDisplayModes, SuiGridCarbonIntensity } from '../../lib/sui/src/base/types';

function getColor(displayMode) {
  switch (displayMode) {
    case SuiDisplayModes.Low:
      return 'success';
    case SuiDisplayModes.Moderate:
      return 'warning';
    case SuiDisplayModes.High:
      return 'error';
    default:
      throw new Error('Unsupported display mode');
  }
}

interface SwitchProps {
  displayMode: SuiDisplayModes;
  recommendedDisplayMode: SuiDisplayModes;
  gridCarbonIntensity: SuiGridCarbonIntensity;
  onDisplayModeSelect: (newDisplayMode: SuiDisplayModes) => void;
}

function Switch({ displayMode, recommendedDisplayMode, gridCarbonIntensity, onDisplayModeSelect }: SwitchProps) {
  const gridCarbonIntensityDataExists = gridCarbonIntensity.value && gridCarbonIntensity.measurementRegion;

  function handleClick(newDisplayMode: SuiDisplayModes) {
    return event => {
      event.preventDefault();
      onDisplayModeSelect(newDisplayMode);
    };
  }

  return (
    <>
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
      {gridCarbonIntensityDataExists && (
        <Typography>
          We recommend using {recommendedDisplayMode} for {gridCarbonIntensity.measurementRegion} region with{' '}
          {gridCarbonIntensity.value} CO2e.
        </Typography>
      )}
      {!gridCarbonIntensityDataExists && (
        <Typography>
          We recommend providing location so that UI can be adjusted to actual grid carbon intensity situation.
        </Typography>
      )}
    </>
  );
}

export default Switch;
