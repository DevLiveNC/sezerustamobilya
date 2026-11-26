"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Copy, Download, Info, Minus, Plus } from "lucide-react";
import type { DoorModel, DoorOpening } from "@/lib/domain";
import { openingLabel, validateDoorConfig, type DoorDraft } from "@/lib/doors/engine";
import { parseDoorQuery, writeDoorQuery } from "@/lib/doors/url";
import { DoorElevation } from "@/components/doors/DoorElevation";
import { OwnerTodo } from "@/components/ui/Marks";

const OPENINGS: { id: DoorOpening; label: string }[] = [
  { id: "sol-ice", label: "Soldan içe" },
  { id: "sag-ice", label: "Sağdan içe" },
  { id: "sol-disa", label: "Soldan dışa" },
  { id: "sag-disa", label: "Sağdan dışa" },
];

export function DoorConfigurator({ model }: { model: DoorModel }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const query = search.toString();
  const parsed = useMemo(() => parseDoorQuery(query, model), [query, model]);
  const draft = parsed.draft;
  const result = useMemo(() => validateDoorConfig(model, draft), [model, draft]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [status, setStatus] = useState("");
  const [qty, setQty] = useState(1);
  const [widthText, setWidthText] = useState<string | null>(null);
  const [heightText, setHeightText] = useState<string | null>(null);
  const [wallText, setWallText] = useState<string | null>(null);
  const shown = useTween(draft.widthCm ?? 90, draft.heightCm ?? 210);

  function commit(patch: Partial<DoorDraft>, options?: { clearWall?: boolean }) {
    const next: DoorDraft = { ...draft, ...patch };
    if (options?.clearWall) delete next.wallThicknessCm;
    const nextQuery = writeDoorQuery(next);
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    setWidthText(null);
    setHeightText(null);
    setWallText(null);
  }

  const colour = model.colours.find((item) => item.id === draft.colourId);
  const frame = model.frameOptions.find((item) => item.id === draft.frameId);
  const opening = model.openings.find((item) => item === draft.opening) ?? "sag-ice";
  const materialLabel = model.material === "melamin" ? "Melamin" : "PVC";
  const summary = `${materialLabel} kapı, ${trim(shown.width)} × ${trim(shown.height)} cm, ${openingLabel(opening)}${colour ? `, renk: ${colour.label}` : ", renk seçilmedi"}.`;
  const fieldError = (field: string) => result.errors.find((issue) => issue.field === field)?.message;
  const fieldWarnings = (field: string) => result.warnings.filter((issue) => issue.field === field);

  async function copyLink() {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setStatus("Bağlantı kopyalandı. Aynı ölçü bu adreste durur.");
  }

  async function downloadPng() {
    const svg = svgRef.current;
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("width", "1560");
    clone.setAttribute("height", "1600");
    const xml = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1560;
      canvas.height = 1600;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.fillStyle = "#E3D2B6";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((png) => {
        if (!png) return;
        const file = URL.createObjectURL(png);
        const link = document.createElement("a");
        link.href = file;
        link.download = `${model.slug}-cizim.png`;
        link.click();
        URL.revokeObjectURL(file);
      }, "image/png");
    };
    image.src = url;
    setStatus("Çizim PNG olarak indiriliyor.");
  }

  const frameNeedsWall = frame?.requiresWallThickness === true;

  return (
    <div>
      <div className="grid border-b border-line lg:grid-cols-[minmax(0,7.4fr)_minmax(0,4.6fr)]">
        <div className="grid-paper border-b border-line p-5 lg:border-r lg:border-b-0 lg:p-8">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] tracking-[0.12em]">ÖN GÖRÜNÜŞ · CANLI ÇİZİM</p>
            {model.sizeRules.isSample ? (
              <span className="border border-line bg-linen px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-walnut">
                Ölçüler örnektir
              </span>
            ) : null}
          </div>
          <div ref={(node) => { svgRef.current = node?.querySelector("svg") ?? null; }}>
            <DoorElevation
              widthCm={shown.width}
              heightCm={shown.height}
              opening={opening}
              materialLabel={materialLabel}
              modelLabel={model.modelCode ?? "[SAHİP DOLDURACAK]"}
              colourLabel={colour?.label ?? "seçilmedi"}
              example={model.sizeRules.isSample}
              summary={summary}
            />
          </div>
          <p className="mt-4 text-sm text-ink-soft">{summary}</p>
          {parsed.notice ? (
            <p className="mt-3 text-sm text-walnut" role="status">
              {parsed.notice}
            </p>
          ) : null}
          <p className="mt-4 flex gap-2 text-sm text-ink-soft">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            Ölçü aralıkları örnektir; kesin ölçüler için teklif alın. Çizim ölçüye göre orantılı güncellenir.
          </p>
        </div>
        <form className="bg-linen px-5 py-2 lg:px-9" onSubmit={(event) => event.preventDefault()}>
          <section className="border-b border-line py-6">
            <StepHead index="01" title="Model" meta={materialLabel.toLocaleUpperCase("tr")} />
            <p className="mt-3 border border-ink bg-shaving px-4 py-3 text-sm">
              <OwnerTodo>model / seri adları</OwnerTodo>
            </p>
          </section>
          <section className="border-b border-line py-6">
            <StepHead index="02" title="Ölçü" meta="CM · KANAT ÖLÇÜSÜ" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <NumberField
                label="Genişlik (E)"
                value={widthText ?? String(draft.widthCm ?? "")}
                onChange={setWidthText}
                onCommit={(value) => commit({ widthCm: value })}
                onStep={(delta) => commit({ widthCm: (draft.widthCm ?? 0) + delta })}
                error={fieldError("widthCm")}
              />
              <NumberField
                label="Yükseklik (B)"
                value={heightText ?? String(draft.heightCm ?? "")}
                onChange={setHeightText}
                onCommit={(value) => commit({ heightCm: value })}
                onStep={(delta) => commit({ heightCm: (draft.heightCm ?? 0) + delta })}
                error={fieldError("heightCm")}
              />
            </div>
            {fieldWarnings("widthCm")
              .concat(fieldWarnings("heightCm"))
              .map((issue) => (
                <p key={issue.message} className="mt-3 text-sm text-walnut" role="status">
                  {issue.message}
                </p>
              ))}
            {frameNeedsWall ? (
              <div className="mt-4">
                <NumberField
                  label="Duvar kalınlığı (cm)"
                  value={wallText ?? String(draft.wallThicknessCm ?? "")}
                  onChange={setWallText}
                  onCommit={(value) => commit({ wallThicknessCm: value })}
                  onStep={(delta) => commit({ wallThicknessCm: (draft.wallThicknessCm ?? 10) + delta })}
                  error={fieldError("wallThicknessCm")}
                />
              </div>
            ) : null}
          </section>
          <section className="border-b border-line py-6">
            <StepHead index="03" title="Açılım yönü" meta="İÇTEN BAKIŞ" />
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Açılım yönü">
              {OPENINGS.map((item) => {
                const allowed = model.openings.includes(item.id);
                const selected = draft.opening === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={!allowed}
                    className={`border px-2 py-3 text-center text-xs font-medium ${selected ? "border-ink bg-linen shadow-[inset_0_0_0_1px_#211B16]" : "border-line bg-shaving"} disabled:opacity-40`}
                    onClick={() => commit({ opening: item.id })}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            {fieldError("opening") ? <p className="mt-3 text-sm text-danger" role="alert">{fieldError("opening")}</p> : null}
          </section>
          <section className="border-b border-line py-6">
            <StepHead index="04" title="Renk / desen" meta={colour ? "SEÇİLDİ" : "SEÇİLMEDİ"} />
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6" role="radiogroup" aria-label="Renk">
              {model.colours.map((item) => {
                const selected = draft.colourId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={item.label}
                    className={`aspect-square border border-dashed bg-shaving ${selected ? "border-ink" : "border-line"}`}
                    onClick={() => commit({ colourId: item.id })}
                  />
                );
              })}
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Kartela işletmeden gelecek: <OwnerTodo>renk ve desen kartelası</OwnerTodo>
            </p>
            {fieldError("colourId") ? <p className="mt-2 text-sm text-danger" role="alert">{fieldError("colourId")}</p> : null}
          </section>
          <section className="border-b border-line py-6">
            <StepHead index="05" title="Kasa · kulp · kilit" meta="AKSESUAR" />
            <div className="mt-4 grid gap-2" role="radiogroup" aria-label="Kasa">
              {model.frameOptions.map((item) => {
                const selected = draft.frameId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={`flex items-center justify-between border px-3 py-3 text-left text-sm ${selected ? "border-ink bg-linen" : "border-line bg-shaving"}`}
                    onClick={() => commit({ frameId: item.id }, { clearWall: !item.requiresWallThickness })}
                  >
                    <span className="font-mono text-[10px] tracking-[0.1em] text-ink-soft">KASA</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Kulp ve kilit: <OwnerTodo>seçenekler</OwnerTodo>
            </p>
            {fieldError("frameId") ? <p className="mt-2 text-sm text-danger" role="alert">{fieldError("frameId")}</p> : null}
          </section>
          <section className="py-6">
            <StepHead index="06" title="Adet" meta="TOPTAN İŞARETİ OTOMATİK" />
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="grid h-14 w-36 grid-cols-[44px_1fr_44px] border border-ink bg-shaving">
                <button type="button" aria-label="Adedi azalt" className="grid place-items-center" onClick={() => setQty((value) => Math.max(1, value - 1))}>
                  <Minus className="size-4" />
                </button>
                <span className="grid place-items-center font-mono text-xl">{qty}</span>
                <button type="button" aria-label="Adedi artır" className="grid place-items-center" onClick={() => setQty((value) => value + 1)}>
                  <Plus className="size-4" />
                </button>
              </div>
              <p className="max-w-xs text-sm text-ink-soft">
                Toptan en az <OwnerTodo>adet</OwnerTodo> — bu adedin üstü toptan talep olarak işaretlenir.
              </p>
            </div>
          </section>
          </form>
      </div>
      <div className="bg-walnut text-shaving">
        <div className="wrap flex flex-col gap-4 py-6 lg:h-24 lg:flex-row lg:items-center lg:justify-between lg:py-0">
          <p className="font-mono text-xs leading-relaxed tracking-wide">
            {materialLabel.toLocaleUpperCase("tr")} · E {trim(draft.widthCm ?? 0)} × B {trim(draft.heightCm ?? 0)} CM
            {model.sizeRules.isSample ? " (ÖRNEK)" : ""} · {openingLabel(opening).toLocaleUpperCase("tr")} ·{" "}
            {colour ? colour.label : "RENK SEÇİLMEDİ"} · {qty} ADET
            <br />
            <span className="text-shaving/70">Fiyat için teklif alın · çizim teklife eklenir</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-ghost-dark" onClick={() => void copyLink()}>
              <Copy className="size-4" aria-hidden /> Bağlantıyı kopyala
            </button>
            <button type="button" className="btn btn-ghost-dark" onClick={() => void downloadPng()}>
              <Download className="size-4" aria-hidden /> Çizimi PNG indir
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                if (!result.valid) {
                  setStatus(result.errors[0]?.message ?? "Ölçüyü düzeltin.");
                  return;
                }
                setStatus(`Ölçü doğrulandı, ${qty} adet. Teklif listesine ekleme sıradaki adımda bağlanacak.`);
              }}
            >
              <Plus className="size-4" aria-hidden /> Teklif listesine ekle
            </button>
          </div>
        </div>
      </div>
      <p className="wrap py-3 text-sm text-walnut" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}

function StepHead({ index, title, meta }: { index: string; title: string; meta: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h2 className="font-serif text-[22px] font-normal">
        <span className="mr-3 font-mono text-[11px] tracking-[0.12em]">{index}</span>
        {title}
      </h2>
      <span className="font-mono text-[11px] tracking-[0.06em] text-ink-soft">{meta}</span>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  onCommit,
  onStep,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onCommit: (value: number) => void;
  onStep: (delta: number) => void;
  error: string | undefined;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10.5px] tracking-[0.1em] text-ink-soft">{label}</span>
      <span className={`grid h-14 grid-cols-[44px_1fr_44px] border bg-shaving focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-varnish ${error ? "border-danger" : "border-ink"}`}>
        <button type="button" aria-label={`${label} azalt`} className="grid place-items-center" onClick={() => onStep(-1)}>
          <Minus className="size-4" />
        </button>
        <input
          className="bg-transparent text-center font-mono text-xl outline-none"
          inputMode="decimal"
          value={value}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
          onBlur={() => {
            const next = Number(value.replace(",", "."));
            if (Number.isFinite(next)) onCommit(next);
          }}
        />
        <button type="button" aria-label={`${label} artır`} className="grid place-items-center" onClick={() => onStep(1)}>
          <Plus className="size-4" />
        </button>
      </span>
      {error ? <span className="mt-2 block text-sm text-danger" role="alert">{error}</span> : null}
    </label>
  );
}

function useTween(width: number, height: number): { width: number; height: number } {
  const current = useRef({ width, height });
  const [shown, setShown] = useState({ width, height });
  useEffect(() => {
    const from = current.current;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 350);
      const eased = 1 - (1 - t) ** 3;
      const next = {
        width: from.width + (width - from.width) * eased,
        height: from.height + (height - from.height) * eased,
      };
      current.current = next;
      setShown(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [width, height]);
  return shown;
}

function trim(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}
