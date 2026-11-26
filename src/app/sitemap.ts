import type { MetadataRoute } from "next";
import { categories } from "@/config/categories";
import { isPreviewMode, siteUrl } from "@/config/public";
import { jsonContentSource } from "@/lib/content/source";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (isPreviewMode()) return [];
  const origin = siteUrl().origin;
  const products = await jsonContentSource.getProducts();
  const staticPaths = [
    "/",
    "/hakkimizda",
    "/urunler",
    "/referanslar",
    "/teklif",
    "/iletisim",
    "/olcu-rehberi",
    "/sss",
    "/gizlilik",
    "/kisisel-veriler",
  ];
  return [
    ...staticPaths.map((path) => ({ url: `${origin}${path}` })),
    ...categories.map((category) => ({ url: `${origin}${category.href}` })),
    ...products.map((product) => ({
      url: `${origin}${product.kind === "door-model" ? `/kapi-yapilandir/${product.slug}` : `/urun/${product.slug}`}`,
    })),
  ];
}
