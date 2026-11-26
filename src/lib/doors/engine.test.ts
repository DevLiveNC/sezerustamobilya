import { describe, expect, it } from "vitest";
import type { DoorModel } from "@/lib/domain";
import { defaultDoorDraft, validateDoorConfig } from "@/lib/doors/engine";
import { parseDoorQuery, writeDoorQuery } from "@/lib/doors/url";

function model(overrides: Partial<DoorModel> = {}): DoorModel {
  return {
    slug: "test-kapi" as DoorModel["slug"],
    kind: "door-model",
    category: "melamin-kapi",
    title: "Deneme kapı",
    summary: "Deneme.",
    publishedAt: "2026-11-26",
    material: "melamin",
    modelCode: null,
    sizeRules: {
      isSample: true,
      widthCm: { min: 60, max: 100, step: 1, standard: [70, 80, 90] },
      heightCm: { min: 190, max: 220, step: 1, standard: [200, 210] },
      wallThicknessCm: { min: 8, max: 30 },
    },
    openings: ["sol-ice", "sag-ice", "sol-disa", "sag-disa"],
    colours: [{ id: "ornek", label: "[SAHİP DOLDURACAK: renk adı]" }],
    frameOptions: [
      { id: "kasa", label: "Kasa", requiresWallThickness: false },
      {
        id: "pervaz",
        label: "Pervaz",
        requiresWallThickness: true,
        widthCm: { min: 70, max: 90 },
      },
    ],
    sale: { retail: true, wholesale: true, wholesaleMinQty: null },
    warranty: null,
    images: [],
    isSample: true,
    confirmedByOwner: false,
    ...overrides,
  };
}

describe("validateDoorConfig", () => {
  it("accepts a standard sample configuration", () => {
    const result = validateDoorConfig(model(), {
      widthCm: 90,
      heightCm: 210,
      opening: "sag-ice",
      colourId: "ornek",
      frameId: "kasa",
    });
    expect(result.valid).toBe(true);
    expect(result.normalized).toEqual({
      widthCm: 90,
      heightCm: 210,
      opening: "sag-ice",
      colourId: "ornek",
      frameId: "kasa",
    });
  });

  it("snaps to the step and says so", () => {
    const stepped = model({
      sizeRules: {
        isSample: false,
        widthCm: { min: 60, max: 100, step: 10, standard: [70, 80, 90] },
        heightCm: { min: 190, max: 220, step: 10, standard: [200, 210] },
      },
    });
    const result = validateDoorConfig(stepped, {
      widthCm: 89,
      heightCm: 210,
      opening: "sol-ice",
      colourId: "ornek",
      frameId: "kasa",
    });
    expect(result.valid).toBe(true);
    expect(result.normalized?.widthCm).toBe(90);
    expect(result.warnings.some((issue) => issue.message === "89 cm → 90 cm olarak yuvarlandı.")).toBe(true);
  });

  it("rejects a width past the frame limit with the gap", () => {
    const result = validateDoorConfig(model(), {
      widthCm: 94,
      heightCm: 210,
      opening: "sag-ice",
      colourId: "ornek",
      frameId: "pervaz",
      wallThicknessCm: 12,
    });
    expect(result.valid).toBe(false);
    expect(result.errors.find((issue) => issue.field === "widthCm")?.message).toContain("en fazla 90 cm");
    expect(result.errors.find((issue) => issue.field === "widthCm")?.message).toContain("4 cm azaltın");
  });

  it("requires wall thickness only for the frame that asks for it", () => {
    const missing = validateDoorConfig(model(), {
      widthCm: 80,
      heightCm: 200,
      opening: "sag-disa",
      colourId: "ornek",
      frameId: "pervaz",
    });
    expect(missing.errors.some((issue) => issue.field === "wallThicknessCm")).toBe(true);
    const present = validateDoorConfig(model(), {
      widthCm: 80,
      heightCm: 200,
      opening: "sag-disa",
      colourId: "ornek",
      frameId: "pervaz",
      wallThicknessCm: 15,
    });
    expect(present.valid).toBe(true);
    expect(present.normalized?.wallThicknessCm).toBe(15);
  });

  it("rejects every opening that the model does not list", () => {
    const narrow = model({ openings: ["sag-ice"] });
    for (const opening of ["sol-ice", "sol-disa", "sag-disa", "yukari"]) {
      const result = validateDoorConfig(narrow, {
        widthCm: 90,
        heightCm: 210,
        opening,
        colourId: "ornek",
        frameId: "kasa",
      });
      expect(result.valid).toBe(false);
      expect(result.errors.some((issue) => issue.field === "opening")).toBe(true);
    }
  });

  it("warns on a non-standard size inside the range", () => {
    const result = validateDoorConfig(model(), {
      widthCm: 73,
      heightCm: 205,
      opening: "sol-disa",
      colourId: "ornek",
      frameId: "kasa",
    });
    expect(result.valid).toBe(true);
    expect(result.warnings.some((issue) => issue.message.includes("Standart dışı"))).toBe(true);
  });
});

describe("door url", () => {
  const sample = model();

  it("round-trips a configuration", () => {
    const query = writeDoorQuery({
      widthCm: 80,
      heightCm: 200,
      opening: "sol-ice",
      colourId: "ornek",
      frameId: "pervaz",
      wallThicknessCm: 12,
    });
    const parsed = parseDoorQuery(query, sample);
    expect(parsed.notice).toBeNull();
    expect(parsed.draft).toMatchObject({
      widthCm: 80,
      heightCm: 200,
      opening: "sol-ice",
      colourId: "ornek",
      frameId: "pervaz",
      wallThicknessCm: 12,
    });
  });

  it("falls back when the version is unknown or a number is tampered", () => {
    const unknown = parseDoorQuery("v=9&g=80&y=200", sample);
    expect(unknown.draft).toEqual(defaultDoorDraft(sample));
    expect(unknown.notice).toContain("sürümü tanınmadı");
    const tampered = parseDoorQuery("v=1&g=abc&y=210&a=sag-ice&k=kasa", sample);
    expect(tampered.draft.widthCm).toBe(defaultDoorDraft(sample).widthCm);
    expect(tampered.notice).toContain("Genişlik okunamadı");
  });

  it("migrates version 0 without dropping the numbers", () => {
    const parsed = parseDoorQuery("v=0&g=75&y=200&a=sag-ice&k=kasa", sample);
    expect(parsed.draft.widthCm).toBe(75);
    expect(parsed.notice).toContain("güncellendi");
  });
});
