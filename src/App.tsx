import { useAppStore } from './store/appStore';
import HomePage from './pages/HomePage';
import AnimalsWorld from './pages/AnimalsWorld';

export default function App() {
  const view = useAppStore((s) => s.view);
  const goHome = useAppStore((s) => s.goHome);

  if (view === 'animals') return <AnimalsWorld />;

  if (view === 'songs' || view === 'numbers') {
    // Not built yet — friendly placeholder so tapping them doesn't crash.
    return (
      <div className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center gap-6 p-6">
        <div className="text-8xl">🚧</div>
        <div className="text-3xl font-bold text-[var(--color-warm-brown)]">
          Coming soon!
        </div>
        <div className="text-lg text-[var(--color-warm-brown)]/70 text-center max-w-sm">
          {view === 'songs'
            ? 'Songs world is on the way — Old MacDonald, Alle meine Entchen, and more.'
            : 'Numbers 1–10 will land here in a moment.'}
        </div>
        <button
          onClick={goHome}
          className="mt-4 px-8 py-4 bg-[var(--color-coral)] text-white text-xl font-bold rounded-full shadow-lg active:scale-95"
        >
          🏠 Back home
        </button>
      </div>
    );
  }

  return <HomePage />;
}
