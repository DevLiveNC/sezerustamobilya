import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { siteImage, type SiteImageId } from "@/lib/site-images";

export function isSiteImageReady(id: SiteImageId): boolean {
  const image = siteImage(id);
  return existsSync(path.join(process.cwd(), "public", image.src.replace(/^\//, "")));
}
