import SuiProvider from '../src/lib/sui/src/base/context/sui-provider';

function MyApp({ Component, pageProps }) {
  return (
    <SuiProvider>
      <Component {...pageProps} />
    </SuiProvider>
  );
}

export default MyApp;
