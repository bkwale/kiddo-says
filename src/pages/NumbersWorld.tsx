import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { playPhrase } from '../lib/speak';
import OctopusCharacter from '../components/OctopusCharacter';

// Numbers 1–10 as playful tap tiles. Each tile shows the digit, the German
// word, and a quantity of little dots so it isn't just an abstract symbol.
const NUMBERS: { n: number; en: string; de: string; bg: string; ring: string }[] = [
  { n: 1,  en: 'One',   de: 'Eins',   bg: 'bg-rose-200',   ring: 'ring-rose-400' },
  { n: 2,  en: 'Two',   de: 'Zwei',   bg: 'bg-amber-200',  ring: 'ring-amber-400' },
  { n: 3,  en: 'Three', de: 'Drei',   bg: 'bg-yellow-200', ring: 'ring-yellow-500' },
  { n: 4,  en: 'Four',  de: 'Vier',   bg: 'bg-lime-200',   ring: 'ring-lime-400' },
  { n: 5,  en: 'Five',  de: 'Fünf',   bg: 'bg-emerald-200',ring: 'ring-emerald-400' },
  { n: 6,  en: 'Six',   de: 'Sechs',  bg: 'bg-teal-200',   ring: 'ring-teal-400' },
  { n: 7,  en: 'Seven', de: 'Sieben', bg: 'bg-sky-200',    ring: 'ring-sky-400' },
  { n: 8,  en: 'Eight', de: 'Acht',   bg: 'bg-indigo-200', ring: 'ring-indigo-400' },
  { n: 9,  en: 'Nine',  de: 'Neun',   bg: 'bg-purple-200', ring: 'ring-purple-400' },
  { n: 10, en: 'Ten',   de: 'Zehn',   bg: 'bg-pink-200',   ring: 'ring-pink-400' },
];

export default function NumbersWorld() {
  const goHome = useAppStore((s) => s.goHome);
  const [tapped, setTapped] = useState<number | null>(null);

  const play = async (n: number) => {
    setTapped(n);
    await playPhrase(`num-${n}`, 'en');
    await new Promise((r) => setTimeout(r, 250));
    await playPhrase(`num-${n}`, 'de');
    setTapped((current) => (current === n ? null : current));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100 flex flex-col p-4">
      <button
        onClick={goHome}
        className="self-start bg-white/60 backdrop-blur rounded-full w-14 h-14 text-2xl shadow flex items-center justify-center active:scale-95"
        aria-label="Home"
      >
        🏠
      </button>

      <div className="flex flex-col items-center gap-4 mt-2 mb-4">
        <OctopusCharacter mood="idle" size={110} />
        <h1
          className="text-3xl md:text-4xl font-bold text-[var(--color-warm-brown)]"
          style={{ fontFamily: 'var(--font-display, system-ui)' }}
        >
          Numbers · Zahlen
        </h1>
      </div>

      <div className="w-full max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 pb-6">
        {NUMBERS.map((num) => (
          <motion.button
            key={num.n}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            animate={tapped === num.n ? { rotate: [0, -6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.5 }}
            onClick={() => play(num.n)}
            className={`${num.bg} ring-4 ${num.ring} rounded-3xl p-4 md:p-6 shadow-lg flex flex-col items-center gap-1 aspect-square`}
            aria-label={`${num.n} — ${num.en} — ${num.de}`}
          >
            <div className="text-6xl md:text-7xl font-black text-[var(--color-warm-brown)] leading-none">
              {num.n}
            </div>
            <div className="text-sm md:text-base font-semibold text-[var(--color-warm-brown)]/80">
              {num.en} · {num.de}
            </div>
            {/* Little dots showing the quantity — helps concrete/abstract mapping */}
            <div className="flex flex-wrap justify-center gap-0.5 mt-auto max-w-full">
              {Array.from({ length: num.n }).map((_, i) => (
                <span
                  key={i}
                  className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[var(--color-warm-brown)]/60"
                />
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
