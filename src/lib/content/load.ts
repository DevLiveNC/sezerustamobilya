import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { asProductSlug, type ProductSlug } from "@/lib/domain/brand";
import type { Product } from "@/lib/domain/product";
import type { FaqItem, ManifestImage, Reference } from "@/lib/domain/reference";
import {
  faqSchema,
  manifestSchema,
  productSchema,
  referenceSchema,
  type FaqInput,
  type ManifestInput,
  type ProductInput,
  type ReferenceInput,
} from "@/lib/content/schema";

export interface Catalogue {
  products: Product[];
  /** References the site may render (`clientConsent: true` only). */
  references: Reference[];
  excludedReferences: Reference[];
  faq: FaqItem[];
  images: ManifestImage[];
  warnings: string[];
}

const forbiddenNeedles = ["KK" + "TC", "+90 533 885 36 24", "+905338853624", "533 885 36 24"];

function readJson(file: string): unknown {
  let text: string;
  try {
    text = readFileSync(file, "utf8");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${path.relative(process.cwd(), file)}: dosya okunamadı (${message})`);
  }
  try {
    return JSON.parse(text) as unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${path.relative(process.cwd(), file)}: JSON ayrıştırılamadı (${message})`);
  }
}

function jsonFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => path.join(dir, name));
}

function formatIssue(file: string, error: z.ZodError): string {
  const rel = path.relative(process.cwd(), file);
  return `${rel}: geçersiz içerik\n${z.prettifyError(error)}`;
}

function parseFile<T>(file: string, schema: z.ZodType<T>, errors: string[]): T | null {
  const data = readJson(file);
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    errors.push(formatIssue(file, parsed.error));
    return null;
  }
  return parsed.data;
}

function onStep(value: number, min: number, step: number): boolean {
  const steps = (value - min) / step;
  return Math.abs(steps - Math.round(steps)) < 1e-6;
}

