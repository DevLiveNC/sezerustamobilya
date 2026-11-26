"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function CarvingViewer({ label, children }: { label: string; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    void import("@/lib/motion/smooth-scroll").then((mod) => mod.setOverlay(true));
    return () => {
      void import("@/lib/motion/smooth-scroll").then((mod) => mod.setOverlay(false));
    };
  }, [open]);

  function change(next: number) {
    setZoom(Math.min(4, Math.max(1, Math.round(next * 10) / 10)));
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-ghost mb-4"
        onClick={() => {
          setZoom(1);
          setOpen(true);
          dialogRef.current?.showModal();
        }}
      >
        Yakından bak
      </button>
      {children}
      <dialog
        ref={dialogRef}
        className="h-[min(100%,860px)] w-[min(100%,960px)] border border-line bg-linen p-4"
        aria-label={label}
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "+" || event.key === "=") change(zoom + 0.2);
          if (event.key === "-" || event.key === "_") change(zoom - 0.2);
          if (event.key === "0") change(1);
        }}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <p tabIndex={0} aria-live="polite">Yakınlaştırma %{Math.round(zoom * 100)}</p>
          <button type="button" className="min-h-11 px-3" onClick={() => dialogRef.current?.close()}>
            Kapat
          </button>
        </div>
        <p className="mb-3 text-sm text-ink-soft">Fotoğraf atölyeden gelene kadar yer tutucu yakınlaşır. Tekerlek veya + / − kullanın.</p>
        <div
          tabIndex={0}
          className="max-h-[70vh] overflow-auto outline-none"
          onWheel={(event) => {
            event.preventDefault();
            change(zoom + (event.deltaY < 0 ? 0.2 : -0.2));
          }}
        >
          <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}>{children}</div>
        </div>
      </dialog>
    </div>
  );
}
