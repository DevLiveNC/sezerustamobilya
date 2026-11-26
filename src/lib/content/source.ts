import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { CategoryKey, ProductSlug } from "@/lib/domain/brand";
import { asProductSlug } from "@/lib/domain/brand";
import type { Product } from "@/lib/domain/product";
import type { FaqItem, ManifestImage, Reference } from "@/lib/domain/reference";
import { loadCatalogue, type Catalogue } from "@/lib/content/load";

/**
 * JSON files today. A headless CMS implements the same {@link ContentSource}
 * and is selected where the pages call `jsonContentSource`.
 * Next.js 16 caches this read with `use cache` + `cacheLife("hours")`
 * (the route-level `revalidate` export is not available when Cache Components are on).
 */
export interface ContentSource {
  getProducts(): Promise<Product[]>;
  getProduct(slug: ProductSlug | string): Promise<Product | null>;
  getProductsByCategory(category: CategoryKey): Promise<Product[]>;
  getReferences(): Promise<Reference[]>;
  getFaq(): Promise<FaqItem[]>;
  getImages(): Promise<ManifestImage[]>;
  getCatalogue(): Promise<Catalogue>;
}

export async function getCatalogue(): Promise<Catalogue> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalogue");
  return loadCatalogue();
}

export const jsonContentSource: ContentSource = {
  getCatalogue,
  async getProducts() {
    return (await getCatalogue()).products;
  },
  async getProduct(slug) {
    const branded = asProductSlug(slug);
    const products = await this.getProducts();
    return products.find((product) => product.slug === branded) ?? null;
  },
  async getProductsByCategory(category) {
    const products = await this.getProducts();
    return products.filter((product) => product.category === category);
  },
  async getReferences() {
    return (await getCatalogue()).references;
  },
  async getFaq() {
    return (await getCatalogue()).faq;
  },
  async getImages() {
    return (await getCatalogue()).images;
  },
};
