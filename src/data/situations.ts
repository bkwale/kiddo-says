// Situational vocabulary/phrase lists for the Playground, Eating, Ouch,
// Weather, and Vehicles worlds. Same shape as vocab.ts so the audio
// manifest picks them up automatically.
//
// Vehicles include the sound-word directly in the audio text ("Car. Vroom
// vroom!" / "Auto. Brumm brumm!") because that is how toddlers naturally
// learn the vehicle word — paired with the sound.

import type { VocabItem } from './vocab';

// ---------------------------------------------------------------------------
// PLAYGROUND — the language of playing with other kids
// ---------------------------------------------------------------------------
export const PLAYGROUND: VocabItem[] = [
  { key: 'play-my-turn',   en: 'My turn',        de: 'Ich bin dran',     emoji: '🙋',  bg: 'bg-orange-100', ring: 'ring-orange-300' },
  { key: 'play-again',     en: 'Again, please',  de: 'Nochmal, bitte',   emoji: '🔁',  bg: 'bg-amber-100',  ring: 'ring-amber-300' },
  { key: 'play-careful',   en: 'Careful!',       de: 'Vorsichtig!',      emoji: '⚠️',  bg: 'bg-yellow-100', ring: 'ring-yellow-300' },
  { key: 'play-wait',      en: 'Wait for me',    de: 'Warte auf mich',   emoji: '✋',  bg: 'bg-lime-100',   ring: 'ring-lime-300' },
  { key: 'play-lets-play', en: "Let's play",     de: 'Los, spielen wir', emoji: '🎈',  bg: 'bg-emerald-100',ring: 'ring-emerald-300' },
  { key: 'play-with-me',   en: 'Play with me',   de: 'Spiel mit mir',    emoji: '🤝',  bg: 'bg-teal-100',   ring: 'ring-teal-300' },
  { key: 'play-slide',     en: 'Slide!',         de: 'Rutsche!',         emoji: '🛝',  bg: 'bg-sky-100',    ring: 'ring-sky-300' },
  { key: 'play-swing',     en: 'Swing',          de: 'Schaukel',         emoji: '🎢',  bg: 'bg-blue-100',   ring: 'ring-blue-300' },
  { key: 'play-push-me',   en: 'Push me',        de: 'Schieb mich',      emoji: '💨',  bg: 'bg-indigo-100', ring: 'ring-indigo-300' },
  { key: 'play-fun',       en: 'Fun!',           de: 'Spaß!',            emoji: '🎉',  bg: 'bg-purple-100', ring: 'ring-purple-300' },
];

// ---------------------------------------------------------------------------
// EATING — mealtime vocabulary
// ---------------------------------------------------------------------------
export const EATING: VocabItem[] = [
  { key: 'eat-yum',        en: 'Yum!',           de: 'Lecker!',          emoji: '😋',  bg: 'bg-yellow-100', ring: 'ring-yellow-300' },
  { key: 'eat-yuck',       en: 'Yuck!',          de: 'Igitt!',           emoji: '😖',  bg: 'bg-lime-100',   ring: 'ring-lime-300' },
  { key: 'eat-all-done',   en: 'All done',       de: 'Alles auf',        emoji: '🍽️',  bg: 'bg-orange-100', ring: 'ring-orange-300' },
  { key: 'eat-high-chair', en: 'High chair',     de: 'Hochstuhl',        emoji: '🪑',  bg: 'bg-amber-100',  ring: 'ring-amber-300' },
  { key: 'eat-my-cup',     en: 'My cup',         de: 'Mein Becher',      emoji: '🥤',  bg: 'bg-sky-100',    ring: 'ring-sky-300' },
  { key: 'eat-my-spoon',   en: 'My spoon',       de: 'Mein Löffel',      emoji: '🥄',  bg: 'bg-blue-100',   ring: 'ring-blue-300' },
  { key: 'eat-more-please', en: 'More, please',  de: 'Mehr, bitte',      emoji: '➕',  bg: 'bg-emerald-100',ring: 'ring-emerald-300' },
  { key: 'eat-hot',        en: 'Too hot',        de: 'Zu heiß',          emoji: '🥵',  bg: 'bg-red-100',    ring: 'ring-red-300' },
  { key: 'eat-drink',      en: 'Drink',          de: 'Trinken',          emoji: '💧',  bg: 'bg-cyan-100',   ring: 'ring-cyan-300' },
  { key: 'eat-snack',      en: 'Snack, please',  de: 'Snack, bitte',     emoji: '🍪',  bg: 'bg-amber-200',  ring: 'ring-amber-400' },
];

// ---------------------------------------------------------------------------
// OUCH — hurt/comfort phrases (the ones nobody wants to need, but everyone does)
// ---------------------------------------------------------------------------
export const OUCH: VocabItem[] = [
  { key: 'ouch-ouch',       en: 'Ouch!',            de: 'Autsch!',              emoji: '🤕',  bg: 'bg-red-100',    ring: 'ring-red-300' },
  { key: 'ouch-hurts-here', en: 'Hurts here',       de: 'Hier tut es weh',      emoji: '🥺',  bg: 'bg-rose-100',   ring: 'ring-rose-300' },
  { key: 'ouch-kiss-better', en: 'Kiss it better',  de: 'Küss das heile',       emoji: '💋',  bg: 'bg-pink-100',   ring: 'ring-pink-300' },
  { key: 'ouch-plaster',    en: 'Plaster, please',  de: 'Ein Pflaster, bitte',  emoji: '🩹',  bg: 'bg-amber-100',  ring: 'ring-amber-300' },
  { key: 'ouch-im-okay',    en: "I'm okay",         de: 'Alles gut',            emoji: '😊',  bg: 'bg-emerald-100',ring: 'ring-emerald-300' },
  { key: 'ouch-fell-down',  en: 'I fell down',      de: 'Ich bin hingefallen',  emoji: '😢',  bg: 'bg-blue-100',   ring: 'ring-blue-300' },
  { key: 'ouch-hug-please', en: 'Hug, please',      de: 'Umarmung, bitte',      emoji: '🤗',  bg: 'bg-fuchsia-100',ring: 'ring-fuchsia-300' },
  { key: 'ouch-better',     en: 'Better now',       de: 'Jetzt besser',         emoji: '💖',  bg: 'bg-purple-100', ring: 'ring-purple-300' },
];

