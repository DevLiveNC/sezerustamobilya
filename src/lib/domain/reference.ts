import type { ProductSlug } from "@/lib/domain/brand";
import type { ImageRef } from "@/lib/domain/product";

export interface Reference {
  id: string;
  title: string;
  location: string | null;
  year: number | null;
  images: ImageRef[];
  productSlugs: ProductSlug[];
  beforeAfter?: { before: ImageRef; after: ImageRef };
  /** Must be true to render. */
  clientConsent: boolean;
  isSample: boolean;
}

export type ImageCredit = "sahip" | "liveDevelopment-cekim" | "placeholder";

export interface ManifestImage {
  id: string;
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  focalPoint?: { x: number; y: number };
  credit: ImageCredit;
  isPlaceholder: boolean;
  kind?: "illustrative";
  position?: "left" | "center" | "right";
  slot?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isSample: boolean;
}
