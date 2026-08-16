import { motion } from 'framer-motion';
import { useState } from 'react';
import OctopusCharacter, { type Mood } from './OctopusCharacter';
import { useAppStore } from '../store/appStore';
import { playPhrase } from '../lib/speak';
import type { VocabItem } from '../data/vocab';

interface Props {
  title: string;
  titleDe: string;
  items: VocabItem[];
  gradient: string;   // Tailwind classes for the page bg gradient, e.g. "from-orange-50 to-red-50"
  mood?: Mood;
  emojiSize?: 'md' | 'lg';
}

// Reusable grid of vocab tiles — tap plays EN then DE. Used by Playground,
// Eating, Ouch, Weather, Vehicles. Colors/Body/Family predate this and use
// their own bespoke render for now.
export default function VocabGridWorld({
  title,
  titleDe,
  items,
  gradient,
  mood = 'idle',
  emojiSize = 'lg',
}: Props) {
  const goHome = useAppStore((s) => s.goHome);
  const [tapped, setTapped] = useState<string | null>(null);

  const play = async (key: string) => {
    setTapped(key);
    await playPhrase(key, 'en');
    await new Promise((r) => setTimeout(r, 250));
    await playPhrase(key, 'de');
    setTapped((c) => (c === key ? null : c));
  };

  const emojiClass = emojiSize === 'lg' ? 'text-6xl md:text-7xl' : 'text-5xl md:text-6xl';

  return (
    <div className={`min-h-screen bg-gradient-to-b ${gradient} flex flex-col p-4`}>
      <button
        onClick={goHome}
        className="self-start bg-white rounded-full w-14 h-14 text-2xl shadow flex items-center justify-center active:scale-95"
        aria-label="Home"
      >
        🏠
      </button>

      <div className="flex flex-col items-center gap-3 mt-2 mb-4">
        <OctopusCharacter mood={mood} size={110} />
        <h1
          className="text-3xl md:text-4xl font-bold text-[var(--color-warm-brown)] text-center"
          style={{ fontFamily: 'var(--font-display, system-ui)' }}
        >
          {title} · {titleDe}
        </h1>
      </div>

      <div className="w-full max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 pb-8">
        {items.map((item) => (
          <motion.button
            key={item.key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            animate={tapped === item.key ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
            onClick={() => play(item.key)}
            className={`${item.bg ?? 'bg-white'} ring-4 ${item.ring ?? 'ring-slate-300'} rounded-3xl p-4 shadow-lg flex flex-col items-center justify-center gap-1 aspect-square text-center`}
            aria-label={`${item.en} — ${item.de}`}
          >
            <div className={`${emojiClass} leading-none`}>{item.emoji}</div>
            <div className="text-sm md:text-base font-bold text-[var(--color-warm-brown)] leading-tight">
              {item.en}
            </div>
            <div className="text-xs md:text-sm text-[var(--color-warm-brown)]/70 leading-tight">
              {item.de}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
