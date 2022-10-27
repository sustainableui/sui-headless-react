import SuiLocalizationLoader from '../../components/sui-localization-loader';
import SuiSwitch from '../../components/sui-switch';
import useSui from './reducer';
import { SuiContext } from './sui-context';

function SuiProvider({ config, children }) {
  const sui = useSui(config);

  if (sui.state.isLocalizationInProgress) {
    return (
      <SuiContext.Provider value={sui}>
        <SuiLocalizationLoader />
      </SuiContext.Provider>
    );
  }

  return (
    <SuiContext.Provider value={sui}>
      <SuiSwitch />
      {children}
    </SuiContext.Provider>
  );
}

export default SuiProvider;
