/** Branded string so a product slug cannot be passed where a category slug is expected. */
export type Slug<T extends string> = string & { readonly __brand: T };

export type CategorySlug = Slug<"Category">;
export type ProductSlug = Slug<"Product">;

export function asCategorySlug(value: string): CategorySlug {
  return value as CategorySlug;
}

export function asProductSlug(value: string): ProductSlug {
  return value as ProductSlug;
}

export const categoryKeys = ["el-oymasi", "melamin-kapi", "pvc-kapi", "ozel-uretim"] as const;

export type CategoryKey = (typeof categoryKeys)[number];

export function isCategoryKey(value: string): value is CategoryKey {
  return (categoryKeys as readonly string[]).includes(value);
}
