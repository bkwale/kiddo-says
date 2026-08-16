import VocabGridWorld from '../components/VocabGridWorld';
import { EATING } from '../data/situations';

export default function EatingWorld() {
  return (
    <VocabGridWorld
      title="Eating"
      titleDe="Essen"
      items={EATING}
      gradient="from-amber-50 to-orange-100"
      mood="talking"
    />
  );
}
