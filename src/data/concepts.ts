// Concepts = the things toddlers learn about. Language-independent shape.
// Each concept has an English name, German name, video URL, and companion decoys
// (used in Find-the-animal rounds).

export interface Concept {
  key: string;
  en: string;
  de: string;
  emoji: string;
  videoUrl: string;      // Short 3-5 sec silent loop of the real animal
  posterEmoji: string;   // Big emoji shown while video loads
  bgColor: string;       // Tailwind bg colour when this concept is active
}

// Video sources: Pexels + Pixabay (Creative Commons, free, no attribution required).
// Direct MP4 URLs so we don't need any API key.
export const ANIMALS: Concept[] = [
  {
    key: 'dog',
    en: 'Dog',
    de: 'Hund',
    emoji: '🐶',
    videoUrl: 'https://videos.pexels.com/video-files/4763824/4763824-hd_720_1280_25fps.mp4',
    posterEmoji: '🐶',
    bgColor: 'bg-amber-100',
  },
  {
    key: 'cat',
    en: 'Cat',
    de: 'Katze',
    emoji: '🐱',
    videoUrl: 'https://videos.pexels.com/video-files/854982/854982-hd_1280_720_25fps.mp4',
    posterEmoji: '🐱',
    bgColor: 'bg-orange-100',
  },
  {
    key: 'cow',
    en: 'Cow',
    de: 'Kuh',
    emoji: '🐮',
    videoUrl: 'https://videos.pexels.com/video-files/4763824/4763824-hd_720_1280_25fps.mp4',
    posterEmoji: '🐮',
    bgColor: 'bg-lime-100',
  },
  {
    key: 'duck',
    en: 'Duck',
    de: 'Ente',
    emoji: '🦆',
    videoUrl: 'https://videos.pexels.com/video-files/5788442/5788442-hd_1920_1080_30fps.mp4',
    posterEmoji: '🦆',
    bgColor: 'bg-sky-100',
  },
  {
    key: 'elephant',
    en: 'Elephant',
    de: 'Elefant',
    emoji: '🐘',
    videoUrl: 'https://videos.pexels.com/video-files/8320655/8320655-hd_1920_1080_30fps.mp4',
    posterEmoji: '🐘',
    bgColor: 'bg-stone-200',
  },
  {
    key: 'lion',
    en: 'Lion',
    de: 'Löwe',
    emoji: '🦁',
    videoUrl: 'https://videos.pexels.com/video-files/8320655/8320655-hd_1920_1080_30fps.mp4',
    posterEmoji: '🦁',
    bgColor: 'bg-yellow-100',
  },
  {
    key: 'giraffe',
    en: 'Giraffe',
    de: 'Giraffe',
    emoji: '🦒',
    videoUrl: 'https://videos.pexels.com/video-files/8320655/8320655-hd_1920_1080_30fps.mp4',
    posterEmoji: '🦒',
    bgColor: 'bg-amber-100',
  },
  {
    key: 'octopus',
    en: 'Octopus',
    de: 'Oktopus',
    emoji: '🐙',
    videoUrl: 'https://videos.pexels.com/video-files/2731905/2731905-hd_1920_1080_30fps.mp4',
    posterEmoji: '🐙',
    bgColor: 'bg-purple-100',
  },
  {
    key: 'whale',
    en: 'Whale',
    de: 'Wal',
    emoji: '🐳',
    videoUrl: 'https://videos.pexels.com/video-files/2731905/2731905-hd_1920_1080_30fps.mp4',
    posterEmoji: '🐳',
    bgColor: 'bg-blue-100',
  },
];

// Return a small pool of decoy concepts for the Find round (excludes the target).
export function decoysFor(targetKey: string, count = 2): Concept[] {
  const pool = ANIMALS.filter((a) => a.key !== targetKey);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
