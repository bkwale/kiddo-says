import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import OctopusCharacter from '../components/OctopusCharacter';
import ParentGate from '../components/ParentGate';
import { useAppStore, type View } from '../store/appStore';
import { playPhrase } from '../lib/speak';

interface WorldCard {
  view: Exclude<View, 'home' | 'parent'>;
  labelEn: string;
  labelDe: string;
  emoji: string;
  bg: string;
  ring: string;
}

const WORLDS: WorldCard[] = [
  { view: 'animals',    labelEn: 'Animals',    labelDe: 'Tiere',      emoji: '🐾', bg: 'bg-orange-200',  ring: 'ring-orange-400' },
  { view: 'phrases',    labelEn: 'Say It',     labelDe: 'Sag es',     emoji: '💬', bg: 'bg-rose-200',    ring: 'ring-rose-400' },
  { view: 'family',     labelEn: 'Family',     labelDe: 'Familie',    emoji: '👨‍👩‍👧‍👦', bg: 'bg-fuchsia-200', ring: 'ring-fuchsia-400' },
  { view: 'body',       labelEn: 'Body',       labelDe: 'Körper',     emoji: '👐', bg: 'bg-pink-200',    ring: 'ring-pink-400' },
  { view: 'colors',     labelEn: 'Colors',     labelDe: 'Farben',     emoji: '🌈', bg: 'bg-sky-200',     ring: 'ring-sky-400' },
  { view: 'vehicles',   labelEn: 'Vehicles',   labelDe: 'Fahrzeuge',  emoji: '🚗', bg: 'bg-blue-200',    ring: 'ring-blue-400' },
  { view: 'eating',     labelEn: 'Eating',     labelDe: 'Essen',      emoji: '🍽️', bg: 'bg-amber-200',   ring: 'ring-amber-400' },
  { view: 'playground', labelEn: 'Playground', labelDe: 'Spielplatz', emoji: '🎈', bg: 'bg-lime-200',    ring: 'ring-lime-400' },
  { view: 'weather',    labelEn: 'Weather',    labelDe: 'Wetter',     emoji: '☀️', bg: 'bg-cyan-200',    ring: 'ring-cyan-400' },
  { view: 'ouch',       labelEn: 'Ouch',       labelDe: 'Autsch',     emoji: '🩹', bg: 'bg-red-200',     ring: 'ring-red-400' },
  { view: 'songs',      labelEn: 'Songs',      labelDe: 'Lieder',     emoji: '🎵', bg: 'bg-purple-200',  ring: 'ring-purple-400' },
  { view: 'numbers',    labelEn: 'Numbers',    labelDe: 'Zahlen',     emoji: '🔢', bg: 'bg-teal-200',    ring: 'ring-teal-400' },
];

export default function HomePage() {
  const goTo = useAppStore((s) => s.goTo);
  const audioEnabled = useAppStore((s) => s.audioEnabled);
  const [showGate, setShowGate] = useState(false);
  const holdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!audioEnabled) return;
    const timer = setTimeout(() => { playPhrase('greet-hello', 'en'); }, 400);
    return () => clearTimeout(timer);
  }, [audioEnabled]);

  const startHold = () => {
    holdRef.current = setTimeout(() => setShowGate(true), 2000);
  };
  const cancelHold = () => {
    if (holdRef.current) clearTimeout(holdRef.current);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-8 md:pt-12 bg-[var(--color-cream)]">
      <div
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        className="cursor-pointer select-none"
        aria-label="Otto — hold for 2 seconds to open parent settings"
      >
        <OctopusCharacter mood="waving" size={200} />
      </div>

      <h1
        className="text-4xl md:text-5xl font-bold text-[var(--color-warm-brown)] mt-2 mb-1"
        style={{ fontFamily: 'var(--font-display, system-ui)' }}
      >
        Kiddo Says
      </h1>

      <p className="text-lg text-[var(--color-warm-brown)]/70 mb-8">
        What shall we play?
      </p>

      <div className="w-full max-w-2xl grid grid-cols-2 gap-4 md:gap-6">
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

      <div className="text-xs text-[var(--color-warm-brown)]/40 mt-8 pb-4">
        Hold Otto for 2 seconds for parent settings
      </div>

      {showGate && (
        <ParentGate
          onSuccess={() => { setShowGate(false); goTo('parent'); }}
          onCancel={() => setShowGate(false)}
        />
      )}
    </div>
  );
}
