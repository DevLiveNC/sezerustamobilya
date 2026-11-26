import type { DoorConfig } from "@/lib/domain";
import { openingLabel } from "@/lib/doors/engine";
import { publicBusiness } from "@/config/public";
import type { StoredLine } from "@/lib/quote/model";

const PREFIX = `${publicBusiness.whatsappBase}?text=`;
export const WHATSAPP_URL_LIMIT = 2000;

export interface QuoteMessageInput {
  lines: StoredLine[];
  origin: string;
  name: string;
  phone: string;
  city: string;
  contact: "whatsapp" | "arama";
  message: string;
  wholesale: boolean;
  photoCount: number;
}

export interface CompiledWhatsApp {
  href: string;
  text: string;
  summarized: boolean;
}

export function compileWhatsApp(input: QuoteMessageInput): CompiledWhatsApp {
  const full = fullText(input);
  const fullHref = hrefFor(full);
  if (fullHref.length <= WHATSAPP_URL_LIMIT) return { href: fullHref, text: full, summarized: false };
  const short = summaryText(input);
  return { href: fit(short), text: short, summarized: true };
}

function fullText(input: QuoteMessageInput): string {
  const lines = input.lines.map((line, index) => `${index + 1}. ${describe(line, input.origin)}`);
  return [
    "Sezer Usta Mobilya teklif talebi",
    "",
    ...lines,
    "",
    `Ad: ${input.name}`,
    `Telefon: ${input.phone}`,
    `İl / bölge: ${input.city}`,
    `İletişim: ${input.contact === "whatsapp" ? "WhatsApp" : "Arama"}`,
    input.wholesale ? "Toptan talep: evet" : "Toptan talep: hayır",
    input.photoCount > 0 ? `Fotoğraf: ${input.photoCount} adet, formda duruyor, mesaja eklenmedi.` : "Fotoğraf: yok",
    input.message ? `Mesaj: ${input.message}` : "Mesaj: yok",
    "Fiyat için teklif alın.",
  ].join("\n");
}

function summaryText(input: QuoteMessageInput): string {
  const doors = input.lines.filter((line) => line.type === "door").length;
  const carved = input.lines.filter((line) => line.type === "carved-piece").length;
  const custom = input.lines.filter((line) => line.type === "custom").length;
  return [
    "Sezer Usta Mobilya teklif talebi",
    `${input.lines.length} kalem (${doors} kapı, ${carved} el oyması, ${custom} özel).`,
    `Ad: ${input.name}`,
    `Telefon: ${input.phone}`,
    `İl / bölge: ${input.city}`,
    "Detaylar web formunda.",
  ].join("\n");
}

function describe(line: StoredLine, origin: string): string {
  if (line.type === "carved-piece") return `${line.title}\n${origin}/urun/${line.slug}`;
  if (line.type === "custom") {
    const size = [line.dimensions.widthCm, line.dimensions.heightCm, line.dimensions.depthCm]
      .map((value) => (value === null ? "—" : `${value} cm`))
      .join(" × ");
    return `Özel üretim: ${line.description} (${size})`;
  }
  return `${line.title}\n${doorSentence(line.config)} · ${line.qty} adet\n${origin}/kapi-yapilandir/${line.slug}?${query(line.config)}`;
}

function doorSentence(config: DoorConfig): string {
  const wall = config.wallThicknessCm !== undefined ? `, duvar ${config.wallThicknessCm} cm` : "";
  return `E ${config.widthCm} × B ${config.heightCm} cm, ${openingLabel(config.opening)}, renk: ${config.colourId}, kasa: ${config.frameId}${wall}`;
}

function query(config: DoorConfig): string {
  const params = new URLSearchParams({
    v: "1",
    g: String(config.widthCm),
    y: String(config.heightCm),
    a: config.opening,
    r: config.colourId,
    k: config.frameId,
  });
  if (config.wallThicknessCm !== undefined) params.set("d", String(config.wallThicknessCm));
  return params.toString();
}

function hrefFor(text: string): string {
  return PREFIX + encodeURIComponent(text);
}

function fit(text: string): string {
  let href = hrefFor(text);
  if (href.length <= WHATSAPP_URL_LIMIT) return href;
  let low = 0;
  let high = text.length;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    const candidate = hrefFor(`${text.slice(0, mid)}\nDetaylar web formunda.`);
    if (candidate.length <= WHATSAPP_URL_LIMIT) low = mid;
    else high = mid - 1;
  }
  href = hrefFor(`${text.slice(0, low)}\nDetaylar web formunda.`);
  return href;
}