// ---------------------------------------------------------------------------
// WEATHER — what's it like outside
// ---------------------------------------------------------------------------
export const WEATHER: VocabItem[] = [
  { key: 'weather-sunny',   en: 'Sunny',   de: 'Sonnig',   emoji: '☀️',  bg: 'bg-yellow-200', ring: 'ring-yellow-400' },
  { key: 'weather-rainy',   en: 'Rainy',   de: 'Regnerisch', emoji: '🌧️', bg: 'bg-blue-200',   ring: 'ring-blue-400' },
  { key: 'weather-windy',   en: 'Windy',   de: 'Windig',   emoji: '💨',  bg: 'bg-cyan-100',   ring: 'ring-cyan-300' },
  { key: 'weather-cloud',   en: 'Cloud',   de: 'Wolke',    emoji: '☁️',  bg: 'bg-slate-100',  ring: 'ring-slate-300' },
  { key: 'weather-rainbow', en: 'Rainbow', de: 'Regenbogen', emoji: '🌈', bg: 'bg-fuchsia-100',ring: 'ring-fuchsia-300' },
  { key: 'weather-snow',    en: 'Snow',    de: 'Schnee',   emoji: '❄️',  bg: 'bg-sky-100',    ring: 'ring-sky-300' },
  { key: 'weather-moon',    en: 'Moon',    de: 'Mond',     emoji: '🌙',  bg: 'bg-indigo-200', ring: 'ring-indigo-400' },
  { key: 'weather-star',    en: 'Star',    de: 'Stern',    emoji: '⭐',  bg: 'bg-amber-100',  ring: 'ring-amber-300' },
];

// ---------------------------------------------------------------------------
// VEHICLES — each entry pairs the word with its onomatopoeia sound so the
// generated audio says the vehicle then the sound. In German the sound-words
// are different (Auto → brumm brumm, Zug → tuff tuff, Ente → quak quak).
// ---------------------------------------------------------------------------
// A VocabItem here uses `en` and `de` as the FULL audio strings that will
// be spoken. That way ElevenLabs reads "Car. Vroom vroom!" and the kid
// naturally connects vehicle+sound. The on-screen label uses just the noun.
export interface VehicleItem extends VocabItem {
  labelEn: string;   // Just the noun, shown on the tile
  labelDe: string;
}

export const VEHICLES: VehicleItem[] = [
  { key: 'v-car',       en: 'Car. Vroom vroom!',        de: 'Auto. Brumm brumm!',    labelEn: 'Car',       labelDe: 'Auto',      emoji: '🚗',  bg: 'bg-red-200',    ring: 'ring-red-400' },
  { key: 'v-bus',       en: 'Bus. Honk honk!',          de: 'Bus. Tut tut!',         labelEn: 'Bus',       labelDe: 'Bus',       emoji: '🚌',  bg: 'bg-yellow-200', ring: 'ring-yellow-400' },
  { key: 'v-train',     en: 'Train. Choo choo!',        de: 'Zug. Tuff tuff!',       labelEn: 'Train',     labelDe: 'Zug',       emoji: '🚂',  bg: 'bg-green-200',  ring: 'ring-green-400' },
  { key: 'v-tractor',   en: 'Tractor. Rumble rumble!',  de: 'Traktor. Bruum bruum!', labelEn: 'Tractor',   labelDe: 'Traktor',   emoji: '🚜',  bg: 'bg-orange-200', ring: 'ring-orange-400' },
  { key: 'v-aeroplane', en: 'Aeroplane. Whoosh!',       de: 'Flugzeug. Wusch!',      labelEn: 'Aeroplane', labelDe: 'Flugzeug',  emoji: '✈️',  bg: 'bg-sky-200',    ring: 'ring-sky-400' },
  { key: 'v-boat',      en: 'Boat. Splash!',            de: 'Boot. Platsch!',        labelEn: 'Boat',      labelDe: 'Boot',      emoji: '⛵',  bg: 'bg-blue-200',   ring: 'ring-blue-400' },
  { key: 'v-bike',      en: 'Bike. Ring ring!',         de: 'Fahrrad. Kling kling!', labelEn: 'Bike',      labelDe: 'Fahrrad',   emoji: '🚲',  bg: 'bg-purple-200', ring: 'ring-purple-400' },
  { key: 'v-fire-truck', en: 'Fire truck. Weeoo weeoo!', de: 'Feuerwehr. Tatü tata!', labelEn: 'Fire truck', labelDe: 'Feuerwehr', emoji: '🚒', bg: 'bg-rose-200',   ring: 'ring-rose-400' },
];

// All new situations combined — for the audio manifest.
export const ALL_SITUATIONS: VocabItem[] = [
  ...PLAYGROUND,
  ...EATING,
  ...OUCH,
  ...WEATHER,
  ...VEHICLES,
];
