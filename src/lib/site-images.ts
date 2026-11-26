import site from "../../content/images/site.json";

export interface SiteImage {
  id: string;
  src: string;
  width: number;
  height: number;
  kind: "illustrative";
  alt: string;
  position: "left" | "center" | "right";
}

export const siteImages: readonly SiteImage[] = site.images.map((image) => ({
  ...image,
  kind: "illustrative" as const,
  position: image.position === "left" || image.position === "right" ? image.position : "center",
}));

export type SiteImageId = (typeof site.images)[number]["id"];

export function siteImage(id: SiteImageId): SiteImage {
  const found = siteImages.find((image) => image.id === id);
  if (!found) throw new Error(`Temsilî görsel yok: ${id}`);
  return found;
}

export const heroImageIds = ["hero-1", "hero-2", "hero-3"] as const satisfies readonly SiteImageId[];
