import { create } from 'zustand';

export type View = 'home' | 'animals' | 'songs' | 'numbers';

interface AppState {
  view: View;
  audioEnabled: boolean;   // false = mute (for offices, silent play)
  goHome: () => void;
  goTo: (v: View) => void;
  toggleAudio: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: 'home',
  audioEnabled: true,
  goHome: () => set({ view: 'home' }),
  goTo: (v) => set({ view: v }),
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
}));
