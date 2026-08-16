import VocabGridWorld from '../components/VocabGridWorld';
import { PLAYGROUND } from '../data/situations';

export default function PlaygroundWorld() {
  return (
    <VocabGridWorld
      title="Playground"
      titleDe="Spielplatz"
      items={PLAYGROUND}
      gradient="from-lime-50 to-emerald-100"
      mood="happy"
    />
  );
}
