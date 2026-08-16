// Practical toddler phrases — the things a 2 year old actually needs to say.
// Grouped by category for parent reference; the app displays them as one big
// colourful grid because 2yos don't navigate categories.
//
// German translations use the informal du-form (child talking to parent /
// familiar adult), not formal Sie.

export type Category = 'needs' | 'manners' | 'greetings' | 'clothes' | 'feelings' | 'bath' | 'bedtime' | 'nursery';

export interface TodPhrase {
  key: string;
  en: string;
  de: string;
  emoji: string;
  bg: string;         // Tailwind bg class
  ring: string;       // Tailwind ring class
  category: Category;
}

// Palette recycled across categories to keep the grid visually varied without
// looking noisy. Each category gets a rough colour family.
export const TODDLER_PHRASES: TodPhrase[] = [
  // ------- NEEDS & WANTS -------
  { key: 'want-water',   en: 'I want water',      de: 'Ich möchte Wasser',    emoji: '💧',  bg: 'bg-sky-200',    ring: 'ring-sky-400',    category: 'needs' },
  { key: 'want-milk',    en: 'I want milk',       de: 'Ich möchte Milch',     emoji: '🥛',  bg: 'bg-blue-100',   ring: 'ring-blue-300',   category: 'needs' },
  { key: 'want-food',    en: 'I want food',       de: 'Ich möchte Essen',     emoji: '🍽️',  bg: 'bg-amber-200',  ring: 'ring-amber-400',  category: 'needs' },
  { key: 'im-hungry',    en: "I'm hungry",        de: 'Ich habe Hunger',      emoji: '🍎',  bg: 'bg-red-200',    ring: 'ring-red-400',    category: 'needs' },
  { key: 'im-thirsty',   en: "I'm thirsty",       de: 'Ich habe Durst',       emoji: '💦',  bg: 'bg-cyan-200',   ring: 'ring-cyan-400',   category: 'needs' },
  { key: 'im-tired',     en: "I'm tired",         de: 'Ich bin müde',         emoji: '😴',  bg: 'bg-indigo-200', ring: 'ring-indigo-400', category: 'needs' },
  { key: 'need-toilet',  en: 'I need the toilet', de: 'Ich muss zur Toilette', emoji: '🚽', bg: 'bg-purple-200', ring: 'ring-purple-400', category: 'needs' },
  { key: 'more-please',  en: 'More, please',      de: 'Mehr, bitte',          emoji: '➕',  bg: 'bg-orange-200', ring: 'ring-orange-400', category: 'needs' },
  { key: 'help-me',      en: 'Help me',           de: 'Hilf mir',             emoji: '🙏',  bg: 'bg-yellow-200', ring: 'ring-yellow-400', category: 'needs' },
  { key: 'im-finished',  en: "I'm finished",      de: 'Ich bin fertig',       emoji: '✅',  bg: 'bg-emerald-200',ring: 'ring-emerald-400',category: 'needs' },
  { key: 'up-please',    en: 'Up, please',        de: 'Hoch, bitte',          emoji: '🙆',  bg: 'bg-pink-200',   ring: 'ring-pink-400',   category: 'needs' },

  // ------- MANNERS -------
  { key: 'please',       en: 'Please',            de: 'Bitte',                emoji: '✨',  bg: 'bg-rose-100',   ring: 'ring-rose-300',   category: 'manners' },
  { key: 'thank-you',    en: 'Thank you',         de: 'Danke',                emoji: '💖',  bg: 'bg-fuchsia-200',ring: 'ring-fuchsia-400',category: 'manners' },
  { key: 'im-fine-thanks', en: "I'm fine, thank you", de: "Mir geht's gut, danke", emoji: '😊', bg: 'bg-lime-200', ring: 'ring-lime-400', category: 'manners' },
  { key: 'no-thanks',    en: 'No, thank you',     de: 'Nein, danke',          emoji: '🙅', bg: 'bg-stone-200',  ring: 'ring-stone-400',  category: 'manners' },
  { key: 'yes-please',   en: 'Yes, please',       de: 'Ja, bitte',            emoji: '🙋',  bg: 'bg-teal-200',   ring: 'ring-teal-400',   category: 'manners' },
  { key: 'sorry',        en: 'Sorry',             de: 'Entschuldigung',       emoji: '🥺',  bg: 'bg-violet-200', ring: 'ring-violet-400', category: 'manners' },

  // ------- GREETINGS -------
  { key: 'hello',        en: 'Hello',             de: 'Hallo',                emoji: '👋',  bg: 'bg-orange-100', ring: 'ring-orange-300', category: 'greetings' },
  { key: 'bye-bye',      en: 'Bye bye',           de: 'Tschüss',              emoji: '🖐️', bg: 'bg-cyan-100',   ring: 'ring-cyan-300',   category: 'greetings' },
  { key: 'good-morning', en: 'Good morning',      de: 'Guten Morgen',         emoji: '🌅',  bg: 'bg-yellow-100', ring: 'ring-yellow-300', category: 'greetings' },
  { key: 'good-night',   en: 'Good night',        de: 'Gute Nacht',           emoji: '🌙',  bg: 'bg-indigo-100', ring: 'ring-indigo-300', category: 'greetings' },

  // ------- CLOTHES / TEMPERATURE -------
  { key: 'shoes-off',    en: 'Please take my shoes off', de: 'Bitte zieh mir die Schuhe aus', emoji: '👟', bg: 'bg-amber-100', ring: 'ring-amber-300', category: 'clothes' },
  { key: 'im-cold',      en: "I'm cold",          de: 'Mir ist kalt',         emoji: '🥶',  bg: 'bg-sky-100',    ring: 'ring-sky-300',    category: 'clothes' },
  { key: 'im-hot',       en: "I'm hot",           de: 'Mir ist heiß',         emoji: '🥵',  bg: 'bg-red-100',    ring: 'ring-red-300',    category: 'clothes' },

  // ------- FEELINGS -------
  { key: 'im-happy',     en: "I'm happy",         de: 'Ich bin glücklich',    emoji: '😄',  bg: 'bg-yellow-200', ring: 'ring-yellow-400', category: 'feelings' },
  { key: 'im-sad',       en: "I'm sad",           de: 'Ich bin traurig',      emoji: '😢',  bg: 'bg-blue-200',   ring: 'ring-blue-400',   category: 'feelings' },
  { key: 'im-scared',    en: "I'm scared",        de: 'Ich habe Angst',       emoji: '😨',  bg: 'bg-purple-100', ring: 'ring-purple-300', category: 'feelings' },

  // ------- BATH TIME -------
  { key: 'bath-time',    en: 'Bath time!',         de: 'Baden!',                emoji: '🛁',  bg: 'bg-sky-100',    ring: 'ring-sky-300',    category: 'bath' },
  { key: 'splash',       en: 'Splash!',            de: 'Platsch!',              emoji: '💦',  bg: 'bg-cyan-100',   ring: 'ring-cyan-300',   category: 'bath' },
  { key: 'bubbles',      en: 'Bubbles',            de: 'Seifenblasen',          emoji: '🫧',  bg: 'bg-blue-100',   ring: 'ring-blue-300',   category: 'bath' },
  { key: 'wash-hair',    en: 'Wash my hair',       de: 'Wasch mir die Haare',   emoji: '🧴',  bg: 'bg-teal-100',   ring: 'ring-teal-300',   category: 'bath' },
  { key: 'dry-me',       en: 'Please dry me',      de: 'Trockne mich ab, bitte', emoji: '🧻', bg: 'bg-amber-100',  ring: 'ring-amber-300',  category: 'bath' },

  // ------- BEDTIME -------
  { key: 'story-please', en: 'Story please',       de: 'Eine Geschichte, bitte', emoji: '📖', bg: 'bg-indigo-100', ring: 'ring-indigo-300', category: 'bedtime' },
  { key: 'tuck-me-in',   en: 'Tuck me in',         de: 'Deck mich zu',           emoji: '🛏️', bg: 'bg-violet-100', ring: 'ring-violet-300', category: 'bedtime' },
  { key: 'kiss-goodnight', en: 'Kiss goodnight',   de: 'Küsschen, gute Nacht',   emoji: '💋',  bg: 'bg-rose-100',   ring: 'ring-rose-300',   category: 'bedtime' },
  { key: 'one-more',     en: 'One more',           de: 'Noch eins',              emoji: '🔁',  bg: 'bg-fuchsia-100',ring: 'ring-fuchsia-300',category: 'bedtime' },
  { key: 'want-cuddle',  en: 'I want to cuddle',   de: 'Ich möchte kuscheln',    emoji: '🤗',  bg: 'bg-pink-100',   ring: 'ring-pink-300',   category: 'bedtime' },
  { key: 'my-teddy',     en: 'My teddy',           de: 'Mein Teddy',             emoji: '🧸',  bg: 'bg-amber-200',  ring: 'ring-amber-400',  category: 'bedtime' },
  { key: 'love-you',     en: 'I love you',         de: 'Ich hab dich lieb',      emoji: '💕',  bg: 'bg-rose-200',   ring: 'ring-rose-400',   category: 'bedtime' },

  // ------- NURSERY DROP-OFF -------
  { key: 'have-good-day', en: 'Have a good day',   de: 'Einen schönen Tag',      emoji: '🌟',  bg: 'bg-yellow-100', ring: 'ring-yellow-300', category: 'nursery' },
  { key: 'come-back-soon', en: 'Come back soon',   de: 'Komm bald wieder',       emoji: '↩️',  bg: 'bg-emerald-100',ring: 'ring-emerald-300',category: 'nursery' },
  { key: 'wheres-my-bag', en: "Where's my bag?",   de: 'Wo ist meine Tasche?',   emoji: '🎒',  bg: 'bg-lime-100',   ring: 'ring-lime-300',   category: 'nursery' },
  { key: 'miss-you',     en: 'I miss you',         de: 'Ich vermisse dich',      emoji: '💭',  bg: 'bg-purple-100', ring: 'ring-purple-300', category: 'nursery' },
];
