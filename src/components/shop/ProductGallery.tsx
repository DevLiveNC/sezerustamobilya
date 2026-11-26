"use client";

import { useState } from "react";
import { ProductFrame } from "@/components/media/ProductFrame";
import type { ShownPicture } from "@/lib/product-pictures";

export function ProductGallery({ images }: { images: ShownPicture[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;
  const ratio = current.role === "detail" ? "1 / 1" : "4 / 5";
  return (
    <div>
      <ProductFrame
        src={current.src}
        alt={current.alt}
        position={current.position}
        priority={active === 0 && current.role === "front"}
        sizes="(min-width: 1024px) 58vw, 100vw"
        ratio={ratio}
      />
      {images.length > 1 ? (
        <ul className="mt-3 flex gap-3" aria-label="Görsel seçimi">
          {images.map((image, index) => (
            <li key={image.id}>
              <button
                type="button"
                className={`block h-16 w-14 overflow-hidden border ${index === active ? "border-ink" : "border-line"}`}
                aria-pressed={index === active}
                aria-label={image.alt}
                onClick={() => setActive(index)}
              >
                <ProductFrame
                  src={image.src}
                  alt=""
                  position={image.position}
                  sizes="56px"
                  caption={false}
                  fillParent
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
