"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { toE164 } from "@/lib/quote/phone";
import { quoteRateLimit } from "@/lib/quote/rate-limit";
import { sendQuoteEmail } from "@/lib/quote/email";

const lineSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("carved-piece"),
    key: z.string(),
    slug: z.string(),
    title: z.string().min(1),
  }),
  z.object({
    type: z.literal("door"),
    key: z.string(),
    slug: z.string(),
    title: z.string().min(1),
    qty: z.number().int().positive().max(999),
    config: z.object({
      widthCm: z.number(),
      heightCm: z.number(),
      opening: z.enum(["sol-ice", "sag-ice", "sol-disa", "sag-disa"]),
      colourId: z.string(),
      frameId: z.string(),
      wallThicknessCm: z.number().optional(),
    }),
  }),
  z.object({
    type: z.literal("custom"),
    key: z.string(),
    description: z.string().min(1),
    dimensions: z.object({
      widthCm: z.number().nullable(),
      heightCm: z.number().nullable(),
      depthCm: z.number().nullable(),
    }),
    photoCount: z.number().int().min(0).max(5),
  }),
]);

const formSchema = z.object({
  name: z.string().trim().min(2, "Adınızı yazın."),
  phone: z.string().trim().min(1, "Telefonu yazın."),
  email: z.string().trim(),
  city: z.string().trim().min(2, "İl veya bölge yazın."),
  contact: z.enum(["whatsapp", "arama"], { error: "İletişim yolunu seçin." }),
  message: z.string().trim().max(2000, "Mesaj 2000 karakteri aşmasın."),
  wholesale: z.boolean(),
  photoCount: z.number().int().min(0).max(5),
  consent: z.literal(true, { error: "Kişisel verilerin işlenmesi için onay gerekir." }),
  website: z.string().max(0),
  lines: z.array(lineSchema).max(40),
});

export type QuoteActionResult =
  | { ok: true; channel: "whatsapp" }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

export async function submitQuote(_prev: QuoteActionResult | null, formData: FormData): Promise<QuoteActionResult> {
  const website = String(formData.get("website") ?? "");
  if (website.length > 0) return { ok: false, message: "Gönderilemedi." };

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limit = quoteRateLimit.take(ip);
  if (!limit.ok) {
    return { ok: false, message: `Çok sık denendi. ${limit.retryAfterSec} saniye sonra yeniden gönderin.` };
  }

  let lines: unknown = [];
  try {
    lines = JSON.parse(String(formData.get("lines") ?? "[]"));
  } catch {
    return { ok: false, message: "Liste okunamadı." };
  }
  let photoMeta: unknown = [];
  try {
    photoMeta = JSON.parse(String(formData.get("photoMeta") ?? "[]"));
  } catch {
    photoMeta = [];
  }

  const parsed = formSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    city: formData.get("city"),
    contact: formData.get("contact"),
    message: formData.get("message") ?? "",
    wholesale: formData.get("wholesale") === "on",
    photoCount: Number(formData.get("photoCount") ?? 0),
    consent: formData.get("consent") === "on" ? true : false,
    website: "",
    lines,
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, message: "Formu kontrol edin.", fieldErrors };
  }
  const phone = toE164(parsed.data.phone);
  if (!phone) return { ok: false, message: "Telefonu 05xx veya +90 ile yazın.", fieldErrors: { phone: "Telefonu 05xx veya +90 ile yazın." } };
  if (parsed.data.email && !z.email().safeParse(parsed.data.email).success) {
    return { ok: false, message: "E-posta adresini kontrol edin.", fieldErrors: { email: "E-posta adresini kontrol edin." } };
  }
  if (!Array.isArray(photoMeta)) return { ok: false, message: "Fotoğraf bilgisi okunamadı." };

  await sendQuoteEmail();
  if (process.env.NODE_ENV !== "production") {
    console.info("quote", {
      name: `${parsed.data.name.slice(0, 1)}…`,
      phoneTail: phone.slice(-2),
      lines: parsed.data.lines.length,
      photos: parsed.data.photoCount,
    });
  }
  return { ok: true, channel: "whatsapp" };
}
