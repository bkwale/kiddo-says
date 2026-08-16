import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { playPhrase } from '../lib/speak';
import OctopusCharacter from '../components/OctopusCharacter';
import { TODDLER_PHRASES } from '../data/toddler-phrases';

// All phrases in one big scrollable grid. No categories on-screen — 2yos
// don't navigate categories, they tap what looks bright and interesting.
export default function PhrasesWorld() {
  const goHome = useAppStore((s) => s.goHome);
  const [tappedKey, setTappedKey] = useState<string | null>(null);

  const play = async (key: string) => {
    setTappedKey(key);
    await playPhrase(key, 'en');
    await new Promise((r) => setTimeout(r, 250));
    await playPhrase(key, 'de');
    setTappedKey((current) => (current === key ? null : current));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50 flex flex-col p-4">
      <button
        onClick={goHome}
        className="self-start bg-white/60 backdrop-blur rounded-full w-14 h-14 text-2xl shadow flex items-center justify-center active:scale-95"
        aria-label="Home"
      >
        🏠
      </button>

      <div className="flex flex-col items-center gap-3 mt-2 mb-4">
        <OctopusCharacter mood="talking" size={110} />
        <h1
          className="text-3xl md:text-4xl font-bold text-[var(--color-warm-brown)]"
          style={{ fontFamily: 'var(--font-display, system-ui)' }}
        >
          Say It · Sag es
        </h1>
        <p className="text-[var(--color-warm-brown)]/70 text-sm text-center max-w-md">
          Tap any tile to hear Otto say it in English then German.
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pb-8">
        {TODDLER_PHRASES.map((phrase) => (
          <motion.button
            key={phrase.key}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            animate={tappedKey === phrase.key ? { rotate: [0, -4, 4, -3, 3, 0] } : {}}
            transition={{ duration: 0.55 }}
            onClick={() => play(phrase.key)}
            className={`${phrase.bg} ring-4 ${phrase.ring} rounded-3xl p-4 md:p-5 shadow-lg flex flex-col items-center gap-2 text-center min-h-[10rem]`}
            aria-label={`${phrase.en} — ${phrase.de}`}
          >
            <div className="text-5xl md:text-6xl leading-none">{phrase.emoji}</div>
            <div className="text-sm md:text-base font-bold text-[var(--color-warm-brown)] leading-tight">
              {phrase.en}
            </div>
            <div className="text-xs md:text-sm text-[var(--color-warm-brown)]/70 leading-tight">
              {phrase.de}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
