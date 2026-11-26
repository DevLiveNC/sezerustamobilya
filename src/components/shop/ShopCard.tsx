"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductFrame } from "@/components/media/ProductFrame";
import { photoSlots } from "@/config/slots";
import { PlaceholderFrame } from "@/components/ui/Marks";
import { useFavorites } from "@/lib/favorites/store";
import type { ProductSlug } from "@/lib/domain";
import { useQuote } from "@/lib/quote/store";
import type { ShopCard as ShopCardModel } from "@/lib/shop";

export function ShopCard({ card }: { card: ShopCardModel }) {
  const toggle = useFavorites((state) => state.toggle);
  const saved = useFavorites((state) => state.ready && state.slugs.includes(card.slug));
  const addCarved = useQuote((state) => state.addCarvedLine);
  const addCustom = useQuote((state) => state.addCustomLine);

  return (
    <article className="flex h-full flex-col bg-linen">
      <div className="relative">
        <Link href={card.href}>
          {card.image ? (
            <ProductFrame
              src={card.image.src}
              alt={card.image.alt}
              position={card.image.position}
              sizes="(min-width: 1024px) 25vw, 50vw"
              ratio="4 / 5"
            />
          ) : (
            <PlaceholderFrame slot={photoSlots["product-front"]} label={card.title} ratio="4 / 5" />
          )}
        </Link>
        <span className="absolute left-3 top-3 bg-linen px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-ink">{card.badge}</span>
        <button
          type="button"
          className="absolute right-2 top-2 grid h-11 w-11 place-items-center bg-linen/90"
          aria-pressed={saved}
          aria-label={saved ? "Favorilerden çıkar" : "Favorilere ekle"}
          onClick={() => toggle(card.slug)}
        >
          <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-1 flex-col px-3 py-4">
        <h3 className="font-serif text-xl leading-tight">
          <Link href={card.href}>{card.title}</Link>
        </h3>
        <p className="mt-1 text-sm text-ink-soft">{card.typeLine}</p>
        <div className="mt-4">
          {card.kind === "door-model" ? (
            <Link className="btn btn-ghost w-full" href={card.href}>
              Teklif listesine ekle
            </Link>
          ) : (
            <button
              type="button"
              className="btn btn-ghost w-full"
              onClick={() => {
                if (card.kind === "custom-work") {
                  addCustom({
                    description: card.title,
                    dimensions: { widthCm: null, heightCm: null, depthCm: null },
                    photoCount: 0,
                  });
                  return;
                }
                addCarved({
                  slug: card.slug as ProductSlug,
                  title: card.title,
                  ...(card.availability ? { availability: card.availability } : {}),
                });
              }}
            >
              Teklif listesine ekle
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
