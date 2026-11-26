import { orderedImages } from "@/lib/catalog-view";
import type { ManifestImage } from "@/lib/domain/reference";
import type { Product } from "@/lib/domain/product";

export interface ShownPicture {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  role: string;
  position: "left" | "center" | "right";
}

function shown(file: ManifestImage, alt: string, role: string): ShownPicture | null {
  if (file.isPlaceholder || !file.src) return null;
  return {
    id: file.id,
    src: file.src,
    alt,
    width: file.width,
    height: file.height,
    role,
    position: file.position ?? "center",
  };
}

export function shownPictures(product: Product, images: readonly ManifestImage[]): ShownPicture[] {
  const byId = new Map(images.map((image) => [image.id, image]));
  return orderedImages(product.images).flatMap((ref) => {
    const file = byId.get(ref.id);
    if (!file) return [];
    const picture = shown(file, ref.alt, ref.role);
    return picture ? [picture] : [];
  });
}

export function pictureById(id: string | undefined, alt: string, images: readonly ManifestImage[]): ShownPicture | null {
  if (!id) return null;
  const file = images.find((image) => image.id === id);
  if (!file) return null;
  return shown(file, alt, "detail");
}

export function cardPicture(product: Product, images: readonly ManifestImage[]): ShownPicture | null {
  const pictures = shownPictures(product, images);
  return pictures.find((picture) => picture.role === "front") ?? pictures[0] ?? null;
}
