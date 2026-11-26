"use client";

import { useEffect } from "react";
import { useFavorites } from "@/lib/favorites/store";
import { useQuote } from "@/lib/quote/store";

export function QuoteRoot() {
  useEffect(() => {
    void Promise.all([useQuote.persist.rehydrate(), useFavorites.persist.rehydrate()]).then(() => {
      useQuote.setState({ ready: true });
      useFavorites.setState({ ready: true });
      void useQuote.getState().refreshFlags();
    });
  }, []);
  return null;
}
