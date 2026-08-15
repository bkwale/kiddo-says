// Master phrase list for Kiddo Says MVP-0.
// Each entry becomes one audio file per language via scripts/generate-audio.ts.
// Keep phrases short, warm, and natural for a toddler audience.

export type PhraseKey = string;

export interface Phrase {
  key: PhraseKey;           // filename stem — e.g. "dog", "praise-well-done"
  en: string;               // English text sent to ElevenLabs
  de: string;               // German text sent to ElevenLabs
  emoji?: string;           // shown on screen alongside audio
}

// ============================================================================
// 1. ANIMALS — the main world (9 concepts × 2 languages = 18 files)
// ============================================================================
export const ANIMALS: Phrase[] = [
  { key: 'dog',      en: 'Dog.',      de: 'Hund.',     emoji: '🐶' },
  { key: 'cat',      en: 'Cat.',      de: 'Katze.',    emoji: '🐱' },
  { key: 'cow',      en: 'Cow.',      de: 'Kuh.',      emoji: '🐮' },
  { key: 'duck',     en: 'Duck.',     de: 'Ente.',     emoji: '🦆' },
  { key: 'elephant', en: 'Elephant.', de: 'Elefant.',  emoji: '🐘' },
  { key: 'lion',     en: 'Lion.',     de: 'Löwe.',     emoji: '🦁' },
  { key: 'giraffe',  en: 'Giraffe.',  de: 'Giraffe.',  emoji: '🦒' },
  { key: 'octopus',  en: 'Octopus.',  de: 'Oktopus.',  emoji: '🐙' },
  { key: 'whale',    en: 'Whale.',    de: 'Wal.',      emoji: '🐳' },
];

// ============================================================================
// 2. NUMBERS 1–10 — the Extras tile (10 concepts × 2 languages = 20 files)
// ============================================================================
export const NUMBERS: Phrase[] = [
  { key: 'num-1',  en: 'One.',   de: 'Eins.',    emoji: '1️⃣' },
  { key: 'num-2',  en: 'Two.',   de: 'Zwei.',    emoji: '2️⃣' },
  { key: 'num-3',  en: 'Three.', de: 'Drei.',    emoji: '3️⃣' },
  { key: 'num-4',  en: 'Four.',  de: 'Vier.',    emoji: '4️⃣' },
  { key: 'num-5',  en: 'Five.',  de: 'Fünf.',    emoji: '5️⃣' },
  { key: 'num-6',  en: 'Six.',   de: 'Sechs.',   emoji: '6️⃣' },
  { key: 'num-7',  en: 'Seven.', de: 'Sieben.',  emoji: '7️⃣' },
  { key: 'num-8',  en: 'Eight.', de: 'Acht.',    emoji: '8️⃣' },
  { key: 'num-9',  en: 'Nine.',  de: 'Neun.',    emoji: '9️⃣' },
  { key: 'num-10', en: 'Ten.',   de: 'Zehn.',    emoji: '🔟' },
];

// ============================================================================
// 3. FIND-THE-ANIMAL PROMPTS (9 × 2 = 18 files)
// ============================================================================
export const FIND_PROMPTS: Phrase[] = [
  { key: 'find-dog',      en: 'Where is the dog?',      de: 'Wo ist der Hund?' },
  { key: 'find-cat',      en: 'Where is the cat?',      de: 'Wo ist die Katze?' },
  { key: 'find-cow',      en: 'Where is the cow?',      de: 'Wo ist die Kuh?' },
  { key: 'find-duck',     en: 'Where is the duck?',     de: 'Wo ist die Ente?' },
  { key: 'find-elephant', en: 'Where is the elephant?', de: 'Wo ist der Elefant?' },
  { key: 'find-lion',     en: 'Where is the lion?',     de: 'Wo ist der Löwe?' },
  { key: 'find-giraffe',  en: 'Where is the giraffe?',  de: 'Wo ist die Giraffe?' },
  { key: 'find-octopus',  en: 'Where is the octopus?',  de: 'Wo ist der Oktopus?' },
  { key: 'find-whale',    en: 'Where is the whale?',    de: 'Wo ist der Wal?' },
];

// ============================================================================
// 4. SAY-AFTER-ME PROMPTS (9 × 2 = 18 files)
// ============================================================================
export const SAY_PROMPTS: Phrase[] = [
  { key: 'say-dog',      en: 'Can you say dog?',      de: 'Kannst du Hund sagen?' },
  { key: 'say-cat',      en: 'Can you say cat?',      de: 'Kannst du Katze sagen?' },
  { key: 'say-cow',      en: 'Can you say cow?',      de: 'Kannst du Kuh sagen?' },
  { key: 'say-duck',     en: 'Can you say duck?',     de: 'Kannst du Ente sagen?' },
  { key: 'say-elephant', en: 'Can you say elephant?', de: 'Kannst du Elefant sagen?' },
  { key: 'say-lion',     en: 'Can you say lion?',     de: 'Kannst du Löwe sagen?' },
  { key: 'say-giraffe',  en: 'Can you say giraffe?',  de: 'Kannst du Giraffe sagen?' },
  { key: 'say-octopus',  en: 'Can you say octopus?',  de: 'Kannst du Oktopus sagen?' },
  { key: 'say-whale',    en: 'Can you say whale?',    de: 'Kannst du Wal sagen?' },
];

// ============================================================================
// 5. PRAISE + CHARACTER LINES (7 × 2 = 14 files)
// ============================================================================
export const CHARACTER_LINES: Phrase[] = [
  { key: 'greet-hello',    en: 'Hello!',              de: 'Hallo!' },
  { key: 'greet-bye',      en: 'Bye bye!',            de: 'Tschüss!' },
  { key: 'praise-well-done', en: 'Well done!',        de: 'Gut gemacht!' },
  { key: 'praise-yay',     en: 'Yay!',                de: 'Juhu!' },
  { key: 'praise-thats-right', en: "That's right!",   de: 'Genau!' },
  { key: 'lets-play',      en: "Let's play!",         de: 'Los, spielen wir!' },
  { key: 'gentle-again',   en: 'Try it again with me.', de: 'Versuchen wir es nochmal zusammen.' },
];

// ============================================================================
// COMBINED — everything the generator will produce
// ============================================================================
export const ALL_PHRASES: Phrase[] = [
  ...ANIMALS,
  ...NUMBERS,
  ...FIND_PROMPTS,
  ...SAY_PROMPTS,
  ...CHARACTER_LINES,
];
