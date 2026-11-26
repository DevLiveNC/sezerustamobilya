"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoriteStore {
  ready: boolean;
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
}

export const useFavorites = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      ready: false,
      slugs: [],
      toggle: (slug) => {
        const slugs = get().slugs.includes(slug) ? get().slugs.filter((item) => item !== slug) : [...get().slugs, slug];
        set({ slugs });
      },
      has: (slug) => get().slugs.includes(slug),
    }),
    {
      name: "sezer-usta-favori-v1",
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ slugs: state.slugs }),
    },
  ),
);
