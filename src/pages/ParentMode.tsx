import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';

export default function ParentMode() {
  const goHome = useAppStore((s) => s.goHome);
  const audioEnabled = useAppStore((s) => s.audioEnabled);
  const toggleAudio = useAppStore((s) => s.toggleAudio);
  const primaryLang = useAppStore((s) => s.primaryLang);
  const setPrimaryLang = useAppStore((s) => s.setPrimaryLang);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goHome}
            className="bg-white rounded-full w-14 h-14 text-2xl shadow flex items-center justify-center active:scale-95"
            aria-label="Back to app"
          >
            ←
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Parent Mode
          </h1>
          <div className="w-14" />
        </div>

        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-lg mb-4">
          <div className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-3">
            Language
          </div>
          <div className="text-slate-700 mb-4">
            Which language does Otto say first?
          </div>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setPrimaryLang('en')}
              className={`p-4 rounded-2xl font-bold text-lg ${
                primaryLang === 'en'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              🇬🇧 English
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setPrimaryLang('de')}
              className={`p-4 rounded-2xl font-bold text-lg ${
                primaryLang === 'de'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              🇩🇪 Deutsch
            </motion.button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-lg mb-4">
          <div className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-3">
            Audio
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-800 font-semibold">
                Sound {audioEnabled ? 'on' : 'off'}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Turn off for silent play (nursery, library, etc.)
              </div>
            </div>
            <button
              onClick={toggleAudio}
              className={`relative w-16 h-9 rounded-full transition-colors ${audioEnabled ? 'bg-purple-500' : 'bg-slate-300'}`}
              aria-label={`Toggle sound ${audioEnabled ? 'off' : 'on'}`}
            >
              <motion.div
                animate={{ x: audioEnabled ? 30 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-7 h-7 bg-white rounded-full shadow"
              />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-lg mb-4">
          <div className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-3">
            About
          </div>
          <div className="text-slate-700 text-sm space-y-2">
            <div>Kiddo Says — a bilingual musical world for toddlers.</div>
            <div>Made with love for a curious little one.</div>
          </div>
        </div>

        <button
          onClick={goHome}
          className="w-full py-4 bg-purple-500 text-white text-lg font-bold rounded-2xl shadow-lg active:scale-95"
        >
          Back to the app
        </button>
      </div>
    </div>
  );
}
