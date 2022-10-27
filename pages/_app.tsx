import SuiProvider from '../src/lib/sui';

function MyApp({ Component, pageProps }) {
  return (
    <SuiProvider>
      <Component {...pageProps} />
    </SuiProvider>
  );
}

export default MyApp;
