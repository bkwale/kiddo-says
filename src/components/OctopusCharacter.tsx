import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export type Mood = 'idle' | 'talking' | 'happy' | 'waving';

interface Props {
  mood?: Mood;
  size?: number;
  name?: string;
}

// A friendly cartoon octopus. Hand-coded SVG. Animations applied to the outer
// motion wrapper (not inner SVG groups) to avoid transform-origin bugs.
export default function OctopusCharacter({ mood = 'idle', size = 320 }: Props) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 2500;
      setTimeout(() => {
        if (cancelled) return;
        setBlink(true);
        setTimeout(() => !cancelled && setBlink(false), 150);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => { cancelled = true; };
  }, []);

  // Whole-body bob happens on the outer motion.div wrapper.
  const bodyBob = mood === 'happy'
    ? { y: [0, -14, 0, -8, 0], transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' as const } }
    : { y: [0, -6, 0], transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' as const } };

  // Mouth animation values
  const mouthRx = mood === 'happy' ? 30 : mood === 'talking' ? 26 : 24;
  const mouthRy = mood === 'happy' ? 18 : mood === 'talking' ? 14 : 8;

  const eyeRy = blink ? 2 : 36;

  return (
    <motion.div
      animate={bodyBob}
      style={{ width: size, height: size, display: 'inline-block' }}
    >
      <svg
        viewBox="0 0 400 400"
        width={size}
        height={size}
        style={{ display: 'block', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="bodyGrad" cx="45%" cy="35%" r="70%">
            <stop offset="0%"  stopColor="#FDA4AF" />
            <stop offset="60%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#E11D48" />
          </radialGradient>
          <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBCFE8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FBCFE8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 8 arms behind the body (static — animation caused SVG scale bugs) */}
        <path d="M 130 260 Q 60 300 70 360 Q 90 380 110 350 Q 100 320 130 300 Z" fill="url(#bodyGrad)" />
        <path d="M 155 275 Q 110 340 140 385 Q 165 385 165 350 Q 150 320 165 295 Z" fill="url(#bodyGrad)" />
        <path d="M 185 285 Q 175 360 195 390 Q 215 388 210 350 Q 195 320 200 300 Z" fill="url(#bodyGrad)" />
        <path d="M 215 285 Q 225 360 205 390 Q 185 388 190 350 Q 205 320 200 300 Z" fill="url(#bodyGrad)" />
        <path d="M 245 285 Q 285 360 260 390 Q 235 385 240 350 Q 250 320 235 300 Z" fill="url(#bodyGrad)" />
        <path d="M 270 275 Q 320 340 290 385 Q 265 385 265 350 Q 280 320 265 295 Z" fill="url(#bodyGrad)" />
        <path d="M 285 260 Q 355 300 335 360 Q 315 380 295 350 Q 305 320 285 295 Z" fill="url(#bodyGrad)" />
        <path d="M 105 240 Q 30 250 40 320 Q 60 340 85 320 Q 80 290 110 275 Z" fill="url(#bodyGrad)" />

        {/* Body */}
        <ellipse cx="200" cy="200" rx="130" ry="120" fill="url(#bodyGrad)" />
        {/* Highlight */}
        <ellipse cx="160" cy="150" rx="35" ry="22" fill="#FECDD3" opacity="0.55" />
        {/* Cheeks */}
        <circle cx="140" cy="230" r="22" fill="url(#cheekGrad)" />
        <circle cx="260" cy="230" r="22" fill="url(#cheekGrad)" />

        {/* Left eye */}
        <ellipse cx="160" cy="180" rx="30" ry={eyeRy} fill="white" />
        {!blink && (
          <>
            <circle cx="165" cy="185" r="14" fill="#2E1B0E" />
            <circle cx="170" cy="180" r="5" fill="white" />
          </>
        )}
        {/* Right eye */}
        <ellipse cx="240" cy="180" rx="30" ry={eyeRy} fill="white" />
        {!blink && (
          <>
            <circle cx="245" cy="185" r="14" fill="#2E1B0E" />
            <circle cx="250" cy="180" r="5" fill="white" />
          </>
        )}

        {/* Mouth */}
        <motion.ellipse
          cx={200}
          cy={250}
          initial={{ rx: 24, ry: 8 }}
          animate={{ rx: mouthRx, ry: mouthRy }}
          transition={
            mood === 'talking'
              ? { repeat: Infinity, repeatType: 'reverse' as const, duration: 0.35, ease: 'easeInOut' as const }
              : { duration: 0.3 }
          }
          fill="#7C2D12"
        />
        {mood === 'happy' && (
          <ellipse cx="200" cy="256" rx="12" ry="6" fill="#F87171" />
        )}
      </svg>
    </motion.div>
  );
}
