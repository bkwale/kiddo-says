// Vocabulary lists for the Colors, Body, and Family worlds.
// Each entry shares the same shape as toddler-phrases so the audio manifest
// can consume them the same way.

export interface VocabItem {
  key: string;
  en: string;
  de: string;
  emoji?: string;
  colorHex?: string;   // For Colors world — actual paint colour shown on the tile
  bg?: string;         // Tailwind background class (Body / Family)
  ring?: string;       // Tailwind ring colour
}

// ---------------------------------------------------------------------------
// COLORS — the tile shows the actual paint colour, not an emoji.
// ---------------------------------------------------------------------------
export const COLORS: VocabItem[] = [
  { key: 'color-red',    en: 'Red',    de: 'Rot',     colorHex: '#EF4444' },
  { key: 'color-blue',   en: 'Blue',   de: 'Blau',    colorHex: '#3B82F6' },
  { key: 'color-yellow', en: 'Yellow', de: 'Gelb',    colorHex: '#FACC15' },
  { key: 'color-green',  en: 'Green',  de: 'Grün',    colorHex: '#22C55E' },
  { key: 'color-orange', en: 'Orange', de: 'Orange',  colorHex: '#F97316' },
  { key: 'color-purple', en: 'Purple', de: 'Lila',    colorHex: '#A855F7' },
  { key: 'color-pink',   en: 'Pink',   de: 'Rosa',    colorHex: '#EC4899' },
  { key: 'color-brown',  en: 'Brown',  de: 'Braun',   colorHex: '#78350F' },
  { key: 'color-black',  en: 'Black',  de: 'Schwarz', colorHex: '#111827' },
  { key: 'color-white',  en: 'White',  de: 'Weiß',    colorHex: '#F9FAFB' },
];

// ---------------------------------------------------------------------------
// BODY PARTS — head-to-toe. Emojis are best-effort (some parts have no
// dedicated glyph; face emojis stand in). Post-MVP we'd replace these with
// friendly illustrations.
// ---------------------------------------------------------------------------
export const BODY_PARTS: VocabItem[] = [
  { key: 'body-head',   en: 'Head',   de: 'Kopf',   emoji: '😀',  bg: 'bg-orange-100', ring: 'ring-orange-300' },
  { key: 'body-eyes',   en: 'Eyes',   de: 'Augen',  emoji: '👀',  bg: 'bg-sky-100',    ring: 'ring-sky-300' },
  { key: 'body-nose',   en: 'Nose',   de: 'Nase',   emoji: '👃',  bg: 'bg-rose-100',   ring: 'ring-rose-300' },
  { key: 'body-mouth',  en: 'Mouth',  de: 'Mund',   emoji: '👄',  bg: 'bg-red-100',    ring: 'ring-red-300' },
  { key: 'body-ears',   en: 'Ears',   de: 'Ohren',  emoji: '👂',  bg: 'bg-amber-100',  ring: 'ring-amber-300' },
  { key: 'body-hair',   en: 'Hair',   de: 'Haare',  emoji: '💇',  bg: 'bg-yellow-100', ring: 'ring-yellow-300' },
  { key: 'body-tummy',  en: 'Tummy',  de: 'Bauch',  emoji: '🫃',  bg: 'bg-lime-100',   ring: 'ring-lime-300' },
  { key: 'body-hands',  en: 'Hands',  de: 'Hände',  emoji: '👐',  bg: 'bg-emerald-100',ring: 'ring-emerald-300' },
  { key: 'body-feet',   en: 'Feet',   de: 'Füße',   emoji: '🦶',  bg: 'bg-teal-100',   ring: 'ring-teal-300' },
  { key: 'body-teeth',  en: 'Teeth',  de: 'Zähne',  emoji: '🦷',  bg: 'bg-indigo-100', ring: 'ring-indigo-300' },
];

// ---------------------------------------------------------------------------
// FAMILY & PETS — the people (and animals) closest to a toddler.
// German uses the informal/child-facing forms (Mama, Papa, Oma, Opa).
// ---------------------------------------------------------------------------
export const FAMILY: VocabItem[] = [
  { key: 'family-mummy',   en: 'Mummy',   de: 'Mama',       emoji: '👩',      bg: 'bg-rose-200',    ring: 'ring-rose-400' },
  { key: 'family-daddy',   en: 'Daddy',   de: 'Papa',       emoji: '👨',      bg: 'bg-sky-200',     ring: 'ring-sky-400' },
  { key: 'family-baby',    en: 'Baby',    de: 'Baby',       emoji: '👶',      bg: 'bg-pink-200',    ring: 'ring-pink-400' },
  { key: 'family-brother', en: 'Brother', de: 'Bruder',     emoji: '🧒',      bg: 'bg-amber-200',   ring: 'ring-amber-400' },
  { key: 'family-sister',  en: 'Sister',  de: 'Schwester',  emoji: '👧',      bg: 'bg-fuchsia-200', ring: 'ring-fuchsia-400' },
  { key: 'family-grandma', en: 'Grandma', de: 'Oma',        emoji: '👵',      bg: 'bg-purple-200',  ring: 'ring-purple-400' },
  { key: 'family-grandpa', en: 'Grandpa', de: 'Opa',        emoji: '👴',      bg: 'bg-teal-200',    ring: 'ring-teal-400' },
  { key: 'family-doggy',   en: 'Doggy',   de: 'Hündchen',   emoji: '🐶',      bg: 'bg-orange-200',  ring: 'ring-orange-400' },
  { key: 'family-kitty',   en: 'Kitty',   de: 'Kätzchen',   emoji: '🐱',      bg: 'bg-yellow-200',  ring: 'ring-yellow-400' },
  { key: 'family-family',  en: 'Family',  de: 'Familie',    emoji: '👨‍👩‍👧‍👦', bg: 'bg-emerald-200', ring: 'ring-emerald-400' },
];

// All vocab combined — for the audio manifest.
export const ALL_VOCAB: VocabItem[] = [...COLORS, ...BODY_PARTS, ...FAMILY];
