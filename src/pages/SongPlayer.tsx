import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { songByKey } from '../data/songs';
import { stopAll } from '../lib/speak';
import OctopusCharacter from '../components/OctopusCharacter';

interface Props {
  songKey: string;
  onBack: () => void;
}

// Song player: karaoke-style highlighting of the current line, sync'd to a
// timer per line's durationMs. When a real MP3 exists in public/audio/songs/,
// we play it; otherwise we use SpeechSynthesis to read the current line so
// the app has SOMETHING even without recordings.
export default function SongPlayer({ songKey, onBack }: Props) {
  const song = songByKey(songKey);
  const [lineIndex, setLineIndex] = useState<number>(-1); // -1 = pre-play
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      stopAll();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!song) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-3xl mb-4">Song not found</div>
        <button onClick={onBack} className="px-6 py-3 bg-purple-500 text-white rounded-full">
          ← Back
        </button>
      </div>
    );
  }

  const currentLine = lineIndex >= 0 && lineIndex < song.lines.length ? song.lines[lineIndex] : null;

  const advance = (i: number) => {
    if (i >= song.lines.length) {
      setLineIndex(song.lines.length);
      setIsPlaying(false);
      setFinished(true);
      return;
    }
    setLineIndex(i);
    // NOTE: We deliberately do NOT read the lyrics via SpeechSynthesis.
    // Robotic TTS reading nursery rhymes sounds terrible. The sung
    // recording from Suno will drop into song.audioUrl and drive playback.
    // Until then, the lyrics animate visually and the parent can sing.
    timeoutRef.current = setTimeout(() => advance(i + 1), song.lines[i].durationMs);
  };

  const play = () => {
    if (isPlaying) return;
    setFinished(false);
    setIsPlaying(true);

    if (song.audioUrl) {
      const audio = new Audio(song.audioUrl);
      audioRef.current = audio;
      audio.play().catch(() => {});
    }
    advance(0);
  };

  const stop = () => {
    setIsPlaying(false);
    if (audioRef.current) audioRef.current.pause();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    stopAll();
    setLineIndex(-1);
    setFinished(false);
  };

  const replay = () => {
    stop();
    setTimeout(play, 200);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${song.bg} flex flex-col p-4`}>
      <div className="flex items-center justify-between">
        <button
          onClick={() => { stop(); onBack(); }}
          className="bg-white/60 backdrop-blur rounded-full w-14 h-14 text-2xl shadow flex items-center justify-center active:scale-95"
          aria-label="Back to songs"
        >
          ←
        </button>
        <div className="text-lg font-semibold text-[var(--color-warm-brown)]/80">
          {song.title}
        </div>
        <div className="w-14" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto w-full">
        {/* Big emoji scene */}
        <motion.div
          key={currentLine?.emoji ?? song.emoji}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 12 }}
          className="text-[9rem] md:text-[11rem] leading-none select-none"
        >
          {currentLine?.emoji ?? song.emoji}
        </motion.div>

        {/* Lyrics */}
        <div className="w-full flex flex-col gap-3 items-center min-h-[8rem] px-4">
          {currentLine ? (
            <motion.div
              key={lineIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className={`text-3xl md:text-4xl font-bold ${song.accent}`}>
                {currentLine.en}
              </div>
              <div className={`text-xl md:text-2xl mt-1 ${song.accent} opacity-70`}>
                {currentLine.de}
              </div>
            </motion.div>
          ) : finished ? (
            <div className="flex flex-col items-center gap-4">
              <OctopusCharacter mood="happy" size={120} />
              <div className="text-2xl font-bold text-[var(--color-warm-brown)]">
                Yay! Again?
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-[var(--color-warm-brown)]/60">
              <OctopusCharacter mood="waving" size={110} />
              <div className="text-lg">Press play to start</div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 pt-4">
          {!isPlaying && !finished && (
            <button
              onClick={play}
              className="bg-white text-[var(--color-warm-brown)] rounded-full w-24 h-24 md:w-28 md:h-28 text-5xl shadow-xl active:scale-95 flex items-center justify-center"
              aria-label="Play"
            >
              ▶︎
            </button>
          )}
          {isPlaying && (
            <button
              onClick={stop}
              className="bg-white text-[var(--color-warm-brown)] rounded-full w-24 h-24 md:w-28 md:h-28 text-5xl shadow-xl active:scale-95 flex items-center justify-center"
              aria-label="Stop"
            >
              ⏹
            </button>
          )}
          {finished && (
            <button
              onClick={replay}
              className="bg-white text-[var(--color-warm-brown)] rounded-full px-8 h-24 md:h-28 text-2xl font-bold shadow-xl active:scale-95 flex items-center gap-3"
            >
              🔁 Again
            </button>
          )}
        </div>

        {!song.audioUrl && (
          <div className="text-xs text-[var(--color-warm-brown)]/50 pb-2 text-center px-4">
            Sing along! The recorded version arrives soon.
          </div>
        )}
      </div>
    </div>
  );
}
