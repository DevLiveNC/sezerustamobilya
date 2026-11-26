/** Values that are safe to ship to the browser. The second phone line is not here. */

export const publicBusiness = {
  name: "Sezer Usta Mobilya",
  tagline: "El oyma sanatı ve mobilya ustası.",
  location: "Büyük Sanayi, Gazimağusa, Kuzey Kıbrıs",
  locality: "Gazimağusa",
  region: "Kuzey Kıbrıs",
  district: "Büyük Sanayi",
  phoneDisplay: "+90 533 833 64 81",
  phoneE164: "+905338336481",
  phoneTel: "tel:+905338336481",
  whatsappBase: "https://wa.me/905338336481",
  studioName: "liveDevelopment",
  studioUrl: "https://livedevelopment.dev",
} as const;

export function whatsappHref(text?: string): string {
  if (!text) return publicBusiness.whatsappBase;
  return `${publicBusiness.whatsappBase}?text=${encodeURIComponent(text)}`;
}

/** Empty or anything other than the exact string "false" keeps the preview ribbon and noindex. */
export function isPreviewMode(): boolean {
  return process.env.PREVIEW_MODE !== "false";
}

export function siteUrl(): URL {
  const raw = process.env.SITE_URL?.trim();
  if (raw) return new URL(raw);
  return new URL("http://localhost:3000");
}
