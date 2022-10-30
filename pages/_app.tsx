import { SuiProvider } from '../src/lib/sui';
import Loader from '../src/components/loader';
import Switch from '../src/components/switch';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function MyApp({ Component, pageProps }) {
  return (
    <SuiProvider api={process.env.NEXT_PUBLIC_SUI_API} LoaderComponent={Loader} SwitchComponent={Switch}>
      <Component {...pageProps} />
    </SuiProvider>
  );
}

export default MyApp;
