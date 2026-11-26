# Tasarım sistemi — “Talaş ve Cila” (taslak 1, 26 Kasım 2026)

Sezer Usta Mobilya sitesinin token’ları, PNG mockup’ları ve kaynakları. Yaşar onayı bekliyor; onaydan sonra Dev botu bu klasörü referans alır.

## İçerik
| Dosya | Ne |
|---|---|
| `tokens.json` | Renk, tipografi ölçeği, boşluk, radius, çizgi, gölge, doku, hareket, breakpoint, z-index |
| `*.png` | Mockup’lar (1440 masaüstü / 390 mobil, tam sayfa) + `wordmark-onerileri.png` |
| `kaynak/` | Mockup HTML/CSS + üretici Python dosyaları. `bash kaynak/hepsini-uret.sh` hepsini yeniden üretir (Playwright Chromium) |
| `kaynak/talas-cila.css` | Token’ların CSS değişkeni hâli + ortak bileşenler (CropFrame, SectionHeader, StatusBadge, SpecTable…) |
| `kaynak/kapi_cizim.py` | Kapı ön görünüş SVG’sinin referans geometrisi (Dev’in `DoorElevation` bileşeni için) |
| `fonts-kaynak/` | Google Fonts’tan indirilen TTF’ler + `OFL.txt` (hepsi SIL Open Font License) |
| `wordmark-onerileri.md` | 3 tipografik wordmark önerisinin gerekçesi |
| `cekim-rehberi.md` | Sahibe gidecek telefonla çekim rehberi taslağı |

## Nasıl kullanılır
1. Next.js’te fontları `next/font/google` ile yükleyin (subsets `latin`, `latin-ext`, `display: swap`): `Instrument_Serif` (400, normal+italic), `Young_Serif` (400), `Hanken_Grotesk` (400/500/600), `IBM_Plex_Mono` (400/500/600). `fonts-kaynak/` yalnız mockup ve glif testi içindir.
2. Renkleri yalnız orijinal paletten ve `tokens.json > role` eşlemelerinden kullanın; yeni renk eklemeyin (türetilmiş ton yok — bkz. Onay notları).
3. Gradyan yok. Ahşap damar dokusu (≤ %4) yalnız `oak` bantlarda. Kartlarda gölge yok; tek gölge `shadow-lift` (çekmece, lightbox, lup).
4. Fotoğraf gelmeyen her yerde `PlaceholderFrame`: kırpma işaretleri + “FOTOĞRAF ATÖLYEDEN GELECEK” + slot adı, oran, min. çözünürlük, kısa çekim tarifi. Slot adları `baslangic-prompt.md` §5 ile aynı.
5. Bilinmeyen bilgi: `[SAHİP DOLDURACAK: …]` rozeti (mono, kesikli `varnish` kenar). Bu rozet asla link olmaz.

