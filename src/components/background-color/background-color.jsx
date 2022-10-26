import { withSui } from '../../base/context/sui';
import s from './background-color.module.css';

function LowBackgroundColor() {
  return <main className={`${s.container} ${s.lowContainer}`} />;
}

function ModerateBackgroundColor() {
  return <main className={`${s.container} ${s.moderateContainer}`} />;
}

function HighBackgroundColor() {
  return <main className={`${s.container} ${s.highContainer}`} />;
}

export default withSui([LowBackgroundColor, ModerateBackgroundColor, HighBackgroundColor]);
