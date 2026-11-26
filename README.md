# Sezer Usta Mobilya

Gazimağusa, Kuzey Kıbrıs'taki atölye için Next.js ürün vitrini ve teklif önizlemesi.

## Yerel geliştirme

```bash
npm install
npm run dev
```

Üretim derlemesi: `npm run build`; tür kontrolü: `npm run typecheck`; testler: `npm test`.

Ürün örnekleri `content/catalog/products.json` dosyasındadır ve Zod ile doğrulanır. Kayıtlar gerçek stok olarak sunulmaz. Teklif formu sunucuya veri kaydetmez; kullanıcının kontrol edip gönderebileceği bir WhatsApp mesajı hazırlar. Fotoğraflar, ürün bilgileri, açık adres, çalışma saatleri ve yasal metinler işletmeden beklenmektedir. Site şu anda arama motorlarına kapalı bir önizlemedir; gerçek içerik ve yasal onay olmadan yayına alınmamalıdır.

## Belgeler

- [Proje planı](docs/PLAN.md)
- [Başlangıç promptu](docs/baslangic-prompt.md)
- [Araştırma](docs/arastirma/ARASTIRMA.md)
- [Proje skill](docs/skill/SKILL.md)
