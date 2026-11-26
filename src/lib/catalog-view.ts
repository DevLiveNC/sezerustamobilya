import type { CarvedPiece, Dimensions, Product } from "@/lib/domain/product";

const roleOrder = ["hero", "front", "angle", "detail", "scale", "process", "before", "after"] as const;

export function orderedImages<T extends { role: string }>(images: readonly T[]): T[] {
  return [...images].sort(
    (a, b) =>
      roleOrder.indexOf(a.role as (typeof roleOrder)[number]) -
      roleOrder.indexOf(b.role as (typeof roleOrder)[number]),
  );
}

export function dimensionText(dimensions: Dimensions): string {
  const { widthCm, heightCm, depthCm } = dimensions;
  if (widthCm == null && heightCm == null && depthCm == null) {
    return "E — × B — × D — cm · işletmeden bekleniyor";
  }
  const n = (value: number | null) => (value == null ? "—" : String(value));
  return `E ${n(widthCm)} × B ${n(heightCm)} × D ${n(depthCm)} cm`;
}

export type StatusView = {
  key: "bekleniyor" | "mevcut" | "satildi" | "rezerve";
  label: string;
};

export function statusView(piece: CarvedPiece): StatusView {
  if (piece.availability === "satildi") return { key: "satildi", label: "Satıldı" };
  if (piece.availability === "rezerve") return { key: "rezerve", label: "Rezerve" };
  if (!piece.confirmedByOwner) return { key: "bekleniyor", label: "Durum bekleniyor" };
  return { key: "mevcut", label: "Mevcut" };
}

const rank: Record<StatusView["key"], number> = {
  mevcut: 0,
  bekleniyor: 1,
  rezerve: 2,
  satildi: 3,
};

export function featuredCarved(products: readonly Product[]): CarvedPiece[] {
  return products
    .filter((product): product is CarvedPiece => product.kind === "carved-piece")
    .sort((a, b) => rank[statusView(a).key] - rank[statusView(b).key] || a.title.localeCompare(b.title, "tr"));
}

export function relatedProducts(products: readonly Product[], current: Product, limit = 3): Product[] {
  return products
    .filter((product) => product.slug !== current.slug && product.category === current.category)
    .slice(0, limit);
}
