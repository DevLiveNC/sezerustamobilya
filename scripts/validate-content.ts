import { loadCatalogue } from "../src/lib/content/load";

const catalogue = loadCatalogue();
for (const warning of catalogue.warnings) {
  console.warn(`uyarı: ${warning}`);
}
console.log(
  `İçerik tamam: ${catalogue.products.length} ürün, ${catalogue.references.length} onaylı referans, ${catalogue.faq.length} soru, ${catalogue.images.length} görsel kaydı.`,
);
