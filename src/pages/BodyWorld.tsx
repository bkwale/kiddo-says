import { motion } from 'framer-motion';
import { useState } from 'react';
import OctopusCharacter from '../components/OctopusCharacter';
import { BODY_PARTS } from '../data/vocab';
import { playPhrase } from '../lib/speak';
import { useAppStore } from '../store/appStore';

// Body parts world: tap-to-hear grid. Later we could add a "point to your
// [head]" game or a Head-Shoulders-Knees song scene.
export default function BodyWorld() {
  const goHome = useAppStore((s) => s.goHome);
  const [tapped, setTapped] = useState<string | null>(null);

  const play = async (key: string) => {
    setTapped(key);
    await playPhrase(key, 'en');
    await new Promise((r) => setTimeout(r, 250));
    await playPhrase(key, 'de');
    setTapped((c) => (c === key ? null : c));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 flex flex-col p-4">
      <button
        onClick={goHome}
        className="self-start bg-white rounded-full w-14 h-14 text-2xl shadow flex items-center justify-center active:scale-95"
        aria-label="Home"
      >
        🏠
      </button>

      <div className="flex flex-col items-center gap-3 mt-2 mb-4">
        <OctopusCharacter mood="idle" size={110} />
        <h1
          className="text-3xl md:text-4xl font-bold text-[var(--color-warm-brown)]"
          style={{ fontFamily: 'var(--font-display, system-ui)' }}
        >
          Body · Körper
        </h1>
      </div>

      <div className="w-full max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 pb-8">
        {BODY_PARTS.map((p) => (
          <motion.button
            key={p.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            animate={tapped === p.key ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
            onClick={() => play(p.key)}
            className={`${p.bg} ring-4 ${p.ring} rounded-3xl p-4 shadow-lg flex flex-col items-center gap-1 aspect-square`}
            aria-label={`${p.en} — ${p.de}`}
          >
            <div className="text-6xl md:text-7xl leading-none">{p.emoji}</div>
            <div className="text-lg md:text-xl font-bold text-[var(--color-warm-brown)]">
              {p.en}
            </div>
            <div className="text-xs md:text-sm text-[var(--color-warm-brown)]/70">
              {p.de}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