function walkStrings(value: unknown, visit: (text: string, path: string) => void, trail = ""): void {
  if (typeof value === "string") {
    visit(value, trail);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkStrings(item, visit, `${trail}[${index}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      walkStrings(item, visit, trail ? `${trail}.${key}` : key);
    }
  }
}

function toProduct(input: ProductInput): Product {
  return { ...input, slug: asProductSlug(input.slug) } as Product;
}

function toReference(input: ReferenceInput): Reference {
  return {
    ...input,
    productSlugs: input.productSlugs.map((slug) => asProductSlug(slug)),
  } as Reference;
}

function collectImageIds(product: Product, into: { id: string; where: string }[]): void {
  for (const image of product.images) {
    into.push({ id: image.id, where: `${product.slug} görseli` });
  }
  if (product.kind === "carved-piece" && product.carvingDetailImageId) {
    into.push({ id: product.carvingDetailImageId, where: `${product.slug} oyma detayı` });
  }
}

export function loadCatalogue(root = process.cwd()): Catalogue {
  const contentDir = path.join(root, "content");
  const errors: string[] = [];
  const warnings: string[] = [];

  const productInputs: ProductInput[] = [];
  for (const file of [
    ...jsonFiles(path.join(contentDir, "products")),
    ...jsonFiles(path.join(contentDir, "doors")),
  ]) {
    const parsed = parseFile(file, productSchema, errors);
    if (parsed) productInputs.push(parsed);
  }

  const referenceInputs: ReferenceInput[] = [];
  for (const file of jsonFiles(path.join(contentDir, "references"))) {
    const parsed = parseFile(file, referenceSchema, errors);
    if (parsed) referenceInputs.push(parsed);
  }

  const faqFile = path.join(contentDir, "faq.json");
  const faqRaw = existsSync(faqFile) ? readJson(faqFile) : [];
  const faqParsed = z.array(faqSchema).safeParse(faqRaw);
  const faqInputs: FaqInput[] = [];
  if (!faqParsed.success) errors.push(formatIssue(faqFile, faqParsed.error));
  else faqInputs.push(...faqParsed.data);

  const manifestFile = path.join(contentDir, "images", "manifest.json");
  const manifestRaw = existsSync(manifestFile) ? readJson(manifestFile) : { images: [] };
  const manifestParsed = manifestSchema.safeParse(manifestRaw);
  let manifest: ManifestInput = { images: [] };
  if (!manifestParsed.success) errors.push(formatIssue(manifestFile, manifestParsed.error));
  else manifest = manifestParsed.data;

  if (errors.length > 0) {
    throw new Error(`İçerik doğrulaması başarısız:\n\n${errors.join("\n\n")}`);
  }

  const products = productInputs.map(toProduct);
  const allReferences = referenceInputs.map(toReference);
  const images = manifest.images;

  const slugs = new Set<string>();
  for (const product of products) {
    if (slugs.has(product.slug)) errors.push(`slug birden fazla: ${product.slug}`);
    slugs.add(product.slug);
    if (product.kind === "carved-piece" && product.category !== "el-oymasi") {
      errors.push(`${product.slug}: el oyması kaydı el-oymasi kategorisinde olmalı`);
    }
    if (product.kind === "custom-work" && product.category !== "ozel-uretim") {
      errors.push(`${product.slug}: özel üretim kaydı ozel-uretim kategorisinde olmalı`);
    }
    if (product.kind === "door-model") {
      const expected = product.material === "melamin" ? "melamin-kapi" : "pvc-kapi";
      if (product.category !== expected) {
        errors.push(`${product.slug}: malzeme ile kategori uyuşmuyor (${expected})`);
      }
      checkDoorRules(product, errors);
    }
  }

  const imageIds = new Set<string>();
  for (const image of images) {
    if (imageIds.has(image.id)) errors.push(`görsel kimliği birden fazla: ${image.id}`);
    imageIds.add(image.id);
    if (image.isPlaceholder) {
      if (image.credit !== "placeholder") {
        errors.push(`${image.id}: yer tutucunun credit değeri placeholder olmalı`);
      }
    } else if (image.credit === "placeholder") {
      errors.push(`${image.id}: gerçek görsel placeholder olarak işaretlenemez`);
    } else {
      const relative = image.src.replace(/^\//, "");
      const file = path.join(root, "public", relative);
      if (!image.src || !existsSync(file)) {
        errors.push(`${image.id}: görsel dosyası yok (${image.src || "src boş"})`);
      }
    }
  }

  const imageUses: { id: string; where: string }[] = [];
  for (const product of products) collectImageIds(product, imageUses);

  const referenceIds = new Set<string>();
  for (const reference of allReferences) {
    if (referenceIds.has(reference.id)) errors.push(`referans kimliği birden fazla: ${reference.id}`);
    referenceIds.add(reference.id);
    for (const image of reference.images) {
      imageUses.push({ id: image.id, where: `referans ${reference.id}` });
    }
    if (reference.beforeAfter) {
      imageUses.push({ id: reference.beforeAfter.before.id, where: `referans ${reference.id} önce` });
      imageUses.push({ id: reference.beforeAfter.after.id, where: `referans ${reference.id} sonra` });
    }
    for (const slug of reference.productSlugs) {
      if (!slugs.has(slug)) errors.push(`referans ${reference.id}: ürün yok (${slug})`);
    }
    if (!reference.clientConsent) {
      warnings.push(
        `referans ${reference.id} clientConsent false olduğu için sitede gösterilmeyecek`,
      );
    }
  }

  for (const product of products) {
    if (product.kind !== "custom-work") continue;
    for (const id of product.referenceIds) {
      if (!referenceIds.has(id)) errors.push(`${product.slug}: referans yok (${id})`);
    }
  }

  for (const use of imageUses) {
    if (!imageIds.has(use.id)) errors.push(`${use.where}: görsel manifestte yok (${use.id})`);
  }

  const texts: unknown[] = [products, allReferences, faqInputs, images];
  for (const value of texts) {
    walkStrings(value, (text, trail) => {
      for (const needle of forbiddenNeedles) {
        if (text.includes(needle)) errors.push(`${trail}: yasak ifade (${needle})`);
      }
    });
  }

  if (errors.length > 0) {
    throw new Error(`İçerik doğrulaması başarısız:\n\n${errors.join("\n")}`);
  }

  const references = allReferences.filter((reference) => reference.clientConsent);
  return {
    products,
    references,
    excludedReferences: allReferences.filter((reference) => !reference.clientConsent),
    faq: faqInputs,
    images,
    warnings,
  };
}

function checkDoorRules(product: Extract<Product, { kind: "door-model" }>, errors: string[]): void {
  const { sizeRules, frameOptions, openings, colours } = product;
  checkAxis(product.slug, "genişlik", sizeRules.widthCm, errors);
  checkAxis(product.slug, "yükseklik", sizeRules.heightCm, errors);
  if (sizeRules.wallThicknessCm && sizeRules.wallThicknessCm.min > sizeRules.wallThicknessCm.max) {
    errors.push(`${product.slug}: duvar kalınlığı aralığı ters`);
  }
  const needsWall = frameOptions.some((frame) => frame.requiresWallThickness);
  if (needsWall && !sizeRules.wallThicknessCm) {
    errors.push(`${product.slug}: duvar kalınlığı isteyen kasa var ama aralık tanımlı değil`);
  }
  const openingSet = new Set(openings);
  if (openingSet.size !== openings.length) errors.push(`${product.slug}: açılım yönü tekrar ediyor`);
  const colourIds = new Set<string>();
  for (const colour of colours) {
    if (colourIds.has(colour.id)) errors.push(`${product.slug}: renk kimliği tekrar (${colour.id})`);
    colourIds.add(colour.id);
  }
  const frameIds = new Set<string>();
  for (const frame of frameOptions) {
    if (frameIds.has(frame.id)) errors.push(`${product.slug}: kasa kimliği tekrar (${frame.id})`);
    frameIds.add(frame.id);
    for (const [label, range] of [
      ["genişlik", frame.widthCm],
      ["yükseklik", frame.heightCm],
    ] as const) {
      if (!range) continue;
      if (range.min > range.max) errors.push(`${product.slug}: ${frame.id} ${label} aralığı ters`);
    }
  }
}

function checkAxis(
  slug: ProductSlug,
  label: string,
  axis: { min: number; max: number; step: number; standard: number[] },
  errors: string[],
): void {
  if (axis.min > axis.max) errors.push(`${slug}: ${label} min, max değerinden büyük`);
  for (const value of axis.standard) {
    if (value < axis.min || value > axis.max || !onStep(value, axis.min, axis.step)) {
      errors.push(
        `${slug}: ${label} standart değeri aralıkta ve adım üzerinde değil (${value})`,
      );
    }
  }
}

export function canShowBeforeAfter(
  reference: Reference,
  images: readonly ManifestImage[],
): boolean {
  if (!reference.clientConsent || !reference.beforeAfter) return false;
  const before = images.find((image) => image.id === reference.beforeAfter?.before.id);
  const after = images.find((image) => image.id === reference.beforeAfter?.after.id);
  return Boolean(before && after && !before.isPlaceholder && !after.isPlaceholder);
}
