import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/lib/site-images";

export function AtmosphereVisual({
  image,
  ready,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  image: SiteImage;
  ready: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={cn("relative overflow-hidden bg-oak", className)}>
      {ready ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          {...(priority ? { fetchPriority: "high" as const } : {})}
          className={
            image.position === "left"
              ? "object-cover object-left"
              : image.position === "right"
                ? "object-cover object-right"
                : "object-cover object-center"
          }
        />
      ) : (
        <div className="absolute inset-0" role="img" aria-label="Temsilî görsel. Dosya henüz eklenmedi.">
          <svg className="h-full w-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="600" height="400" fill="#E3D2B6" />
            <g fill="none" stroke="#211B16" strokeWidth="1.2" opacity="0.35">
              <path d="M0 70C140 40 240 100 360 70S520 40 600 78" />
              <path d="M0 150C160 130 260 190 380 150S520 120 600 160" />
              <path d="M0 230C120 250 250 200 370 230S510 260 600 220" />
              <path d="M0 310C150 290 270 340 400 310S530 290 600 320" />
            </g>
            <rect x="48" y="48" width="28" height="1.5" fill="#4A3426" />
            <rect x="48" y="48" width="1.5" height="28" fill="#4A3426" />
          </svg>
        </div>
      )}
      <figcaption className="pointer-events-none absolute bottom-2 right-2 bg-linen/85 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-walnut">
        Temsilî görsel
      </figcaption>
    </figure>
  );
}
