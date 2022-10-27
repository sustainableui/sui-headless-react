import SuiDisplayModes from '../src/lib/sui/src/base/types/suiDisplayModes';
import SuiConfig from '../src/lib/sui/src/base/types/suiConfig';
import SuiProvider from '../src/lib/sui/src/base/context/sui-provider';

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
  return (
    <SuiProvider config={SUI_CONFIG}>
      <Component {...pageProps} />
    </SuiProvider>
  );
}

export default MyApp;
