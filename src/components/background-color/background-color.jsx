import dynamic from 'next/dynamic';
import { withSui } from '../../lib/sui';

const LowBackgroundColor = dynamic(() => import('./sui/low-background-color'), {
  ssr: false,
});

const ModerateBackgroundColor = dynamic(() => import('./sui/moderate-background-color'), {
  ssr: false,
});

const HighBackgroundColor = dynamic(() => import('./sui/high-background-color'), {
  ssr: false,
});

export default withSui([LowBackgroundColor, ModerateBackgroundColor, HighBackgroundColor]);
