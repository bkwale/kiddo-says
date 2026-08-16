import { motion } from 'framer-motion';
import { useState } from 'react';
import OctopusCharacter from '../components/OctopusCharacter';
import { COLORS } from '../data/vocab';
import { playPhrase } from '../lib/speak';
import { useAppStore } from '../store/appStore';

// Colors world: the tile background IS the paint colour. That's the entire
// visual signal — no emoji needed, and it's the clearest way for a 2yo to
// map "the yellow one" to the word.
export default function ColorsWorld() {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col p-4">
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
          Colors · Farben
        </h1>
      </div>

      <div className="w-full max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 pb-8">
        {COLORS.map((c) => {
          const isLight = c.key === 'color-white' || c.key === 'color-yellow';
          return (
            <motion.button
              key={c.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              animate={tapped === c.key ? { rotate: [0, -5, 5, 0] } : {}}
              transition={{ duration: 0.5 }}
              onClick={() => play(c.key)}
              className={`rounded-3xl shadow-lg aspect-square flex flex-col items-center justify-center gap-1 border-4 ${isLight ? 'border-slate-300' : 'border-white/60'}`}
              style={{ background: c.colorHex }}
              aria-label={`${c.en} — ${c.de}`}
            >
              <div className={`text-2xl md:text-3xl font-black ${isLight ? 'text-slate-800' : 'text-white'} drop-shadow`}>
                {c.en}
              </div>
              <div className={`text-sm md:text-base font-semibold ${isLight ? 'text-slate-700/80' : 'text-white/90'} drop-shadow`}>
                {c.de}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