## Tailwind CSS 4 eşlemesi (`app/globals.css`)
```css
@import "tailwindcss";
@theme {
  /* yalnız orijinal palet */
  --color-shaving:#F2EADF; --color-oak:#E3D2B6; --color-linen:#FAF6EF;
  --color-ink:#211B16; --color-ink-soft:#6A5D50; --color-walnut:#4A3426;
  --color-varnish:#A8662E; --color-olive:#5A5C3A; --color-line:#D3C2A8;
  --color-sold:#8C7B6B; --color-danger:#9E3B2E;
  /* roller (tokens.json > role) — yeni renk değil, palete takma ad */
  --color-accent-small:var(--color-walnut);      /* küçük vurgu metni */
  --color-soft-on-oak:var(--color-walnut);       /* meşe zeminde ikincil metin */
  --color-accent-on-dark:var(--color-oak);       /* ceviz zeminde vurgu (alternatif: shaving) */
  --color-line-on-dark:rgb(211 194 168 / .35);   /* ceviz zeminde dekoratif çizgi */
  --color-placeholder:var(--color-oak);          /* fotoğraf yer tutucu dolgusu */
  --font-display:var(--font-instrument-serif),"Young Serif",Georgia,serif;
  --font-wordmark:var(--font-young-serif),Georgia,serif;       /* logo B */
  --font-serif:var(--font-young-serif),Georgia,serif;
  --font-sans:var(--font-hanken),system-ui,sans-serif;
  --font-mono:var(--font-plex-mono),ui-monospace,monospace;
  --radius-xs:2px; --radius-sm:3px; --radius-md:4px; --radius-lg:6px;
  --shadow-lift:0 18px 40px -18px rgb(33 27 22/.28),0 2px 6px rgb(33 27 22/.06);
  --ease-plane:cubic-bezier(.215,.61,.355,1);
  --breakpoint-sm:390px; --breakpoint-md:768px; --breakpoint-lg:1024px; --breakpoint-xl:1440px;
  --text-display-xl:128px; --text-display-l:88px; --text-h2:72px; --text-h3:40px; --text-h4:24px;
  --text-body-l:20px; --text-body:17px; --text-small:14px; --text-label:12px; --text-label-s:11px;
}
```
Örnek: `bg-shaving text-ink`, `font-display text-h2 tracking-[-.02em] leading-[.95]`, `font-mono text-label uppercase tracking-[.12em]`, `[SAHİP DOLDURACAK]` rozeti: `text-accent-small border border-dashed border-varnish/55 bg-varnish/9`, odak: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-varnish`. `lang="tr"` zorunlu (büyük harf dönüşümünde i→İ).

## Kontrast kuralları
- **Cila #A8662E yalnız büyük yazı (≥24px normal veya ≥19px kalın), dekor, ölçü/açılım çizgisi ve odak halkası.** Küçük metinde asla; küçük vurgu metni = ceviz #4A3426 (veya mürekkep #211B16).
- Meşe (oak) zeminde ikincil metin ink-soft değil **ceviz** (ink-soft/oak 4.3:1 — AA altı).
- Ceviz zeminde vurgu = **meşe** (veya talaş); ikincil metin talaş en az %60 opaklık (4.61:1).
- Ceviz zeminde çizgi = **çizgi #D3C2A8**: dekoratif ayırıcıda %35 opaklık; anlam taşıyan kenarlıkta (input, buton) opaksız (6.66:1).
- `sold` 3.41:1 → yalnız kenarlıklı rozet; tek başına bilgi taşıyan küçük metin olarak değil.
- Başlık ≥ 32px Instrument Serif; 20–28px Young Serif; teknik her şey Plex Mono.
- Hareket: “rende, zıplama değil” — `tokens.json > motion`. `prefers-reduced-motion` altında yalnız opacity.

## Onay notları (26 Kasım 2026)
1. **Ekran tasarımları onaylandı.** Mockup PNG’leri yeniden üretilmedi (dosya saatleri 16:21, Asia/Famagusta).
2. **Logo: B — Tezgâh Yazısı** (Young Serif, tek satır “Sezer Usta Mobilya” + alt satır “El oyma sanatı ve mobilya ustası”). Mockup başlıklarında görünen A (Atölye Etiketi) geçici yer tutucudur; uygulamada header, footer ve OG görselinde **B** kullanılır.
3. **Türetilmiş 5 ton kaldırıldı** (#8A5222, #5C5044, #E7B98B, #6B5242, #EADCC6); yalnız orijinal palet kalır. Prompt paletinde zaten olan ink-soft, sold, danger korunur.
4. **PNG’lerde bu tonlar görünebilir** (ör. turuncu-kahve ölçü etiketleri, açık amber vurgu, yer tutucu dolgusu). Uygulamada **token’lar esas alınır**, PNG’deki renk değil. `kaynak/talas-cila.css` ve üretici `.py` dosyaları yeni eşlemeye çekildi, `kaynak/*.html` buna göre yenilendi; yani kaynak HTML artık PNG’den bu renklerde farklıdır (bilinçli).

### Eşleme tablosu
| Eski (türetilmiş) | Rol | Yeni (orijinal palet) | Kontrast |
|---|---|---|---|
| #8A5222 varnish-text | Küçük vurgu metni, [SAHİP DOLDURACAK] metni | ceviz #4A3426 | talaş 9.73 · keten 10.77 · meşe 7.82 · rozet zemininde 7.15–8.77 |
| #8A5222 (SVG ölçü etiketi zemini) | Üstünde keten yazı | ceviz #4A3426 | keten/ceviz 10.77 |
| #5C5044 ink-soft-on-oak | Meşe zeminde ikincil metin | ceviz #4A3426 | 7.82 |
| #E7B98B varnish-on-dark | Ceviz zeminde vurgu, ribbon, rozet | meşe #E3D2B6 (alt.: talaş) | 7.82 (talaş 9.73) · rozet zemininde 6.44 |
| #6B5242 walnut-line | Ceviz zeminde çizgi | çizgi #D3C2A8 %35 (dekor) / opaksız (işlevsel) | 2.13 dekor, şart yok / 6.66 |
| #EADCC6 placeholder-fill | Yer tutucu dolgusu | meşe #E3D2B6; üstündeki etiketler ceviz | ceviz/meşe 7.82 |
| (#5A4232, mockup CSS’te) | Koyu bölüm yer tutucusu | talaş %6 opaklık ceviz üstünde | etiketler talaş %70 ≈ 5.5 |
| — cila #A8662E | Büyük yazı / dekor / odak | değişmedi | talaş 3.82 · keten 4.23 · meşe 3.08 (büyük metin ve UI için ≥3 ✓) |
