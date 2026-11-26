"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/config/categories";
import { photoSlots } from "@/config/slots";
import { PlaceholderFrame } from "@/components/ui/Marks";

export function CategoryHover() {
  const [active, setActive] = useState(0);
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  const current = categories[active] ?? categories[0];

  return (
    <div
      className="relative"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setPoint({ x: event.clientX - bounds.left + 24, y: event.clientY - bounds.top - 40 });
      }}
      onMouseLeave={() => setPoint(null)}
    >
      <ul>
        {categories.map((category, index) => (
          <li key={category.key} className="border-t border-ink">
            <Link
              href={category.href}
              className="flex items-baseline justify-between gap-6 py-6"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className="font-display text-[64px] leading-none tracking-[-0.02em]">{category.title}</span>
              <span className="max-w-xs text-right text-ink-soft">{category.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
      {point && current ? (
        <div className="pointer-events-none absolute z-10 w-40" style={{ left: point.x, top: point.y }} aria-hidden="true">
          <PlaceholderFrame slot={photoSlots["product-front"]} label={current.title} ratio="4 / 5" />
        </div>
      ) : null}
    </div>
  );
}
