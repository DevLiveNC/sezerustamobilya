"use client";

import { useEffect, useRef, useState } from "react";
import { AtmosphereVisual } from "@/components/media/AtmosphereVisual";
import type { SiteImage } from "@/lib/site-images";

export interface HeroSlide extends SiteImage {
  ready: boolean;
}

export function HeroSlider({ slides }: { slides: readonly HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const node = regionRef.current;
    const sync = () => {
      node?.setAttribute("data-autoplay", media.matches || paused ? "off" : "on");
    };
    sync();
    if (media.matches || paused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    media.addEventListener("change", sync);
    return () => {
      window.clearInterval(timer);
      media.removeEventListener("change", sync);
    };
  }, [paused, slides.length]);

  function go(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <div
      ref={regionRef}
      className="absolute inset-0"
      role="region"
      aria-roledescription="slayt"
      aria-label="Atölye görselleri"
      tabIndex={0}
      data-autoplay="on"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(index - 1);
        }
      }}
    >
      {slides.map((slide, slideIndex) =>
        slideIndex === index || slideIndex === 0 ? (
          <div
            key={slide.id}
            className={slideIndex === index ? "absolute inset-0" : "absolute inset-0 invisible"}
            aria-hidden={slideIndex !== index}
          >
            <AtmosphereVisual
              image={slide}
              ready={slide.ready}
              className="h-full w-full"
              priority={slideIndex === 0}
              sizes="100vw"
            />
          </div>
        ) : null,
      )}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Slayt ${slideIndex + 1}`}
            aria-current={slideIndex === index ? "true" : undefined}
            className={`h-11 w-11 rounded-full border border-shaving ${slideIndex === index ? "bg-shaving" : "bg-ink/30"}`}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
        <button type="button" className="min-h-11 bg-ink/70 px-3 text-xs font-medium text-shaving" onClick={() => setPaused((value) => !value)}>
          {paused ? "Sürdür" : "Durdur"}
        </button>
      </div>
    </div>
  );
}
