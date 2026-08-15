import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import OctopusCharacter, { type Mood } from '../components/OctopusCharacter';
import { ANIMALS, decoysFor, type Concept } from '../data/concepts';
import { speak, saySequence, stopSpeaking } from '../lib/speak';
import { useAppStore } from '../store/appStore';

type Phase = 'intro' | 'video' | 'find' | 'praise' | 'transition';

export default function AnimalsWorld() {
  const goHome = useAppStore((s) => s.goHome);

  const [animalIndex, setAnimalIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('intro');
  const [ottoMood, setOttoMood] = useState<Mood>('waving');

  const animal = ANIMALS[animalIndex];
  const decoys = useMemo(() => decoysFor(animal.key, 2), [animal.key]);
  const findChoices = useMemo(
    () => [...decoys, animal].sort(() => Math.random() - 0.5),
    [decoys, animal],
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  // ---------- Phase driver ----------
  useEffect(() => {
    let cancelled = false;

    async function runPhase() {
      if (phase === 'intro') {
        setOttoMood('talking');
        await saySequence(animal.en + '.', animal.de + '.');
        if (cancelled) return;
        setOttoMood('idle');
        await wait(300);
        if (cancelled) return;
        setPhase('video');
      } else if (phase === 'video') {
        // Video autoplays and loops; move on after ~4 sec.
        await wait(4000);
        if (cancelled) return;
        setPhase('find');
      } else if (phase === 'find') {
        setOttoMood('talking');
        await speak(`Where is the ${animal.en.toLowerCase()}?`, 'en');
        if (cancelled) return;
        setOttoMood('idle');
      } else if (phase === 'praise') {
        setOttoMood('happy');
        await speak('Yay! Well done!', 'en');
        if (cancelled) return;
        await wait(400);
        if (cancelled) return;
        await speak('Juhu! Gut gemacht!', 'de');
        if (cancelled) return;
        setPhase('transition');
      } else if (phase === 'transition') {
        await wait(800);
        if (cancelled) return;
        // Loop back to the first animal for MVP-0 prototype
        setAnimalIndex((i) => (i + 1) % ANIMALS.length);
        setPhase('intro');
      }
    }

    runPhase();
    return () => {
      cancelled = true;
      stopSpeaking();
    };
  }, [phase, animalIndex, animal]);

  // Autoplay + loop the video when we land on 'video' phase
  useEffect(() => {
    if (phase === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => { /* browsers may block autoplay */ });
    }
  }, [phase, animalIndex]);

  const handleFindTap = (choice: Concept) => {
    if (choice.key === animal.key) {
      setPhase('praise');
    } else {
      // No-fail feedback per PRD: gentle reprompt, no red X
      setOttoMood('talking');
      speak(`That's a ${choice.en.toLowerCase()}. Can you find the ${animal.en.toLowerCase()}?`, 'en');
    }
  };

  return (
    <div className={`min-h-screen ${animal.bgColor} flex flex-col p-4 transition-colors duration-500`}>
      {/* Tiny corner home button — not calling attention to itself */}
      <button
        onClick={goHome}
        className="self-start bg-white/60 backdrop-blur rounded-full w-14 h-14 text-2xl shadow flex items-center justify-center active:scale-95"
        aria-label="Home"
      >
        🏠
      </button>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {phase === 'intro' && (
          <div className="flex flex-col items-center gap-4">
            <OctopusCharacter mood={ottoMood} size={180} />
            <div className="text-9xl">{animal.emoji}</div>
            <div className="text-5xl font-bold text-[var(--color-warm-brown)]">
              {animal.en}
            </div>
            <div className="text-3xl text-[var(--color-warm-brown)]/70">
              {animal.de}
            </div>
          </div>
        )}

        {phase === 'video' && (
          <div className="flex flex-col items-center gap-4 w-full max-w-lg">
            <div className="text-3xl font-bold text-[var(--color-warm-brown)]">
              {animal.en} · {animal.de}
            </div>
            <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-xl">
              <video
                ref={videoRef}
                src={animal.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <div className="text-8xl">{animal.emoji}</div>
          </div>
        )}

        {phase === 'find' && (
          <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
            <OctopusCharacter mood={ottoMood} size={140} />
            <div className="text-2xl md:text-3xl font-semibold text-[var(--color-warm-brown)] text-center">
              Where is the {animal.en.toLowerCase()}?
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-6 w-full">
              {findChoices.map((choice) => (
                <motion.button
                  key={choice.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleFindTap(choice)}
                  className="bg-white rounded-3xl shadow-lg aspect-square flex items-center justify-center text-7xl md:text-8xl"
                  aria-label={choice.en}
                >
                  {choice.emoji}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {(phase === 'praise' || phase === 'transition') && (
          <div className="relative flex flex-col items-center gap-4">
            <OctopusCharacter mood="happy" size={220} />
            <div className="text-6xl">{animal.emoji}</div>
            <div className="text-5xl md:text-6xl font-bold text-[var(--color-coral)]">
              Yay!
            </div>
            <ConfettiBurst />
          </div>
        )}
      </div>
    </div>
  );
}

// Simple celebratory confetti — coloured squares that shoot upward and fade.
function ConfettiBurst() {
  const bits = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 400,
        y: -100 - Math.random() * 300,
        rotate: Math.random() * 360,
        color: ['#FB7185', '#FCD34D', '#7DD3FC', '#6EE7B7', '#C4B5FD'][i % 5],
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {bits.map((b) => (
        <motion.div
          key={b.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: b.x, y: b.y, opacity: 0, rotate: b.rotate }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ background: b.color }}
        />
      ))}
    </div>
  );
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
