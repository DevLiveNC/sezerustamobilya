"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { markMotionStarted, motionStarted } from "@/lib/motion/gate";

export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let stop: (() => void) | undefined;
    const start = () => {
      void import("@/lib/motion/smooth-scroll").then((mod) => {
        if (cancelled) return;
        markMotionStarted();
        stop = mod.startSmoothScroll();
      });
    };
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    const idle = window.requestIdleCallback?.(start, { timeout: 1800 });
    const timer = idle === undefined ? window.setTimeout(start, 900) : undefined;
    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
      stop?.();
    };
  }, []);

  useEffect(() => {
    if (!motionStarted()) {
      window.scrollTo(0, 0);
      return;
    }
    void import("@/lib/motion/smooth-scroll").then((mod) => mod.onRouteChange());
  }, [pathname]);

  return null;
}
