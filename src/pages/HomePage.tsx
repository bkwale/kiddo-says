import { motion } from 'framer-motion';
import { useEffect } from 'react';
import OctopusCharacter from '../components/OctopusCharacter';
import { useAppStore, type View } from '../store/appStore';
import { speak } from '../lib/speak';

interface WorldCard {
  view: Exclude<View, 'home'>;
  labelEn: string;
  labelDe: string;
  emoji: string;
  bg: string;
  ring: string;
}

const WORLDS: WorldCard[] = [
  { view: 'animals', labelEn: 'Animals', labelDe: 'Tiere',   emoji: '🐾', bg: 'bg-orange-200', ring: 'ring-orange-400' },
  { view: 'songs',   labelEn: 'Songs',   labelDe: 'Lieder',  emoji: '🎵', bg: 'bg-purple-200', ring: 'ring-purple-400' },
  { view: 'numbers', labelEn: 'Numbers', labelDe: 'Zahlen',  emoji: '🔢', bg: 'bg-teal-200',   ring: 'ring-teal-400' },
];

export default function HomePage() {
  const goTo = useAppStore((s) => s.goTo);

  useEffect(() => {
    const timer = setTimeout(() => { speak('Hello!', 'en'); }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-8 md:pt-12 bg-[var(--color-cream)]">
      <OctopusCharacter mood="waving" size={200} />

      <h1
        className="text-4xl md:text-5xl font-bold text-[var(--color-warm-brown)] mt-2 mb-1"
        style={{ fontFamily: 'var(--font-display, system-ui)' }}
      >
        Kiddo Says
      </h1>

      <p className="text-lg text-[var(--color-warm-brown)]/70 mb-8">
        What shall we play?
      </p>

      <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {WORLDS.map((world) => (
          <motion.button
            key={world.view}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goTo(world.view)}
            className={`${world.bg} ring-4 ${world.ring} rounded-3xl p-6 md:p-8 shadow-lg flex flex-col items-center gap-2 active:shadow-inner transition-shadow`}
          >
            <div className="text-7xl md:text-8xl leading-none">{world.emoji}</div>
            <div className="text-xl md:text-2xl font-bold text-[var(--color-warm-brown)]">
              {world.labelEn}
            </div>
            <div className="text-sm text-[var(--color-warm-brown)]/70">
              {world.labelDe}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
