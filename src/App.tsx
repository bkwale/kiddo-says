import { useAppStore } from './store/appStore';
import HomePage from './pages/HomePage';
import AnimalsWorld from './pages/AnimalsWorld';
import SongsWorld from './pages/SongsWorld';
import NumbersWorld from './pages/NumbersWorld';
import PhrasesWorld from './pages/PhrasesWorld';
import ColorsWorld from './pages/ColorsWorld';
import BodyWorld from './pages/BodyWorld';
import FamilyWorld from './pages/FamilyWorld';
import ParentMode from './pages/ParentMode';

export default function App() {
  const view = useAppStore((s) => s.view);
  switch (view) {
    case 'animals': return <AnimalsWorld />;
    case 'songs':   return <SongsWorld />;
    case 'numbers': return <NumbersWorld />;
    case 'phrases': return <PhrasesWorld />;
    case 'colors':  return <ColorsWorld />;
    case 'body':    return <BodyWorld />;
    case 'family':  return <FamilyWorld />;
    case 'parent':  return <ParentMode />;
    case 'home':
    default:        return <HomePage />;
  }
}
