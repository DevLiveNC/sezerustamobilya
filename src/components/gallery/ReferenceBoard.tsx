"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PlaceholderFrame } from "@/components/ui/Marks";
import { photoSlots } from "@/config/slots";

export interface ReferenceCard {
  id: string;
  title: string;
  meta: string;
  category: string;
  year: string | null;
}

export function ReferenceBoard({ items }: { items: readonly ReferenceCard[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const grid = useRef<HTMLUListElement>(null);
  const captured = useRef<unknown>(null);
  const [active, setActive] = useState(params.get("kat") ?? "hepsi");

  const categories = [...new Set(items.map((item) => item.category))];
  const years = [...new Set(items.flatMap((item) => (item.year ? [item.year] : [])))];
  const visible =
    active === "hepsi"
      ? items
      : active.startsWith("yil:")
        ? items.filter((item) => item.year === active.slice(4))
        : items.filter((item) => item.category === active);

  useLayoutEffect(() => {
    const state = captured.current;
    captured.current = null;
    if (!state) return;
    void import("gsap/Flip").then(({ Flip }) => {
      Flip.from(state as never, { duration: 0.35, ease: "power1.out", absolute: true });
    });
  }, [active]);

  function select(next: string) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = grid.current ? [...grid.current.querySelectorAll("[data-ref]")] : [];
    if (!reduced && nodes.length > 0) {
      void import("gsap").then(async (gsapMod) => {
        const flipMod = await import("gsap/Flip");
        gsapMod.default.registerPlugin(flipMod.Flip);
        captured.current = flipMod.Flip.getState(nodes);
        setActive(next);
      });
    } else {
      setActive(next);
    }
    const query = next === "hepsi" ? "/referanslar" : `/referanslar?kat=${encodeURIComponent(next)}`;
    router.replace(query, { scroll: false });
  }

  const chips = ["hepsi", ...categories, ...years.map((year) => `yil:${year}`)];

  return (
    <div>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Referans süzgeci">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            aria-pressed={active === chip}
            className={`min-h-11 border px-4 text-sm ${active === chip ? "border-ink bg-ink text-shaving" : "border-line bg-linen"}`}
            onClick={() => select(chip)}
          >
            {chip === "hepsi" ? "Hepsi" : chip.startsWith("yil:") ? chip.slice(4) : chip}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-10">Bu süzgeçte gösterilecek onaylı referans yok.</p>
      ) : (
        <ul ref={grid} className="mt-8 grid gap-8 sm:grid-cols-2">
          {visible.map((item) => (
            <li key={item.id} data-ref={item.id} className="border border-line bg-linen">
              <PlaceholderFrame slot={photoSlots["reference-after"]} label={item.title} ratio="4 / 3" />
              <div className="p-4">
                <h2 className="font-serif text-2xl">{item.title}</h2>
                <p className="mt-1 text-sm text-ink-soft">{item.meta}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
