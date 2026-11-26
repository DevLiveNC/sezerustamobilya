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
  const list = page.getByRole("dialog", { name: "Teklif listesi" });
  await expect(list).toContainText("1 adet");
  await page.keyboard.press("Escape");
  await expect(list).toBeHidden();
  await page.getByRole("button", { name: "Teklif listesine ekle" }).click();
  await expect(list).toContainText("2 adet");
});

test("teklif WhatsApp bağlantısında ürün adı durur", async ({ page }) => {
  await page.goto("/urun/el-oymasi-sandik-ornek");
  await page.getByRole("button", { name: "Teklif listesine ekle" }).first().evaluate((element: HTMLButtonElement) => element.click());
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
  const menu = page.getByRole("dialog", { name: "Menü" });
  await expect(menu).toBeVisible();
  await menu.getByRole("button", { name: "Atölye" }).click();
  await menu.getByRole("link", { name: "Hakkımızda" }).click();
  await expect(page).toHaveURL(/hakkimizda/);
  await page.goto("/urun/el-oymasi-sandik-ornek");
  await page.getByRole("button", { name: "Yakından bak" }).click();
  const dialog = page.getByRole("dialog", { name: /oyma detayı/ });
  await dialog.getByText("Yakınlaştırma %100").focus();
  await page.keyboard.press("+");
  await expect(dialog.getByText("Yakınlaştırma %120")).toBeVisible();
});

for (const width of [360, 390]) {
  test(`üst çubuk ${width}px taşmaz, menü klavye ile kapanır`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    const header = page.locator("header");
    const overflow = await header.evaluate((element) => element.scrollWidth - element.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const pageOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(pageOverflow).toBeLessThanOrEqual(1);
    const opener = page.getByRole("button", { name: "Menü", exact: true });
    await expect(opener).toHaveAttribute("aria-controls", "tam-menu");
    await opener.focus();
    await page.keyboard.press("Enter");
    const menu = page.getByRole("dialog", { name: "Menü" });
    await expect(menu).toBeVisible();
    await expect(opener).toHaveAttribute("aria-expanded", "true");
    const focusedInside = await page.evaluate(() => {
      const dialog = document.getElementById("tam-menu");
      return Boolean(dialog?.contains(document.activeElement));
    });
    expect(focusedInside).toBe(true);
    await page.keyboard.press("Tab");
    const stillInside = await page.evaluate(() => {
      const dialog = document.getElementById("tam-menu");
      return Boolean(dialog?.contains(document.activeElement));
    });
    expect(stillInside).toBe(true);
    const products = menu.getByRole("button", { name: "Ürünler" });
    await expect(products).toHaveAttribute("aria-expanded", "true");
    await products.click();
    await expect(products).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(opener).toHaveAttribute("aria-expanded", "false");
    await opener.click();
    await expect(menu).toBeVisible();
    await page.mouse.click(8, 200);
    await expect(menu).toBeHidden();
  });
}

for (const path of ["/", "/urun/el-oymasi-sandik-ornek", "/kapi-yapilandir/melamin-kapi-ornek", "/teklif"]) {
  test(`axe ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((item) => item.impact === "serious" || item.impact === "critical");
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}
