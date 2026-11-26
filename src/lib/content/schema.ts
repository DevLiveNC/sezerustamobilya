import { z } from "zod";

export const imageRoleSchema = z.enum([
  "hero",
  "front",
  "angle",
  "detail",
  "scale",
  "process",
  "before",
  "after",
]);

export const imageRefSchema = z.strictObject({
  id: z.string().min(1),
  alt: z.string().min(1),
  role: imageRoleSchema,
});

const moneySchema = z.strictObject({
  amount: z.number().nonnegative(),
  currency: z.literal("TRY"),
});

const seoSchema = z.strictObject({
  title: z.exactOptional(z.string().min(1)),
  description: z.exactOptional(z.string().min(1)),
});

const dimensionsSchema = z.strictObject({
  widthCm: z.number().positive().nullable(),
  heightCm: z.number().positive().nullable(),
  depthCm: z.number().positive().nullable(),
});

const categorySchema = z.enum(["el-oymasi", "melamin-kapi", "pvc-kapi", "ozel-uretim"]);

const sizeAxisSchema = z.strictObject({
  min: z.number().positive(),
  max: z.number().positive(),
  step: z.number().positive(),
  standard: z.array(z.number().positive()).min(1),
});

const rangeSchema = z.strictObject({
  min: z.number().positive(),
  max: z.number().positive(),
});

function productFields<T extends z.ZodRawShape>(shape: T) {
  return z.strictObject({
    slug: z.string().min(1),
    category: categorySchema,
    title: z.string().min(1),
    summary: z.string().min(1),
    images: z.array(imageRefSchema),
    isSample: z.boolean(),
    confirmedByOwner: z.boolean(),
    seo: z.exactOptional(seoSchema),
    publishedAt: z.iso.date(),
    price: z.exactOptional(moneySchema),
    ...shape,
  });
}

export const carvedPieceSchema = productFields({
  kind: z.literal("carved-piece"),
  pieceType: z.enum(["sandik", "ayna-cercevesi", "dolap", "diger"]),
  wood: z.string().min(1).nullable(),
  finish: z.string().min(1).nullable(),
  dimensions: dimensionsSchema,
  availability: z.enum(["mevcut", "satildi", "rezerve"]),
  carvingDetailImageId: z.exactOptional(z.string().min(1)),
});

export const doorModelSchema = productFields({
  kind: z.literal("door-model"),
  material: z.enum(["melamin", "pvc"]),
  modelCode: z.string().min(1).nullable(),
  colours: z.array(
    z.strictObject({
      id: z.string().min(1),
      label: z.string().min(1),
    }),
  ),
  sizeRules: z.strictObject({
    widthCm: sizeAxisSchema,
    heightCm: sizeAxisSchema,
    wallThicknessCm: z.exactOptional(rangeSchema),
    isSample: z.boolean(),
  }),
  openings: z.array(z.enum(["sol-ice", "sag-ice", "sol-disa", "sag-disa"])).min(1),
  frameOptions: z
    .array(
      z.strictObject({
        id: z.string().min(1),
        label: z.string().min(1),
        requiresWallThickness: z.boolean(),
        widthCm: z.exactOptional(rangeSchema),
        heightCm: z.exactOptional(rangeSchema),
      }),
    )
    .min(1),
  sale: z.strictObject({
    retail: z.boolean(),
    wholesale: z.boolean(),
    wholesaleMinQty: z.number().int().positive().nullable(),
  }),
  warranty: z.string().min(1).nullable(),
});

export const customWorkSchema = productFields({
  kind: z.literal("custom-work"),
  workType: z.string().min(1),
  steps: z
    .array(
      z.strictObject({
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .min(1),
  referenceIds: z.array(z.string().min(1)),
});

export const productSchema = z.discriminatedUnion("kind", [
  carvedPieceSchema,
  doorModelSchema,
  customWorkSchema,
]);

export const referenceSchema = z.strictObject({
  id: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1).nullable(),
  year: z.number().int().min(1900).max(2100).nullable(),
  images: z.array(imageRefSchema),
  productSlugs: z.array(z.string().min(1)),
  beforeAfter: z.exactOptional(
    z.strictObject({
      before: imageRefSchema,
      after: imageRefSchema,
    }),
  ),
  clientConsent: z.boolean(),
  isSample: z.boolean(),
});

export const faqSchema = z.strictObject({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  isSample: z.boolean(),
});

export const manifestImageSchema = z.strictObject({
  id: z.string().min(1),
  src: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  blurDataURL: z.string().min(1),
  focalPoint: z.exactOptional(
    z.strictObject({
      x: z.number().min(0).max(1),
      y: z.number().min(0).max(1),
    }),
  ),
  credit: z.enum(["sahip", "liveDevelopment-cekim", "placeholder"]),
  isPlaceholder: z.boolean(),
  kind: z.exactOptional(z.literal("illustrative")),
  position: z.exactOptional(z.enum(["left", "center", "right"])),
  slot: z.exactOptional(z.string().min(1)),
});

export const manifestSchema = z.strictObject({
  images: z.array(manifestImageSchema),
});

export type ProductInput = z.infer<typeof productSchema>;
export type ReferenceInput = z.infer<typeof referenceSchema>;
export type FaqInput = z.infer<typeof faqSchema>;
export type ManifestInput = z.infer<typeof manifestSchema>;
