export type { CategoryKey, CategorySlug, ProductSlug, Slug } from "@/lib/domain/brand";
export { asCategorySlug, asProductSlug, categoryKeys, isCategoryKey } from "@/lib/domain/brand";
export type {
  Availability,
  CarvedPiece,
  CustomWork,
  Dimensions,
  DoorColour,
  DoorMaterial,
  DoorModel,
  DoorOpening,
  DoorSale,
  DoorSizeRules,
  FrameOption,
  ImageRef,
  ImageRole,
  Money,
  PieceType,
  Product,
  ProductBase,
  SeoFields,
  SizeAxis,
} from "@/lib/domain/product";
export { assertNever } from "@/lib/domain/product";
export type { DoorConfig, QuoteLine } from "@/lib/domain/quote";
export type { FaqItem, ImageCredit, ManifestImage, Reference } from "@/lib/domain/reference";
