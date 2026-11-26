"use client";

import { useState } from "react";
import { ShopCard } from "@/components/shop/ShopCard";
import type { ShopCard as ShopCardModel } from "@/lib/shop";

const tabs = [
  { id: "yeni", label: "Yeni" },
  { id: "one-cikan", label: "Öne çıkanlar" },
  { id: "kapilar", label: "Kapılar" },
] as const;

export function ProductTabs({ groups }: { groups: Record<(typeof tabs)[number]["id"], ShopCardModel[]> }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("yeni");
  const cards = groups[tab];
  return (
    <section className="wrap py-16 md:py-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-4xl leading-none md:text-6xl">Atölyeden parçalar</h2>
        <div role="tablist" aria-label="Ürün grupları" className="flex gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={`min-h-11 px-4 text-sm font-semibold ${tab === item.id ? "bg-ink text-shaving" : "border border-line"}`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {cards.length === 0 ? (
        <p className="mt-10 text-ink-soft">Bu grupta kayıt yok.</p>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {cards.map((card) => (
            <li key={card.slug}>
              <ShopCard card={card} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
