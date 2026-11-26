import type { CategoryKey, ProductSlug } from "@/lib/domain/brand";

export interface Dimensions {
  widthCm: number | null;
  heightCm: number | null;
  depthCm: number | null;
}

export type ImageRole =
  | "hero"
  | "front"
  | "angle"
  | "detail"
  | "scale"
  | "process"
  | "before"
  | "after";

export interface ImageRef {
  id: string;
  alt: string;
  role: ImageRole;
}

export interface Money {
  amount: number;
  currency: "TRY";
}

export interface SeoFields {
  title?: string;
  description?: string;
}

export interface ProductBase {
  slug: ProductSlug;
  category: CategoryKey;
  title: string;
  summary: string;
  images: ImageRef[];
  isSample: boolean;
  confirmedByOwner: boolean;
  seo?: SeoFields;
  publishedAt: string;
  /** Present in the model for a later price. This build never renders it. */
  price?: Money;
}

export type PieceType = "sandik" | "ayna-cercevesi" | "dolap" | "diger";
export type Availability = "mevcut" | "satildi" | "rezerve";

export interface CarvedPiece extends ProductBase {
  kind: "carved-piece";
  pieceType: PieceType;
  wood: string | null;
  finish: string | null;
  dimensions: Dimensions;
  availability: Availability;
  carvingDetailImageId?: string;
}

export type DoorMaterial = "melamin" | "pvc";

export interface DoorColour {
  id: string;
  /** Owner’s colour name, or a placeholder until the kartela arrives. */
  label: string;
}

export interface SizeAxis {
  min: number;
  max: number;
  step: number;
  standard: number[];
}

export interface DoorSizeRules {
  widthCm: SizeAxis;
  heightCm: SizeAxis;
  wallThicknessCm?: { min: number; max: number };
  isSample: boolean;
}

export type DoorOpening = "sol-ice" | "sag-ice" | "sol-disa" | "sag-disa";

export interface FrameOption {
  id: string;
  label: string;
  requiresWallThickness: boolean;
  /** When set, this frame narrows the model’s width range. */
  widthCm?: { min: number; max: number };
  heightCm?: { min: number; max: number };
}

export interface DoorSale {
  retail: boolean;
  wholesale: boolean;
  wholesaleMinQty: number | null;
}

export interface DoorModel extends ProductBase {
  kind: "door-model";
  material: DoorMaterial;
  modelCode: string | null;
  colours: DoorColour[];
  sizeRules: DoorSizeRules;
  openings: DoorOpening[];
  frameOptions: FrameOption[];
  sale: DoorSale;
  warranty: string | null;
}

export interface CustomWork extends ProductBase {
  kind: "custom-work";
  workType: string;
  steps: { title: string; body: string }[];
  referenceIds: string[];
}

export type Product = CarvedPiece | DoorModel | CustomWork;

export function assertNever(value: never, label = "beklenmeyen tür"): never {
  throw new Error(`${label}: ${JSON.stringify(value)}`);
}
