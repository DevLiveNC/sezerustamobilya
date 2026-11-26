"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { DoorConfig, Dimensions, ProductSlug } from "@/lib/domain";
import { track } from "@/lib/analytics";
import {
  addCarved,
  addCustom,
  addDoor,
  applyAvailability,
  emptyQuote,
  migrateQuote,
  removeLine,
  setDoorQty,
  type QuoteSnapshot,
  type StoredLine,
} from "@/lib/quote/model";

interface QuoteStore extends QuoteSnapshot {
  ready: boolean;
  notice: string | null;
  drawer: boolean;
  addCarvedLine: (line: { slug: ProductSlug; title: string; availability?: string }) => void;
  addDoorLine: (line: { slug: ProductSlug; title: string; config: DoorConfig; qty: number }) => void;
  addCustomLine: (line: { description: string; dimensions: Dimensions; photoCount: number }) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  setDrawer: (open: boolean) => void;
  clearNotice: () => void;
  refreshFlags: () => Promise<void>;
}

export const useQuote = create<QuoteStore>()(
  persist(
    (set, get) => ({
      ...emptyQuote,
      ready: false,
      notice: null,
      drawer: false,
      addCarvedLine: (line) => {
        const result = addCarved(get(), { slug: line.slug, title: line.title }, line.availability);
        set({ ...result.snapshot, notice: result.notice, drawer: result.added || get().drawer });
        if (result.added) track("quote_line_add", { type: "carved-piece" });
      },
      addDoorLine: (line) => {
        const result = addDoor(get(), line);
        set({ ...result.snapshot, notice: result.notice, drawer: true });
        track("quote_line_add", { type: "door" });
      },
      addCustomLine: (line) => {
        const result = addCustom(get(), line);
        set({ ...result.snapshot, notice: result.notice, drawer: true });
        track("quote_line_add", { type: "custom" });
      },
      setQty: (key, qty) => set(setDoorQty(get(), key, qty)),
      remove: (key) => set(removeLine(get(), key)),
      setDrawer: (drawer) => set({ drawer }),
      clearNotice: () => set({ notice: null }),
      refreshFlags: async () => {
        const response = await fetch("/api/availability");
        if (!response.ok) return;
        const data = (await response.json()) as Record<string, string>;
        set(applyAvailability(get(), data));
      },
    }),
    {
      name: "sezer-usta-quote-v1",
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ version: 1 as const, lines: state.lines, flags: state.flags }),
      merge: (persisted, current) => {
        const snapshot = migrateQuote(persisted);
        if (current.lines.length > 0 && snapshot.lines.length === 0) return current;
        return { ...current, ...snapshot };
      },
    },
  ),
);

export function quoteCount(lines: readonly StoredLine[]): number {
  return lines.reduce((sum, line) => sum + (line.type === "door" ? line.qty : 1), 0);
}
