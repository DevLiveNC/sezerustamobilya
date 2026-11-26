import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { prepareOwnerPhoto } from "../src/lib/content/images";
import { readFileSync } from "node:fs";

/**
 * Reads owner photos from incoming/, strips metadata by re-encoding,
 * writes AVIF + WebP + a blur hash, and prints manifest entries to add.
 * Does not invent alt text.
 */
async function main(): Promise<void> {
  const incoming = path.join(process.cwd(), "incoming");
  const outDir = path.join(process.cwd(), "public/media");
  mkdirSync(outDir, { recursive: true });
  const names = readdirSync(incoming).filter((name) => /\.(jpe?g|png|webp|heic|tif)$/i.test(name));
  if (names.length === 0) {
    console.log("incoming/ boş. Sahip fotoğrafı gelince bu komutu yeniden çalıştırın.");
    return;
  }
  const entries = [];
  for (const name of names) {
    const input = readFileSync(path.join(incoming, name));
    const prepared = await prepareOwnerPhoto(input);
    const id = name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    writeFileSync(path.join(outDir, `${id}.avif`), prepared.avif);
    writeFileSync(path.join(outDir, `${id}.webp`), prepared.webp);
    entries.push({
      id,
      src: `/media/${id}.avif`,
      width: prepared.width,
      height: prepared.height,
      blurDataURL: prepared.blurDataURL,
      credit: "sahip",
      isPlaceholder: false,
    });
    console.log(`${name} → public/media/${id}.avif`);
  }
  const stamp = path.join(process.cwd(), "incoming/manifest-ek.json");
  writeFileSync(stamp, JSON.stringify({ images: entries }, null, 2));
  console.log(`Manifest parçası yazıldı: ${stamp}`);
  console.log("Alt metinleri Türkçe yazıp content/images/manifest.json dosyasına elle ekleyin.");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
