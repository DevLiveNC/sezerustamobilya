# Font ve Türkçe karakter kontrolü — 26 Kasım 2026

Kaynak: github.com/google/fonts (ofl/) — Google Fonts’un resmî deposu. Lisans: SIL OFL 1.1 (`fonts-kaynak/OFL-*.txt`).

| Font | Dosya | ç ğ ı İ ö ş ü Ç Ğ Ö Ş Ü â î û | Not |
|---|---|---|---|
| Instrument Serif 400 + italik | InstrumentSerif-Regular/Italic.ttf | Tam | ₺ ve → yok (fiyat yazılmıyor; oklar Plex Mono / SVG ikon) |
| Young Serif 400 | YoungSerif-Regular.ttf | Tam | ₺ ve → yok; italik yok |
| Hanken Grotesk (değişken 100–900) + italik | HankenGrotesk[wght].ttf | Tam | ₺ yok |
| IBM Plex Mono 400/500/600 | IBMPlexMono-*.ttf | Tam | ₺ ve → var |

Yöntem: (1) fontTools ile her dosyanın cmap’inde karakter varlığı; (2) Chromium’da `document.fonts` ile her yüzün gerçekten yüklendiği (7/7 yüz “loaded”); (3) tüm PNG’lerde gözle kontrol — “Gazimağusa, Büyük Sanayi, Kuzey Kıbrıs, MOBİLYA, ÇİZİM, AÇILIM, Ölçünüzü, ğ/ı” düzgün; yedek fonta düşen glif görülmedi. Pafta altındaki glif satırı: `wordmark-onerileri.png`.
