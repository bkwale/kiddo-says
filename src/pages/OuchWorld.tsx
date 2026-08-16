import VocabGridWorld from '../components/VocabGridWorld';
import { OUCH } from '../data/situations';

export default function OuchWorld() {
  return (
    <VocabGridWorld
      title="Ouch"
      titleDe="Autsch"
      items={OUCH}
      gradient="from-rose-50 to-pink-100"
      mood="idle"
    />
  );
}
