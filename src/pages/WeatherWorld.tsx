import VocabGridWorld from '../components/VocabGridWorld';
import { WEATHER } from '../data/situations';

export default function WeatherWorld() {
  return (
    <VocabGridWorld
      title="Weather"
      titleDe="Wetter"
      items={WEATHER}
      gradient="from-sky-50 to-blue-100"
      mood="idle"
    />
  );
}
