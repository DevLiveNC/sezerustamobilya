import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { prepareOwnerPhoto } from "@/lib/content/images";

describe("prepareOwnerPhoto", () => {
  it("re-encodes and does not keep EXIF", async () => {
    const input = await sharp({
      create: { width: 32, height: 20, channels: 3, background: "#8a6244" },
    })
      .jpeg()
      .toBuffer();
    const prepared = await prepareOwnerPhoto(input);
    expect(prepared.width).toBe(32);
    expect(prepared.height).toBe(20);
    expect(prepared.avif.byteLength).toBeGreaterThan(0);
    expect(prepared.webp.byteLength).toBeGreaterThan(0);
    expect(prepared.blurDataURL.startsWith("data:image/webp;base64,")).toBe(true);
    const meta = await sharp(prepared.webp).metadata();
    expect(meta.exif).toBeUndefined();
  });
});
