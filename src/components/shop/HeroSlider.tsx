"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
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
              captionClassName="bottom-3 left-3 bg-linen px-2 py-1 text-ink md:bottom-4 md:left-auto md:right-4"
            />
          </div>
        ) : null,
      )}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-end pr-1 md:justify-center md:pr-0">
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <button
              key={slide.id}
              type="button"
              aria-label={`Slayt ${slideIndex + 1}`}
              aria-current={active ? "true" : undefined}
              className="inline-flex items-center justify-center p-[18px]"
              onClick={() => setIndex(slideIndex)}
            >
              <span
                className={`block h-2 w-2 rounded-full ${active ? "bg-ink ring-2 ring-linen" : "bg-linen ring-1 ring-ink"}`}
              />
            </button>
          );
        })}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center"
          aria-label={paused ? "Sürdür" : "Durdur"}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-linen">
            {paused ? <Play className="h-3 w-3 fill-current" aria-hidden="true" /> : <Pause className="h-3 w-3 fill-current" aria-hidden="true" />}
          </span>
        </button>
      </div>
    </div>
  );
}
