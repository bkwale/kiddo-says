import { useAppStore } from './store/appStore';
import HomePage from './pages/HomePage';
import AnimalsWorld from './pages/AnimalsWorld';
import SongsWorld from './pages/SongsWorld';
import NumbersWorld from './pages/NumbersWorld';
import PhrasesWorld from './pages/PhrasesWorld';
import ColorsWorld from './pages/ColorsWorld';
import BodyWorld from './pages/BodyWorld';
import FamilyWorld from './pages/FamilyWorld';
import PlaygroundWorld from './pages/PlaygroundWorld';
import EatingWorld from './pages/EatingWorld';
import OuchWorld from './pages/OuchWorld';
import WeatherWorld from './pages/WeatherWorld';
import VehiclesWorld from './pages/VehiclesWorld';
import ParentMode from './pages/ParentMode';

export default function App() {
  const view = useAppStore((s) => s.view);
  switch (view) {
    case 'animals':    return <AnimalsWorld />;
    case 'songs':      return <SongsWorld />;
    case 'numbers':    return <NumbersWorld />;
    case 'phrases':    return <PhrasesWorld />;
    case 'colors':     return <ColorsWorld />;
    case 'body':       return <BodyWorld />;
    case 'family':     return <FamilyWorld />;
    case 'playground': return <PlaygroundWorld />;
    case 'eating':     return <EatingWorld />;
    case 'ouch':       return <OuchWorld />;
    case 'weather':    return <WeatherWorld />;
    case 'vehicles':   return <VehiclesWorld />;
    case 'parent':     return <ParentMode />;
    case 'home':
    default:           return <HomePage />;
  }
}
