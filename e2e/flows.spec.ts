import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("kapı ölçüsü hata verir, bağlantı durur, adet birleşir", async ({ page }) => {
  await page.goto("/kapi-yapilandir/melamin-kapi-ornek");
  const width = page.getByRole("textbox", { name: /Genişlik/ });
  await width.fill("140");
  await width.blur();
  await expect(page.getByRole("alert").first()).toContainText("en fazla");
  await width.fill("80");
  await width.blur();
  await expect(page).toHaveURL(/g=80/);
  await page.reload();
  await expect(page.getByRole("textbox", { name: /Genişlik/ })).toHaveValue("80");
  await page.getByRole("radio", { name: /renk adı/ }).click();
  await page.getByRole("button", { name: "Teklif listesine ekle" }).click();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Teklif listesine ekle" }).click();
  await expect(page.getByRole("dialog")).toContainText("2 adet");
});

test("teklif WhatsApp bağlantısında ürün adı durur", async ({ page }) => {
  await page.goto("/urun/el-oymasi-sandik-ornek");
  await page.getByRole("button", { name: "Teklif listesine ekle" }).evaluate((element: HTMLButtonElement) => element.click());
  await expect(page.getByRole("dialog", { name: "Teklif listesi" })).toContainText("sandık");
  await page.goto("/teklif");
  await expect(page.getByRole("main").getByText("El oyması sandık")).toBeVisible();
  await page.getByLabel("Ad ve soyad").fill("Ayşe Usta");
  await page.getByLabel("Telefon").fill("0533 833 64 81");
  await page.getByLabel("İl / bölge").fill("Gazimağusa");
  await page.getByRole("checkbox", { name: /Kişisel verilerin işlenmesi/ }).check();
  await page.getByRole("button", { name: "Teklif talebini hazırla" }).click();
  const link = page.getByRole("link", { name: "WhatsApp’ta aç" });
  await expect(link).toBeVisible();
  const href = await link.getAttribute("href");
  expect(href ?? "").toContain("wa.me/905338336481");
  expect(decodeURIComponent(href ?? "")).toContain("El oyması sandık");
});

test("hareket azaltılınca slayt kendi ilerlemez", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce", locale: "tr-TR" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("region", { name: "Atölye görselleri" })).toHaveAttribute("data-autoplay", "off");
  await context.close();
});

test("mobil menü ve yakınlaştırma", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width > 500, "yalnız dar ekran");
  await page.goto("/");
  await page.getByRole("button", { name: "Menü" }).click();
  await expect(page.getByRole("dialog", { name: "Menü" })).toBeVisible();
  await page.getByRole("dialog", { name: "Menü" }).getByRole("link", { name: "Hakkımızda" }).click();
  await expect(page).toHaveURL(/hakkimizda/);
  await page.goto("/urun/el-oymasi-sandik-ornek");
  await page.getByRole("button", { name: "Yakından bak" }).click();
  const dialog = page.getByRole("dialog", { name: /oyma detayı/ });
  await dialog.getByText("Yakınlaştırma %100").focus();
  await page.keyboard.press("+");
  await expect(dialog.getByText("Yakınlaştırma %120")).toBeVisible();
});

for (const path of ["/", "/urun/el-oymasi-sandik-ornek", "/kapi-yapilandir/melamin-kapi-ornek", "/teklif"]) {
  test(`axe ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((item) => item.impact === "serious" || item.impact === "critical");
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}
