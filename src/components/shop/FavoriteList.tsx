"use client";

import { useFavorites } from "@/lib/favorites/store";
import { ShopCard } from "@/components/shop/ShopCard";
import type { ShopCard as ShopCardModel } from "@/lib/shop";

export function FavoriteList({ cards }: { cards: ShopCardModel[] }) {
  const ready = useFavorites((state) => state.ready);
  const slugs = useFavorites((state) => state.slugs);
  const saved = cards.filter((card) => slugs.includes(card.slug));
  if (!ready) return <p className="mt-8 text-ink-soft">Liste açılıyor.</p>;
  if (saved.length === 0) return <p className="mt-8 text-ink-soft">Henüz favori yok.</p>;
  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {saved.map((card) => (
        <li key={card.slug}>
          <ShopCard card={card} />
        </li>
      ))}
    </ul>
  );
}
