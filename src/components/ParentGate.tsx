import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

// Toddler-proof parent gate: a simple arithmetic question a 2yo can't solve.
// Shown after a 3s long-press on the Otto/logo area. Values are picked at
// mount so tabbing away and back rerolls.
export default function ParentGate({ onSuccess, onCancel }: Props) {
  const [pair, setPair] = useState(makePair);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(false), 1000);
      return () => clearTimeout(t);
    }
  }, [error]);

  const submit = () => {
    if (parseInt(input, 10) === pair[0] + pair[1]) {
      onSuccess();
    } else {
      setError(true);
      setInput('');
      setPair(makePair());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl"
      >
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">🔒</div>
          <div className="text-xl font-bold text-[var(--color-warm-brown)]">
            Parent check
          </div>
          <div className="text-sm text-[var(--color-warm-brown)]/70 mt-1">
            Solve this to unlock settings
          </div>
        </div>

        <motion.div
          animate={error ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
          className={`text-center text-4xl font-black py-6 rounded-2xl mb-4 ${error ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-[var(--color-warm-brown)]'}`}
        >
          {pair[0]} + {pair[1]} = ?
        </motion.div>

        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          autoFocus
          className="w-full text-center text-3xl font-bold p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none mb-4"
          placeholder="?"
        />

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-gray-100 text-[var(--color-warm-brown)] font-semibold rounded-2xl active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!input}
            className="flex-1 py-3 bg-purple-500 text-white font-semibold rounded-2xl active:scale-95 disabled:opacity-40"
          >
            Unlock
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Numbers that add to a value between 5 and 15 — a bit fiddly for a toddler
// tapping randomly but trivial for an adult.
function makePair(): [number, number] {
  const a = 3 + Math.floor(Math.random() * 6); // 3–8
  const b = 2 + Math.floor(Math.random() * 6); // 2–7
  return [a, b];
}
