import { motion } from 'framer-motion';
import { useState } from 'react';
import OctopusCharacter from '../components/OctopusCharacter';
import { FAMILY } from '../data/vocab';
import { playPhrase } from '../lib/speak';
import { useAppStore } from '../store/appStore';

// Family world: mummy, daddy, siblings, grandparents, pets. Later parents can
// override the standard audio with recordings in their own voice.
export default function FamilyWorld() {
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-fuchsia-100 flex flex-col p-4">
      <button
        onClick={goHome}
        className="self-start bg-white rounded-full w-14 h-14 text-2xl shadow flex items-center justify-center active:scale-95"
        aria-label="Home"
      >
        🏠
      </button>

      <div className="flex flex-col items-center gap-3 mt-2 mb-4">
        <OctopusCharacter mood="happy" size={110} />
        <h1
          className="text-3xl md:text-4xl font-bold text-[var(--color-warm-brown)]"
          style={{ fontFamily: 'var(--font-display, system-ui)' }}
        >
          Family · Familie
        </h1>
      </div>

      <div className="w-full max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 pb-8">
        {FAMILY.map((f) => (
          <motion.button
            key={f.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            animate={tapped === f.key ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
            onClick={() => play(f.key)}
            className={`${f.bg} ring-4 ${f.ring} rounded-3xl p-4 shadow-lg flex flex-col items-center gap-1 aspect-square`}
            aria-label={`${f.en} — ${f.de}`}
          >
            <div className="text-5xl md:text-6xl leading-none">{f.emoji}</div>
            <div className="text-lg md:text-xl font-bold text-[var(--color-warm-brown)]">
              {f.en}
            </div>
            <div className="text-xs md:text-sm text-[var(--color-warm-brown)]/70">
              {f.de}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
