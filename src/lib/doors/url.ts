import * as z from "zod/mini";
import type { DoorConfig, DoorModel } from "@/lib/domain";
import { defaultDoorDraft, type DoorDraft } from "@/lib/doors/engine";

const querySchema = z.object({
  v: z.optional(z.string()),
  g: z.optional(z.string()),
  y: z.optional(z.string()),
  a: z.optional(z.string()),
  r: z.optional(z.string()),
  k: z.optional(z.string()),
  d: z.optional(z.string()),
});

export interface ParsedDoorUrl {
  draft: DoorDraft;
  notice: string | null;
}

function readNumber(raw: string | undefined): number | undefined | null {
  if (raw === undefined || raw === "") return undefined;
  const value = Number(raw.replace(",", "."));
  if (!Number.isFinite(value)) return null;
  return value;
}

export function parseDoorQuery(search: string | URLSearchParams, model: DoorModel): ParsedDoorUrl {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  const parsed = querySchema.safeParse(Object.fromEntries(params.entries()));
  const fallback = defaultDoorDraft(model);
  if (!parsed.success) {
    return { draft: fallback, notice: "Adres satırı okunamadı, örnek ölçüye dönüldü." };
  }
  const data = parsed.data;
  const version = data.v ?? "1";
  if (version !== "1" && version !== "0") {
    return { draft: fallback, notice: "Bağlantının sürümü tanınmadı. Örnek ölçüye dönüldü." };
  }

  const notices: string[] = [];
  if (version === "0") notices.push("Bağlantı güncellendi.");
  const draft: DoorDraft = { ...fallback };

  const width = readNumber(data.g);
  if (width === null) notices.push("Genişlik okunamadı, örnek ölçüye dönüldü.");
  else if (width !== undefined) draft.widthCm = width;

  const height = readNumber(data.y);
  if (height === null) notices.push("Yükseklik okunamadı, örnek ölçüye dönüldü.");
  else if (height !== undefined) draft.heightCm = height;

  if (data.a !== undefined && data.a !== "") draft.opening = data.a;
  if (data.r !== undefined) draft.colourId = data.r;
  if (data.k !== undefined && data.k !== "") draft.frameId = data.k;

  const wall = readNumber(data.d);
  if (wall === null) notices.push("Duvar kalınlığı okunamadı.");
  else if (wall !== undefined) draft.wallThicknessCm = wall;

  return { draft, notice: notices.length > 0 ? notices.join(" ") : null };
}

export function writeDoorQuery(config: DoorConfig | DoorDraft, version = 1): string {
  const params = new URLSearchParams();
  params.set("v", String(version));
  if (config.widthCm !== undefined) params.set("g", String(config.widthCm));
  if (config.heightCm !== undefined) params.set("y", String(config.heightCm));
  if (config.opening) params.set("a", config.opening);
  if (config.colourId) params.set("r", config.colourId);
  if (config.frameId) params.set("k", config.frameId);
  if (config.wallThicknessCm !== undefined) params.set("d", String(config.wallThicknessCm));
  return params.toString();
}
