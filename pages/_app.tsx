import { SuiProvider } from '../src/lib/sui';

const SUI_API = '/api/grid-carbon-intensity';

function MyApp({ Component, pageProps }) {
  return (
    <SuiProvider api={SUI_API}>
      <Component {...pageProps} />
    </SuiProvider>
  );
}

export default MyApp;
