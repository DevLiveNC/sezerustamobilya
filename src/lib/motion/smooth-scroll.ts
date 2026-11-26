import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Lenis from "lenis";

let lenis: Lenis | null = null;
let booted = false;
let overlayCount = 0;
let removeTicker: (() => void) | null = null;
let motion: gsap.Context | null = null;

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function startSmoothScroll(): () => void {
  if (booted || reducedMotion()) return stopSmoothScroll;
  booted = true;
  gsap.registerPlugin(ScrollTrigger, Flip);
  gsap.ticker.lagSmoothing(0);
  lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  const onTick = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(onTick);
  removeTicker = () => gsap.ticker.remove(onTick);
  if (overlayCount > 0) lenis.stop();
  playDrawings();
  return stopSmoothScroll;
}

export function stopSmoothScroll(): void {
  motion?.revert();
  motion = null;
  removeTicker?.();
  removeTicker = null;
  lenis?.destroy();
  lenis = null;
  booted = false;
}

export function scrollToTop(): void {
  if (reducedMotion() || !lenis) {
    window.scrollTo(0, 0);
    return;
  }
  lenis.scrollTo(0, { immediate: true });
}

export function onRouteChange(): void {
  scrollToTop();
  if (booted) playDrawings();
}

export function setOverlay(open: boolean): void {
  overlayCount = Math.max(0, overlayCount + (open ? 1 : -1));
  if (!lenis) return;
  if (overlayCount > 0) lenis.stop();
  else lenis.start();
}

export function playDrawings(): void {
  motion?.revert();
  motion = null;
  if (reducedMotion()) return;
  document.documentElement.classList.add("js-motion");
  motion = gsap.context(() => {
    gsap.utils.toArray<SVGGeometryElement>("[data-draw]").forEach((shape) => {
      const length = typeof shape.getTotalLength === "function" ? shape.getTotalLength() : 1;
      gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(shape, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "none",
        scrollTrigger: { trigger: shape, start: "top 85%" },
      });
    });
    gsap.utils.toArray<HTMLElement>("[data-wipe]").forEach((node) => {
      gsap.to(node, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: node, start: "top 80%" },
      });
    });
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
      gsap.fromTo(
        node,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 88%" },
        },
      );
    });
    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((node) => {
      gsap.fromTo(
        node,
        { yPercent: -3 },
        {
          yPercent: 3,
          ease: "none",
          scrollTrigger: { trigger: node, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
  });
}

export { Flip, gsap };
