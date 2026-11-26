import type { ReactNode } from "react";
import { slotForRole, type PhotoSlot } from "@/config/slots";
import { cn } from "@/lib/cn";

export function OwnerTodo({ children, onDark = false }: { children: string; onDark?: boolean }) {
  return <span className={onDark ? "todo todo-dark" : "todo"}>[SAHİP DOLDURACAK: {children}]</span>;
}

export function SectionHeader({
  index,
  end,
  onDark = false,
}: {
  index: string;
  end?: string;
  onDark?: boolean;
}) {
  return (
    <div className={cn("mb-8 flex items-center gap-3.5 md:mb-10", onDark && "text-shaving")}>
      <span className="font-mono text-[12px] tracking-[0.12em]">{index}</span>
      <svg className="h-[11px] min-w-8 flex-1" viewBox="0 0 100 11" preserveAspectRatio="none" aria-hidden="true">
        <path
          data-draw="true"
          d="M0 5.5 H100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {end ? (
        <span className={cn("font-mono text-[11px] tracking-[0.08em]", onDark ? "text-shaving/70" : "text-ink-soft")}>
          {end}
        </span>
      ) : null}
    </div>
  );
}

export function PlaceholderFrame({
  slot,
  label,
  dark = false,
  className,
  ratio,
}: {
  slot: PhotoSlot;
  label?: string;
  dark?: boolean;
  className?: string;
  ratio?: string;
}) {
  const ratioValue = ratio ?? slot.ratio.replace(":", " / ");
  return (
    <figure
      className={cn("relative", className)}
      style={{ aspectRatio: ratioValue, background: dark ? "rgb(242 234 223 / 0.06)" : "var(--color-oak)" }}
      role="img"
      aria-label={`Fotoğraf atölyeden gelecek. ${slot.brief}`}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0 L100 100 M100 0 L0 100" fill="none" stroke={dark ? "rgb(242 234 223 / 0.28)" : "var(--color-line)"} strokeWidth="0.4" />
      </svg>
      <CropMarks dark={dark} />
      <figcaption className="pointer-events-none absolute inset-0">
        <span className={cn("absolute left-3 top-2.5 font-mono text-[10px] tracking-[0.08em]", dark ? "text-shaving/70" : "text-walnut")}>
          {label ?? slot.id}
        </span>
        <span className={cn("absolute bottom-2.5 right-3 font-mono text-[10px] tracking-[0.08em]", dark ? "text-shaving/70" : "text-walnut")}>
          {slot.ratio}
        </span>
        <span
          className={cn(
            "absolute left-1/2 top-1/2 w-[min(82%,280px)] -translate-x-1/2 -translate-y-1/2 border px-4 py-3.5 text-center",
            dark ? "border-line/40 bg-walnut text-shaving" : "border-line bg-linen text-ink",
          )}
        >
          <span className="block font-mono text-[12px] font-medium tracking-[0.14em]">FOTOĞRAF ATÖLYEDEN GELECEK</span>
          <span className={cn("mt-1.5 block font-mono text-[10.5px] leading-snug tracking-[0.04em]", dark ? "text-shaving/70" : "text-ink-soft")}>
            {slot.ratio} · min {slot.min}
            <br />
            {slot.brief}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function CropMarks({ dark }: { dark: boolean }) {
  const color = dark ? "var(--color-shaving)" : "var(--color-ink)";
  const mark = "absolute h-[22px] w-[22px]";
  return (
    <>
      <i className={`${mark} -left-3.5 -top-3.5 border-l border-t`} style={{ borderColor: color }} />
      <i className={`${mark} -right-3.5 -top-3.5 border-r border-t`} style={{ borderColor: color }} />
      <i className={`${mark} -bottom-3.5 -left-3.5 border-b border-l`} style={{ borderColor: color }} />
      <i className={`${mark} -bottom-3.5 -right-3.5 border-b border-r`} style={{ borderColor: color }} />
    </>
  );
}

export function StatusBadge({ status }: { status: "bekleniyor" | "mevcut" | "satildi" | "rezerve" }) {
  const label = { bekleniyor: "Durum bekleniyor", mevcut: "Mevcut", satildi: "Satıldı", rezerve: "Rezerve" }[status];
  const tone = {
    bekleniyor: "border-dashed border-ink-soft text-ink-soft",
    mevcut: "border-olive text-olive",
    satildi: "border-sold text-ink",
    rezerve: "border-walnut text-walnut",
  }[status];
  const dot = {
    bekleniyor: "bg-ink-soft",
    mevcut: "bg-olive",
    satildi: "bg-sold",
    rezerve: "bg-walnut",
  }[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[11px] tracking-[0.1em]", tone)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} aria-hidden="true" />
      {label}
    </span>
  );
}

export function frameForImageRole(role: string) {
  return slotForRole(role);
}

export function SpecRows({ rows }: { rows: { label: string; value: ReactNode }[] }) {
  return (
    <dl>
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[110px_1fr] gap-3 border-t border-line py-2.5 text-[15px]">
          <dt className="pt-0.5 font-mono text-[11px] tracking-[0.12em] text-ink-soft">{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
