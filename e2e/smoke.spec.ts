import { expect, test } from "@playwright/test";

test("ana sayfa Türkçe açılır", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sezer Usta Mobilya");
});
