"use client";

import type { ProductSlug } from "@/lib/domain";
import { useQuote } from "@/lib/quote/store";

export function AddPieceButton({
  slug,
  title,
  availability,
  custom = false,
}: {
  slug: string;
  title: string;
  availability?: string;
  custom?: boolean;
}) {
  const addCarved = useQuote((state) => state.addCarvedLine);
  const addCustom = useQuote((state) => state.addCustomLine);
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => {
        if (custom) {
          addCustom({ description: title, dimensions: { widthCm: null, heightCm: null, depthCm: null }, photoCount: 0 });
          return;
        }
        addCarved({ slug: slug as ProductSlug, title, ...(availability ? { availability } : {}) });
      }}
    >
      Teklif listesine ekle
    </button>
  );
}
