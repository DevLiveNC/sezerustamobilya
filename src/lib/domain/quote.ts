import type { ProductSlug } from "@/lib/domain/brand";
import type { Dimensions, DoorOpening } from "@/lib/domain/product";

export interface DoorConfig {
  widthCm: number;
  heightCm: number;
  opening: DoorOpening;
  colourId: string;
  frameId: string;
  /** Required only when the chosen frame asks for wall thickness. */
  wallThicknessCm?: number;
}

export type QuoteLine =
  | { type: "carved-piece"; slug: ProductSlug }
  | { type: "door"; slug: ProductSlug; config: DoorConfig; qty: number }
  | { type: "custom"; description: string; dimensions: Dimensions; photoCount: number };
