# İçerik rehberi

Bilmediğimiz hiçbir şeyi uydurmayın. Bilinmeyen her alan `[SAHİP DOLDURACAK: …]` kalır ve bağlantıya dönüşmez.

## Ürün eklemek

1. `content/products/` veya `content/doors/` altına yeni bir JSON koyun. `slug` Türkçe karakterleri `src/lib/slugify.ts` ile üretilmiş olsun.
2. `isSample` gerçek kayıtta `false`, `confirmedByOwner` işletme onayından sonra `true`.
3. Fotoğraf kimlikleri `content/images/manifest.json` içinde durmalı. Dosyayı `incoming/` klasörüne koyup `npm run` ile `scripts/ingest-images.ts` çalıştırın. Betik EXIF ve GPS bilgisini atar.
4. `npm run validate:content` geçmeden kayıt yayına girmez.

## Kapı

Ölçü aralığı, açılım, renk ve kasa `content/doors/*.json` içindedir. Örnek aralıklar `sizeRules.isSample: true` ile işaretlidir. Gerçek kartela gelince renk `label` alanına işletmenin adını yazın.

## Temsilî görseller

`content/images/site.json` atmosfer görsellerini sayar. Dosyalar `public/images/site/` altına, manifestteki adlarla konur. Ürün kartı ve ürün sayfası bu dosyaları kullanmaz. Ürün fotoğrafı gelene kadar yer tutucu “FOTOĞRAF ATÖLYEDEN GELECEK” kalır.

## Yasaklar

Bölge adı “Kuzey Kıbrıs” yazılır. Fiyat, puan, yorum sayısı ve uydurma istatistik yoktur. Sitede görünen telefon yalnız +90 533 833 64 81.
