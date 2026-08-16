import { useAppStore } from './store/appStore';
import HomePage from './pages/HomePage';
import AnimalsWorld from './pages/AnimalsWorld';
import SongsWorld from './pages/SongsWorld';
import NumbersWorld from './pages/NumbersWorld';
import PhrasesWorld from './pages/PhrasesWorld';
import ParentMode from './pages/ParentMode';

export default function App() {
  const view = useAppStore((s) => s.view);
  switch (view) {
    case 'animals': return <AnimalsWorld />;
    case 'songs':   return <SongsWorld />;
    case 'numbers': return <NumbersWorld />;
    case 'phrases': return <PhrasesWorld />;
    case 'parent':  return <ParentMode />;
    case 'home':
    default:        return <HomePage />;
  }
}
