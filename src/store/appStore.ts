import { create } from 'zustand';

export type View =
  | 'home'
  | 'animals'
  | 'songs'
  | 'numbers'
  | 'phrases'
  | 'colors'
  | 'body'
  | 'family'
  | 'playground'
  | 'eating'
  | 'ouch'
  | 'weather'
  | 'vehicles'
  | 'parent';

interface AppState {
  view: View;
  audioEnabled: boolean;
  primaryLang: 'en' | 'de';
  selectedSongKey: string | null;
  goHome: () => void;
  goTo: (v: View) => void;
  toggleAudio: () => void;
  setPrimaryLang: (l: 'en' | 'de') => void;
  selectSong: (key: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: 'home',
  audioEnabled: true,
  primaryLang: 'en',
  selectedSongKey: null,
  goHome: () => set({ view: 'home', selectedSongKey: null }),
  goTo: (v) => set({ view: v }),
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
  setPrimaryLang: (l) => set({ primaryLang: l }),
  selectSong: (key) => set({ selectedSongKey: key }),
}));
