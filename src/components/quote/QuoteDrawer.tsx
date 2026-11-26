"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useQuote } from "@/lib/quote/store";

export function QuoteDrawer() {
  const open = useQuote((state) => state.drawer);
  const setDrawer = useQuote((state) => state.setDrawer);
  const lines = useQuote((state) => state.lines);
  const flags = useQuote((state) => state.flags);
  const notice = useQuote((state) => state.notice);
  const remove = useQuote((state) => state.remove);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="m-0 ml-auto h-full max-h-none w-[min(100%,420px)] border-l border-line bg-linen p-0 text-ink"
      aria-labelledby="teklif-baslik"
      onClose={() => setDrawer(false)}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="teklif-baslik" className="font-serif text-2xl">
            Teklif listesi
          </h2>
          <button type="button" className="min-h-11 px-3" onClick={() => setDrawer(false)}>
            Kapat
          </button>
        </div>
        <div className="flex-1 overflow-auto px-5 py-4">
          <p className="text-sm text-walnut" role="status">
            {notice}
          </p>
          {lines.length === 0 ? (
            <p className="mt-4 text-ink-soft">Listeniz boş. Bir parçayı veya bir kapı ölçüsünü ekleyin.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="border-b border-line pb-3">
                  <p className="font-medium">{line.type === "custom" ? line.description : line.title}</p>
                  {line.type === "door" ? <p className="text-sm text-ink-soft">{line.qty} adet</p> : null}
                  {flags[line.key] ? <p className="text-sm text-walnut">{flags[line.key]}</p> : null}
                  <button type="button" className="mt-1 text-sm underline" onClick={() => remove(line.key)}>
                    Çıkar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-line p-5">
          <Link className="btn btn-primary w-full" href="/teklif" onClick={() => setDrawer(false)}>
            Teklif iste
          </Link>
        </div>
      </div>
    </dialog>
  );
}
