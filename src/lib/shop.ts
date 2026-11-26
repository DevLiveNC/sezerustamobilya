import type { ManifestImage } from "@/lib/domain/reference";
import type { PieceType, Product } from "@/lib/domain/product";
import { featuredCarved } from "@/lib/catalog-view";
import { cardPicture } from "@/lib/product-pictures";

export type ShopBadge = "TEK PARÇA" | "SATILDI" | "ÖRNEK" | "KAPI" | "ÖZEL";

export interface ShopCard {
  slug: string;
  href: string;
  title: string;
  typeLine: string;
  badge: ShopBadge;
  kind: Product["kind"];
  availability: string | null;
  image: { src: string; alt: string; width: number; height: number; position: "left" | "center" | "right" } | null;
}

const pieceLabel: Record<PieceType, string> = {
  sandik: "Sandık",
  "ayna-cercevesi": "Ayna çerçevesi",
  dolap: "Dolap",
  diger: "Tek parça",
};

export function toShopCard(product: Product, images: readonly ManifestImage[]): ShopCard {
  const href = product.kind === "door-model" ? `/kapi-yapilandir/${product.slug}` : `/urun/${product.slug}`;
  const sold = product.kind === "carved-piece" && product.availability === "satildi";
  const badge: ShopBadge = sold
    ? "SATILDI"
    : product.isSample
      ? "ÖRNEK"
      : product.kind === "carved-piece"
        ? "TEK PARÇA"
        : product.kind === "door-model"
          ? "KAPI"
          : "ÖZEL";
  const typeLine =
    product.kind === "carved-piece"
      ? `El oyması · ${pieceLabel[product.pieceType]}`
      : product.kind === "door-model"
        ? product.material === "melamin"
          ? "Melamin kapı"
          : "PVC kapı"
        : "Özel üretim";
  return {
    slug: product.slug,
    href,
    title: product.title,
    typeLine,
    badge,
    kind: product.kind,
    availability: product.kind === "carved-piece" ? product.availability : null,
    image: cardPicture(product, images),
  };
}

export type ShopTab = "yeni" | "one-cikan" | "kapilar";

export function cardsForTab(products: readonly Product[], tab: ShopTab, images: readonly ManifestImage[]): ShopCard[] {
  if (tab === "kapilar") {
    return products.filter((product) => product.kind === "door-model").map((product) => toShopCard(product, images));
  }
  if (tab === "one-cikan") {
    return featuredCarved(products)
      .filter((piece) => piece.availability !== "satildi")
      .slice(0, 8)
      .map((product) => toShopCard(product, images));
  }
  return [...products]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 8)
    .map((product) => toShopCard(product, images));
}

export function groupTitle(products: readonly Product[], pieceType: PieceType): string | null {
  const match = products.find((product) => product.kind === "carved-piece" && product.pieceType === pieceType);
  if (!match) return null;
  return match.title.replace(/\s+—\s+örnek kayıt$/i, "");
}
