import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { canShowBeforeAfter, loadCatalogue } from "@/lib/content/load";

describe("loadCatalogue", () => {
  const catalogue = loadCatalogue();

  it("loads the sample catalogue and drops unconsented references", () => {
    expect(catalogue.products.length).toBe(7);
    expect(catalogue.products.every((product) => product.isSample)).toBe(true);
    expect(catalogue.products.some((product) => product.price !== undefined)).toBe(false);
    expect(catalogue.references.map((reference) => reference.id)).toEqual(["ornek-referans"]);
    expect(catalogue.excludedReferences.map((reference) => reference.id)).toEqual([
      "ornek-referans-onaysiz",
    ]);
    expect(catalogue.warnings.some((warning) => warning.includes("ornek-referans-onaysiz"))).toBe(
      true,
    );
    expect(catalogue.faq.every((item) => item.answer.includes("[SAHİP DOLDURACAK: cevap]"))).toBe(
      true,
    );
  });

  it("does not treat placeholder before/after pairs as real", () => {
    const reference = catalogue.references[0];
    expect(reference).toBeDefined();
    if (!reference) return;
    expect(canShowBeforeAfter(reference, catalogue.images)).toBe(false);
  });

  it("names the broken file when JSON does not match the schema", () => {
    const root = mkdtempSync(path.join(tmpdir(), "sezer-icerik-"));
    mkdirSync(path.join(root, "content/products"), { recursive: true });
    mkdirSync(path.join(root, "content/images"), { recursive: true });
    writeFileSync(path.join(root, "content/faq.json"), "[]");
    writeFileSync(path.join(root, "content/images/manifest.json"), JSON.stringify({ images: [] }));
    writeFileSync(
      path.join(root, "content/products/bozuk.json"),
      JSON.stringify({ kind: "carved-piece", slug: "x" }),
    );
    expect(() => loadCatalogue(root)).toThrow(/bozuk\.json/);
  });
});
