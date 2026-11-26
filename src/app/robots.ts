import type { MetadataRoute } from "next";
import { isPreviewMode, siteUrl } from "@/config/public";

export default function robots(): MetadataRoute.Robots {
  if (isPreviewMode()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/glif-test" },
    sitemap: new URL("/sitemap.xml", siteUrl()).toString(),
  };
}
