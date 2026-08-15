import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import { SONGS } from '../data/songs';
import OctopusCharacter from '../components/OctopusCharacter';
import SongPlayer from './SongPlayer';

export default function SongsWorld() {
  const goHome = useAppStore((s) => s.goHome);
  const selectedSongKey = useAppStore((s) => s.selectedSongKey);
  const selectSong = useAppStore((s) => s.selectSong);

  if (selectedSongKey) {
    return <SongPlayer songKey={selectedSongKey} onBack={() => selectSong(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex flex-col p-4">
      <button
        onClick={goHome}
        className="self-start bg-white/60 backdrop-blur rounded-full w-14 h-14 text-2xl shadow flex items-center justify-center active:scale-95"
        aria-label="Home"
      >
        🏠
      </button>

      <div className="flex flex-col items-center gap-3 mt-2 mb-6">
        <OctopusCharacter mood="happy" size={140} />
        <h1
          className="text-3xl md:text-4xl font-bold text-[var(--color-warm-brown)]"
          style={{ fontFamily: 'var(--font-display, system-ui)' }}
        >
          Songs · Lieder
        </h1>
        <p className="text-[var(--color-warm-brown)]/70 text-center">
          Pick a song to sing along
        </p>
      </div>

      <div className="w-full max-w-xl mx-auto flex flex-col gap-4 pb-6">
        {SONGS.map((song) => (
          <motion.button
            key={song.key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => selectSong(song.key)}
            className={`bg-gradient-to-r ${song.bg} ring-4 ring-white/40 rounded-3xl p-5 md:p-6 shadow-lg flex items-center gap-4 text-left`}
          >
            <div className="text-6xl md:text-7xl leading-none flex-shrink-0">{song.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xl md:text-2xl font-bold text-[var(--color-warm-brown)]">
                {song.title}
              </div>
              <div className="text-sm md:text-base text-[var(--color-warm-brown)]/70">
                {song.titleDe}
              </div>
            </div>
            <div className="text-3xl md:text-4xl text-[var(--color-warm-brown)]/60">
              ▶︎
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
