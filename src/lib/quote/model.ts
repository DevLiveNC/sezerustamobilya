import type { DoorConfig, Dimensions, ProductSlug } from "@/lib/domain";

export interface CarvedLine {
  type: "carved-piece";
  key: string;
  slug: ProductSlug;
  title: string;
}

export interface DoorLine {
  type: "door";
  key: string;
  slug: ProductSlug;
  title: string;
  config: DoorConfig;
  qty: number;
}

export interface CustomLine {
  type: "custom";
  key: string;
  description: string;
  dimensions: Dimensions;
  photoCount: number;
}

export type StoredLine = CarvedLine | DoorLine | CustomLine;

export interface QuoteSnapshot {
  version: 1;
  lines: StoredLine[];
  flags: Record<string, string>;
}

export const emptyQuote: QuoteSnapshot = { version: 1, lines: [], flags: {} };

export function doorLineKey(slug: string, config: DoorConfig): string {
  const raw = [
    slug,
    config.widthCm,
    config.heightCm,
    config.opening,
    config.colourId,
    config.frameId,
    config.wallThicknessCm ?? "",
  ].join("|");
  let hash = 5381;
  for (let index = 0; index < raw.length; index += 1) {
    hash = ((hash << 5) + hash) ^ raw.charCodeAt(index);
  }
  return `d${(hash >>> 0).toString(16)}`;
}

export interface AddResult {
  snapshot: QuoteSnapshot;
  notice: string | null;
  added: boolean;
}

export function addCarved(snapshot: QuoteSnapshot, line: Omit<CarvedLine, "key" | "type">, availability?: string): AddResult {
  const key = `c:${line.slug}`;
  if (snapshot.lines.some((item) => item.key === key)) {
    return {
      snapshot,
      added: false,
      notice: "Bu parça zaten listede. El oyması parçalar tektir.",
    };
  }
  const next: CarvedLine = { type: "carved-piece", key, ...line };
  return {
    added: true,
    notice: availability === "satildi" ? "Bu ürün satıldı olarak görünüyor. Listede duruyor, tekliften düşmüyoruz." : null,
    snapshot: flag(withLine(snapshot, next), key, availability),
  };
}

export function addDoor(
  snapshot: QuoteSnapshot,
  line: Omit<DoorLine, "key" | "type" | "qty"> & { qty: number },
): AddResult {
  const key = doorLineKey(line.slug, line.config);
  const existing = snapshot.lines.find((item): item is DoorLine => item.type === "door" && item.key === key);
  if (existing) {
    const qty = existing.qty + line.qty;
    return {
      added: true,
      notice: `Aynı ölçü zaten listedeydi. Adet ${qty} oldu.`,
      snapshot: {
        ...snapshot,
        lines: snapshot.lines.map((item) => (item.key === key && item.type === "door" ? { ...item, qty } : item)),
      },
    };
  }
  return {
    added: true,
    notice: null,
    snapshot: withLine(snapshot, { type: "door", key, ...line }),
  };
}

export function addCustom(snapshot: QuoteSnapshot, line: Omit<CustomLine, "key" | "type">): AddResult {
  const key = `x:${snapshot.lines.length}:${line.description.slice(0, 24)}`;
  return {
    added: true,
    notice: null,
    snapshot: withLine(snapshot, { type: "custom", key, ...line }),
  };
}

export function setDoorQty(snapshot: QuoteSnapshot, key: string, qty: number): QuoteSnapshot {
  return {
    ...snapshot,
    lines: snapshot.lines.flatMap((line) => {
      if (line.key !== key || line.type !== "door") return [line];
      if (qty < 1) return [];
      return [{ ...line, qty }];
    }),
  };
}

export function removeLine(snapshot: QuoteSnapshot, key: string): QuoteSnapshot {
  const flags = { ...snapshot.flags };
  delete flags[key];
  return { ...snapshot, lines: snapshot.lines.filter((line) => line.key !== key), flags };
}

export function applyAvailability(snapshot: QuoteSnapshot, availability: Record<string, string | undefined>): QuoteSnapshot {
  const flags: Record<string, string> = {};
  for (const line of snapshot.lines) {
    if (line.type === "custom") continue;
    const status = availability[line.slug];
    if (!status) flags[line.key] = "Bu kayıt artık katalogda yok.";
    else if (status === "satildi") flags[line.key] = "Bu ürün artık satıldı olarak görünüyor.";
    else if (status === "rezerve") flags[line.key] = "Bu ürün artık rezerve olarak görünüyor.";
  }
  return { ...snapshot, flags };
}

function withLine(snapshot: QuoteSnapshot, line: StoredLine): QuoteSnapshot {
  return { ...snapshot, lines: [...snapshot.lines, line] };
}

function flag(snapshot: QuoteSnapshot, key: string, availability?: string): QuoteSnapshot {
  if (availability !== "satildi" && availability !== "rezerve") return snapshot;
  const message =
    availability === "satildi"
      ? "Bu ürün artık satıldı olarak görünüyor."
      : "Bu ürün artık rezerve olarak görünüyor.";
  return { ...snapshot, flags: { ...snapshot.flags, [key]: message } };
}

export function migrateQuote(raw: unknown): QuoteSnapshot {
  if (!raw || typeof raw !== "object") return emptyQuote;
  const value = raw as { version?: unknown; lines?: unknown; items?: unknown; flags?: unknown };
  if (value.version === 1 && Array.isArray(value.lines)) {
    return { version: 1, lines: value.lines.filter(isLine), flags: isFlags(value.flags) ? value.flags : {} };
  }
  if ((value.version === 0 || value.version === undefined) && Array.isArray(value.items)) {
    const lines = value.items.flatMap((item): StoredLine[] => {
      if (!item || typeof item !== "object") return [];
      const record = item as { slug?: unknown; title?: unknown; qty?: unknown };
      if (typeof record.slug !== "string" || typeof record.title !== "string") return [];
      return [{ type: "carved-piece", key: `c:${record.slug}`, slug: record.slug as ProductSlug, title: record.title }];
    });
    return { version: 1, lines, flags: {} };
  }
  return emptyQuote;
}

function isLine(value: unknown): value is StoredLine {
  if (!value || typeof value !== "object") return false;
  const line = value as { type?: unknown; key?: unknown };
  return typeof line.key === "string" && (line.type === "carved-piece" || line.type === "door" || line.type === "custom");
}

function isFlags(value: unknown): value is Record<string, string> {
  return Boolean(value) && typeof value === "object";
}
