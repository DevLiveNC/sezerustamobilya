import { describe, expect, it } from "vitest";
import { dimensionText, featuredCarved, statusView } from "@/lib/catalog-view";
import { asProductSlug } from "@/lib/domain/brand";
import type { CarvedPiece } from "@/lib/domain/product";

function piece(partial: Partial<CarvedPiece> & Pick<CarvedPiece, "slug" | "availability" | "confirmedByOwner">): CarvedPiece {
  return {
    kind: "carved-piece",
    category: "el-oymasi",
    title: partial.slug,
    summary: "örnek",
    images: [],
    isSample: true,
    publishedAt: "2026-11-26",
    pieceType: "sandik",
    wood: null,
    finish: null,
    dimensions: { widthCm: null, heightCm: null, depthCm: null },
    ...partial,
  };
}

describe("catalog view", () => {
  it("does not invent a measurement", () => {
    expect(dimensionText({ widthCm: null, heightCm: null, depthCm: null })).toContain("işletmeden bekleniyor");
  });

  it("shows an unconfirmed piece as waiting, and sold as sold", () => {
    const waiting = piece({ slug: asProductSlug("a"), availability: "mevcut", confirmedByOwner: false });
    const sold = piece({ slug: asProductSlug("b"), availability: "satildi", confirmedByOwner: false });
    expect(statusView(waiting).label).toBe("Durum bekleniyor");
    expect(statusView(sold).label).toBe("Satıldı");
    expect(featuredCarved([sold, waiting])[0]?.slug).toBe(asProductSlug("a"));
  });
});
