import { expect, test } from "@playwright/test";

test("ana sayfa Türkçe açılır", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("mobilya ustası");
  await expect(page.locator("body")).not.toContainText("KKTC");
  await expect(page.locator("body")).not.toContainText("533 885 36 24");
});

test("glifler sayfada durur", async ({ page }) => {
  await page.goto("/glif-test");
  const sample = "ç ğ ı İ ö ş ü";
  for (const id of ["display", "wordmark", "sans", "mono"]) {
    await expect(page.getByTestId(id)).toContainText(sample);
  }
  const loaded = await page.evaluate(async () => {
    await document.fonts.ready;
    return ["display", "wordmark", "sans", "mono"].map((id) => {
      const el = document.querySelector(`[data-testid="${id}"]`);
      if (!el) return { id, ok: false, family: "" };
      const family = getComputedStyle(el).fontFamily;
      const primary = family.split(",")[0]?.trim() ?? family;
      return {
        id,
        family,
        ok: document.fonts.check(`16px ${primary}`, "çğıİöşü"),
      };
    });
  });
  expect(loaded.every((item) => item.ok), JSON.stringify(loaded, null, 2)).toBe(true);
});
