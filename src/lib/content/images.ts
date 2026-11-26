import sharp from "sharp";

export interface PreparedPhoto {
  width: number;
  height: number;
  avif: Buffer;
  webp: Buffer;
  blurDataURL: string;
}

/**
 * Re-encode an owner photo. Sharp drops EXIF (including GPS) unless
 * `withMetadata` is called — we never call it.
 */
export async function prepareOwnerPhoto(input: Buffer): Promise<PreparedPhoto> {
  const base = sharp(input, { failOn: "none" }).rotate();
  const meta = await base.metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (width < 1 || height < 1) {
    throw new Error("Görsel boyutu okunamadı");
  }
  const [avif, webp, blur] = await Promise.all([
    base.clone().avif({ quality: 62 }).toBuffer(),
    base.clone().webp({ quality: 78 }).toBuffer(),
    base.clone().resize({ width: 16 }).webp({ quality: 40 }).toBuffer(),
  ]);
  const written = await sharp(webp).metadata();
  if (written.exif) {
    throw new Error("EXIF çıktıya taşındı; konum bilgisi silinemedi");
  }
  return {
    width,
    height,
    avif,
    webp,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
}
