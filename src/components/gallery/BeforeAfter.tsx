"use client";

import { useState } from "react";

/** Shown only when both photographs exist and the client has consented. */
export function BeforeAfter({ beforeLabel, afterLabel }: { beforeLabel: string; afterLabel: string }) {
  const [value, setValue] = useState(40);
  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden border border-line bg-oak">
        <div className="absolute inset-0 grid place-items-center px-6 text-center font-mono text-[12px] tracking-[0.08em] text-walnut">
          {afterLabel}
        </div>
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r border-ink bg-linen"
          style={{ width: `${value}%` }}
        >
          <div className="grid h-full place-items-center px-6 text-center font-mono text-[12px] tracking-[0.08em] text-ink">
            {beforeLabel}
          </div>
        </div>
      </div>
      <label className="mt-3 block font-mono text-[11px] tracking-[0.08em] text-ink-soft">
        Önce / sonra
        <input
          className="mt-2 block w-full"
          type="range"
          min={0}
          max={100}
          value={value}
          aria-valuetext={`%${value} önce`}
          onChange={(event) => setValue(Number(event.target.value))}
        />
      </label>
    </figure>
  );
}
