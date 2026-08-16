import { motion } from 'framer-motion';
import { useState } from 'react';
import OctopusCharacter from '../components/OctopusCharacter';
import { VEHICLES } from '../data/situations';
import { playPhrase } from '../lib/speak';
import { useAppStore } from '../store/appStore';

// Vehicles world is bespoke because each tile shows just the noun label but
// the played audio includes the sound word too ("Car. Vroom vroom!").
export default function VehiclesWorld() {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-sky-100 flex flex-col p-4">
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
          Vehicles · Fahrzeuge
        </h1>
      </div>

      <div className="w-full max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 pb-8">
        {VEHICLES.map((v) => (
          <motion.button
            key={v.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            animate={tapped === v.key ? { rotate: [0, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.6 }}
            onClick={() => play(v.key)}
            className={`${v.bg} ring-4 ${v.ring} rounded-3xl p-4 shadow-lg flex flex-col items-center gap-1 aspect-square justify-center`}
            aria-label={`${v.labelEn} — ${v.labelDe}`}
          >
            <div className="text-6xl md:text-7xl leading-none">{v.emoji}</div>
            <div className="text-lg md:text-xl font-bold text-[var(--color-warm-brown)]">
              {v.labelEn}
            </div>
            <div className="text-xs md:text-sm text-[var(--color-warm-brown)]/70">
              {v.labelDe}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
