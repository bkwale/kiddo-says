// Bilingual nursery rhymes for the Songs world.
// Public domain melodies + our own lyric arrangements.
// Each line has a duration hint (ms) driving the karaoke-style highlight
// even before we have the recorded audio in place.

export type Lang = 'en' | 'de';

export interface Line {
  en: string;
  de: string;
  emoji?: string;    // Optional emoji beat that appears with this line
  durationMs: number;
}

export interface Song {
  key: string;
  title: string;
  titleDe: string;
  emoji: string;
  bg: string;             // Tailwind gradient class for the song scene
  accent: string;         // Tailwind text colour for highlight
  audioUrl?: string;      // Filled in later when we generate/find real recordings
  lines: Line[];
}

export const SONGS: Song[] = [
  {
    key: 'old-macdonald',
    title: 'Old MacDonald',
    titleDe: 'Old MacDonald hat eine Farm',
    emoji: '🚜',
    bg: 'from-orange-100 to-amber-200',
    accent: 'text-amber-700',
    lines: [
      { en: 'Old MacDonald had a farm',        de: 'Old MacDonald hat eine Farm',   emoji: '🚜', durationMs: 3200 },
      { en: 'E-I-E-I-O',                       de: 'E-I-E-I-O',                     emoji: '🎵', durationMs: 2200 },
      { en: 'And on his farm he had a cow',    de: 'Und auf der Farm hat er eine Kuh', emoji: '🐮', durationMs: 3200 },
      { en: 'E-I-E-I-O',                       de: 'E-I-E-I-O',                     emoji: '🎵', durationMs: 2200 },
      { en: 'With a moo moo here…',            de: 'Ein muh muh hier…',             emoji: '🐮', durationMs: 2400 },
      { en: '…and a moo moo there',            de: '…und ein muh muh da',           emoji: '🐮', durationMs: 2400 },
      { en: 'And on his farm he had a duck',   de: 'Und auf der Farm hat er eine Ente', emoji: '🦆', durationMs: 3200 },
      { en: 'E-I-E-I-O',                       de: 'E-I-E-I-O',                     emoji: '🎵', durationMs: 2200 },
      { en: 'With a quack quack here…',        de: 'Ein quak quak hier…',           emoji: '🦆', durationMs: 2400 },
      { en: '…and a quack quack there',        de: '…und ein quak quak da',         emoji: '🦆', durationMs: 2400 },
      { en: 'And on his farm he had a dog',    de: 'Und auf der Farm hat er einen Hund', emoji: '🐶', durationMs: 3200 },
      { en: 'E-I-E-I-O',                       de: 'E-I-E-I-O',                     emoji: '🎵', durationMs: 2200 },
      { en: 'Woof woof here, woof woof there', de: 'Wuff wuff hier, wuff wuff da',  emoji: '🐶', durationMs: 3000 },
      { en: 'That was fun!',                   de: 'Das war lustig!',               emoji: '🎉', durationMs: 2200 },
    ],
  },
  {
    key: 'alle-meine-entchen',
    title: 'All My Little Ducklings',
    titleDe: 'Alle meine Entchen',
    emoji: '🦆',
    bg: 'from-sky-100 to-blue-200',
    accent: 'text-sky-700',
    lines: [
      { en: 'All my little ducklings',        de: 'Alle meine Entchen',              emoji: '🦆', durationMs: 3000 },
      { en: 'Swimming on the lake',           de: 'schwimmen auf dem See',           emoji: '💧', durationMs: 3000 },
      { en: 'Swimming on the lake',           de: 'schwimmen auf dem See',           emoji: '💧', durationMs: 3000 },
      { en: 'Little heads in the water',      de: 'Köpfchen in das Wasser',          emoji: '🌊', durationMs: 3000 },
      { en: 'Little tails in the air',        de: 'Schwänzchen in die Höh',          emoji: '☁️', durationMs: 3000 },
      { en: 'Quack quack quack!',             de: 'Quak quak quak!',                 emoji: '🦆', durationMs: 2400 },
    ],
  },
  {
    key: 'twinkle-twinkle',
    title: 'Twinkle Twinkle Little Star',
    titleDe: 'Funkel, funkel, kleiner Stern',
    emoji: '⭐',
    bg: 'from-indigo-100 to-purple-200',
    accent: 'text-indigo-700',
    lines: [
      { en: 'Twinkle, twinkle, little star',   de: 'Funkel, funkel, kleiner Stern',   emoji: '⭐', durationMs: 3200 },
      { en: 'How I wonder what you are',       de: 'Ach, wie schön du leuchtest gern', emoji: '✨', durationMs: 3200 },
      { en: 'Up above the world so high',      de: 'Oben in dem Himmelszelt',         emoji: '🌌', durationMs: 3200 },
      { en: 'Like a diamond in the sky',       de: 'Wie ein Diamant so hell',         emoji: '💎', durationMs: 3200 },
      { en: 'Twinkle, twinkle, little star',   de: 'Funkel, funkel, kleiner Stern',   emoji: '⭐', durationMs: 3200 },
      { en: 'How I wonder what you are',       de: 'Ach, wie schön du leuchtest gern', emoji: '✨', durationMs: 3200 },
    ],
  },
];

export function songByKey(key: string): Song | undefined {
  return SONGS.find((s) => s.key === key);
}
