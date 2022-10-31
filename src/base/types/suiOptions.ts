import SuiApi from './suiApi';
import SuiCustomConfig from './suiCustomConfig';

interface SuiOptions {
  api: SuiApi;
  config?: SuiCustomConfig;
}

export default SuiOptions;
