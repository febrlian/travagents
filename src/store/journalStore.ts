import { create } from 'zustand';
import { Reflection, ReflectionMood, PrayerName } from '../types/models';

interface JournalStore {
  reflections: Reflection[];
  activeDraft: Partial<Reflection> | null;
  startReflection: (prayerName: PrayerName) => void;
  updateDraft: (updates: Partial<Reflection>) => void;
  saveReflection: () => void;
  discardDraft: () => void;
}

export const useJournalStore = create<JournalStore>((set, get) => ({
  reflections: [],
  activeDraft: null,

  startReflection: (prayerName: PrayerName) => {
    set({
      activeDraft: {
        id: Math.random().toString(36).substring(7),
        prayerName,
        date: new Date().toISOString(),
        focusQuality: 5,
        distractionLevel: 5,
      }
    });
  },

  updateDraft: (updates) => {
    set((state) => ({
      activeDraft: state.activeDraft ? { ...state.activeDraft, ...updates } : null
    }));
  },

  saveReflection: () => {
    const { activeDraft, reflections } = get();
    if (activeDraft && activeDraft.mood) {
      set({
        reflections: [activeDraft as Reflection, ...reflections],
        activeDraft: null
      });
    }
  },

  discardDraft: () => {
    set({ activeDraft: null });
  }
}));
