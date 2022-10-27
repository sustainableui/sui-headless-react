import { SuiContext } from '../src/lib/sui/src/base/context/sui-context';
import SuiLocalizationLoader from '../src/lib/sui/src/components/sui-localization-loader';
import SuiSwitch from '../src/lib/sui/src/components/sui-switch';
import SuiDisplayModes from '../src/lib/sui/src/base/types/suiDisplayModes';
import SuiConfig from '../src/lib/sui/src/base/types/suiConfig';
import useSui from '../src/lib/sui/src/base/context/reducer';

const SUI_CONFIG: SuiConfig = {
  gracefulDegradationThresholds: {
    [SuiDisplayModes.Low]: 350,
    [SuiDisplayModes.Moderate]: 150,
    [SuiDisplayModes.High]: 0,
  },
  localizationTimeout: 8000,
  userControlAllowed: true,
};

function MyApp({ Component, pageProps }) {
  const sui = useSui(SUI_CONFIG);

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
      <Component {...pageProps} />
    </SuiContext.Provider>
  );
}

export default MyApp;
