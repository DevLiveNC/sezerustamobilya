# Sezer Usta Mobilya — Proje Planı (web sitesi + sosyal medya)

**Müşteri:** Sezer Usta Mobilya — Büyük Sanayi, Gazimağusa, Kuzey Kıbrıs · +90 533 833 64 81
**Hazırlayan:** liveDevelopment (KIRMIZIYÜZ Live Development Software LTD — Kuzey Kıbrıs ve Türkiye’de çalışan yazılım şirketi)
**Tarih:** 26 Kasım 2026 (Asia/Famagusta)
**Durum:** Taslak — Yaşar onayı bekliyor. Bu belgede **fiyat yoktur**; fiyatlandırma Yaşar’dadır.
**Araştırma:** `arastirma/ARASTIRMA.md` (kaynaklı bilgiler + bilinmeyenler)

---

## 1. Hedefler

1. **Kurumsal güven:** “El oyma sanatı ve mobilya ustası” kimliğini, Büyük Sanayi’deki atölyeyi ve ustanın el emeğini anlatan, şablon görünmeyen premium bir site.
2. **Ürün vitrini:** Üç farklı ürün dünyasını tek katalogda düzgün göstermek:
   - **El oyması tek parçalar** (sandık, ayna çerçevesi, dolap…; “her üründen sadece bir adet”)
   - **Melamin kapı** ve **PVC kapı** (toptan + perakende, 12 Kasım 2026’da başladı)
   - **Özel üretim** (ölçüye göre iş)
3. **Talep toplamak:** Her sayfadan WhatsApp’a ve **teklif formuna** tek dokunuşla ulaşmak; kapılarda ölçü/adet ile yapılandırılmış teklif, toptan talepleri ayrı işaretlemek.
4. **Bulunabilirlik:** Gazimağusa / Kuzey Kıbrıs aramalarında yerel SEO (LocalBusiness/FurnitureStore şeması, Google İşletme Profili ile uyum).
5. **Sosyal medya:** Instagram + Facebook’ta düzenli, **yalnızca gerçek atölye görüntüleriyle** üretilen içerik; site ile aynı görsel dil.
6. **Kolay güncelleme:** Ürünler JSON/MDX katalogda; sonraki fazda basit panel veya headless CMS.

Başarı ölçütleri (yayın sonrası): WhatsApp/teklif tıklamaları (olay takibi), teklif formu dönüşümü, Google İşletme görünümü, Instagram kaydetme/paylaşım. Hedef sayılar sahibin mevcut verisi olmadan uydurulmaz.

---

## 2. Site haritası

```
/                         Ana sayfa
/hakkimizda               Hakkımızda — Atölye hikâyesi (usta, el oyma süreci, Büyük Sanayi atölyesi)
/urunler                  Tüm ürünler (kategori indeksi)
  /urunler/el-oymasi       El oyması mobilya (sandık, ayna çerçevesi, dolap, … — tek parça, durum: mevcut/satıldı)
  /urunler/melamin-kapi    Melamin kapı (modeller, renkler, ölçüler)
  /urunler/pvc-kapi        PVC kapı (modeller, renkler, ölçüler)
  /urunler/ozel-uretim     Özel üretim (süreç + örnek işler)
/urun/[slug]              Ürün detay (galeri + oyma detay yakınlaştırma, ölçüler, malzeme, durum, WhatsApp/teklife ekle)
/kapi-yapilandir/[model]  Kapı yapılandırıcı (ölçü, açılım yönü, renk, kasa → teklif listesine ekle)
/referanslar              Referanslar / galeri (tamamlanan işler, önce/sonra — yalnız gerçek ve izinli fotoğraflar)
/teklif                   Özel sipariş / teklif formu (teklif listesi + ölçü + fotoğraf ekleme + toptan seçeneği)
/iletisim                 İletişim + harita + WhatsApp + çalışma saatleri
/olcu-rehberi             Kapı ölçüsü nasıl alınır (bilgi içeriği; SEO)
/sss                      Sık sorulan sorular (sahibin verdiği cevaplarla)
/gizlilik, /kvkk          Yasal metinler (taslak; sahip/hukuk onayı)
404 / not-found           Markalı 404
```

Menü: Ürünler (mega menü: 4 kategori) · Atölye · Referanslar · Ölçü Rehberi · İletişim · [Teklif Al] butonu. Mobilde sabit alt çubuk: **WhatsApp · Ara · Teklif**.

Opsiyonel (Faz 3): `/en` İngilizce sürüm — Facebook’ta “Whatsapp English” hattı olduğu için yabancı müşteri sinyali var; sahibin onayına bağlı.

---

## 3. Sahipten gerekli içerik (checklist)

| # | İçerik | Format | Öncelik |
|---|---|---|---|
| 1 | Logo (varsa) | SVG/PDF/AI; yoksa yüksek çözünürlüklü fotoğrafı | Faz 1 |
| 2 | Ustanın adı, kısa hikâyesi, kaç yıldır oyma yaptığı, yüzü görünsün mü | Sesli mesaj da olur, biz yazıya dökeriz | Faz 1 |
| 3 | Açık adres, Google Haritalar pini, çalışma saatleri | Metin + konum paylaşımı | Faz 1 |
| 4 | Sitede gösterilecek telefon/WhatsApp hatları; İngilizce hizmet hattı kullanılsın mı | Metin | Faz 1 |
| 5 | E-posta adresi (varsa) | Metin | Faz 1 |
| 6 | El oyması ürün listesi: ad, ağaç türü, ölçü (E×B×D cm), cila, durum, fiyat gösterilsin mi | Tablo/WhatsApp listesi | Faz 1 |
| 7 | Her ürün için 4–8 gerçek fotoğraf (önden, yan, oyma detayı yakın çekim, ölçek için ortamda) | JPG/HEIC, orijinal çözünürlük | Faz 1 |
| 8 | Melamin/PVC kapı: model adları, renk/desen kartelası, standart ölçüler, kasa/pervaz, aksesuar, garanti süresi/kapsamı, toptan minimum adet | Katalog PDF / fotoğraf | Faz 1 |
| 9 | Özel üretim kapsamı, ortalama teslim süresi, ölçü alma ve montaj bölgeleri (Gazimağusa / tüm Kuzey Kıbrıs / Türkiye’ye gönderim) | Metin | Faz 1 |
| 10 | Atölye fotoğraf ve videoları (tezgâh, aletler, talaş, oyma süreci) | Dikey video 9:16 + fotoğraf | Faz 1–2 |
| 11 | Tamamlanmış işler + müşteri yayın izni; önce/sonra kareleri | Fotoğraf | Faz 2 |
| 12 | SSS cevapları (teslim, ölçü, garanti, ödeme, bakım) | Metin | Faz 2 |
| 13 | Ticari unvan (KVKK/gizlilik metni için) | Metin | Faz 2 (yayın öncesi zorunlu) |
| 14 | Instagram hesabı (var mı / açalım mı), Facebook sayfa yönetici erişimi | Erişim daveti | Sosyal Faz 1 |
| 15 | Alan adı tercihi (ör. sezerustamobilya.com — müsaitlik kontrol edilecek, satın alma onayla) | Karar | Faz 2 |

Fotoğraf çekim rehberi (sahibe gönderilecek, telefonla yeterli): gün ışığında, atölye kapısı önünde nötr zemin; her ürün önden + 45° + oyma detayı (avuç kadar mesafe) + ölçek için yanında bir sandalye/kapı; dikey ve yatay ikişer kare; filtre yok.

---

## 4. Tasarım yönü — “Talaş ve Cila” (Shavings & Varnish)

- **Duygu:** Büyük Sanayi’de öğleden sonra ışığı alan bir atölye: ceviz ve meşe tonları, keskin oyma bıçağı, kurşun kalemle ölçü yazılmış kontrplak, ince talaş kıvrımları. Sıcak, ağırbaşlı, **premium ama gösterişsiz**. Şablon mobilya sitesi (tam ekran stok salon fotoğrafı + ortalı başlık) **değil**.
- **Görsel motifler:** marangoz teknik çizimi (ölçü okları, ince ölçü çizgileri, `1:10` ölçek etiketi), ahşap damarını çağrıştıran çok hafif çizgi dokusu (≤ %4), oyma rölyefini hissettiren derin gölgesiz kabartma tipografi.
- **Palet (öneri):** talaş krem `#F2EADF`, meşe `#E3D2B6`, ceviz `#4A3426`, kömür mürekkep `#211B16`, cila amberi `#A8662E` (vurgu), zeytin `#5A5C3A` (ikincil vurgu — Kıbrıs zeytinliği), çizgi `#D3C2A8`.
- **Tipografi (öneri):** başlık **Instrument Serif** veya **Young Serif** (karakterli serif), metin **Hanken Grotesk**, ölçü ve teknik etiketler **IBM Plex Mono**. Türkçe karakter (ç ğ ı İ ö ş ü) testi zorunlu.
- **Hareket:** “rende” etkisi (yatay clip-path ile açılan görseller), ölçü çizgilerinin stroke ile çizilerek gelmesi, oyma detayında yakınlaştırma lupu; GSAP + ScrollTrigger + Lenis smooth scroll; `prefers-reduced-motion` altında hepsi kapalı.
- **Fotoğraf:** yalnız **gerçek** ürün/atölye fotoğrafları. Gelene kadar dürüst yer tutucu çerçeve: “Fotoğraf atölyeden gelecek”. AI üretimi ürün, usta veya atölye görseli **yasak**.
- **Teslim:** Tasarım botu önce ana sayfa + ürün detay + kapı yapılandırıcı için **PNG mockup** (masaüstü 1440 + mobil 390) çıkarır; Yaşar onayından sonra kod.

---

## 5. Teknik yığın

- **Next.js 15+ App Router**, React 19, **TypeScript strict**, **Tailwind CSS 4** (CSS değişkeni token’lar)
- **GSAP 3 + ScrollTrigger (+ Flip)**, **Lenis** smooth scroll (GSAP ticker’a bağlı, tek örnek, modal açıkken durur, reduced-motion’da kapalı) — son projelerimizdeki kurulumla aynı
- **Zod** (katalog doğrulama, form, URL durumu), **Vitest** (saf motorlar), **Playwright** (kritik akışlar)
- **Katalog:** Faz 1’de repoda `content/catalog/*.json` + Zod ile build-time doğrulama, `generateStaticParams` ile statik ürün sayfaları; görsel manifesti (oran, blur placeholder). Faz 3’te basit admin veya headless CMS (Sanity/Payload vb. — karar sonra).
- **Teklif formu:** Server Action + Zod + honeypot + hız sınırı; Faz 1’de gönderim **WhatsApp’a hazır mesaj** + (onaylanırsa) e-posta servisi; gerçek servis bağlantısı onaysız yapılmaz.
- **SEO:** `generateMetadata`, `next/og` OG görseli, sitemap/robots, LocalBusiness/FurnitureStore + Product + BreadcrumbList JSON-LD (yalnız gerçek verilerle; Review/AggregateRating yok). Önizlemede `noindex`.
- **Hosting:** Vercel (preview → Yaşar onayı → production). Repo önerisi: `DevLiveNC/sezer-usta-mobilya` (oluşturma onayla).
- **Performans hedefi:** Lighthouse mobil Perf ≥ 90, A11y/BP/SEO ≥ 95; LCP < 2,5 s, CLS < 0,05, INP < 200 ms. **Erişilebilirlik:** WCAG 2.2 AA.

---

## 6. Fazlar ve kilometre taşları

| Faz | İçerik | Çıktı | Onay kapısı |
|---|---|---|---|
| **0 — Keşif** (1–2 gün) | Araştırma (tamam), sahipten içerik talebi listesi, fotoğraf çekim rehberi | Bu plan + sahibe gidecek içerik listesi (mesaj taslağı Yaşar onayıyla) | Yaşar planı onaylar |
| **1 — Tasarım** (2–4 gün) | Tasarım sistemi, ana sayfa / ürün detay / kapı yapılandırıcı / mobil PNG mockup | PNG’ler + token dosyası | Yaşar mockup’ı onaylar |
| **2 — Geliştirme** (1–2 hafta, tek PR) | Repo kurulum, tüm sayfalar, katalog motoru, kapı yapılandırıcı, teklif listesi + form, galeri, SEO, testler | **Tek PR** + Vercel preview + PNG ekran görüntüleri + Lighthouse raporu | Yaşar PR’ı onaylar → merge → preview/demo yayını |
| **3 — Gerçek içerik** (sahibe bağlı) | Gerçek fotoğraflar, ürün listesi, adres/saat, yasal metinler, alan adı | İçerik PR’ı | Sahip + Yaşar onayı → production + alan adı |
| **4 — Büyütme** (opsiyonel) | Basit admin/CMS, İngilizce sürüm, Google İşletme Profili optimizasyonu | — | Ayrı teklif (Yaşar) |

**Sosyal medya** Faz 0’dan sonra paralel başlar (aşağıda); ilk paylaşım için gerçek görüntü gerekir.

---

## 7. Sosyal medya planı (Instagram + Facebook)

### 7.1 Temel kurallar
- Yalnız **gerçek** fotoğraf/video (sahibin çektikleri veya bizim çekimimiz). Usta ve müşteri yüzleri **izinle**. AI ile ürün/usta/atölye görseli yok.
- Tasarımlar **Canva**’da (sosyal medya için); tarz seçimi `/workspace/tasarim-referanslari/TARZ-SECIM-KURALI.md` (önerilen: ürün vitrini → Dağınık Gerçekçi / 03 Lüks Makro; bilgi → Teknik Çizim; kurumsal → Editoryal Dergi).
- Fiyat, kampanya, garanti süresi yalnız sahip verdiyse. “KKTC” değil “Kuzey Kıbrıs”.
- **Hiçbir paylaşım Yaşar onayı olmadan yayınlanmaz.** Hesap adı doğrulanmadan yazılmaz.
- Instagram hesabı bulunamadı → [SAHİP DOLDURACAK]: mevcut hesap var mı, yoksa açılsın mı (kullanıcı adı önerisi sahibe sunulur).

### 7.2 İçerik sütunları
1. **Atölyeden** — oyma süreci, alet, talaş, el yakın çekimleri (Reels ağırlıklı)
2. **Tek parça** — her el oyması ürün için tanıtım: ölçü, ağaç, detay; “satıldı” güncellemesi
3. **Kapı çözümleri** — melamin/PVC modeller, renkler, toptan/perakende, ölçü alma ipucu
4. **Usta anlatıyor** — ustanın sesiyle kısa anlatım (yüz göstermek istemezse sadece eller + seslendirme)
5. **Teslim edilenler** — önce/sonra, montaj (müşteri izniyle)
6. **Bilgi** — ahşap bakımı, kapı ölçüsü nasıl alınır, melamin ile PVC farkı (sahibin onayladığı bilgilerle)

### 7.3 Formatlar
- Reels 9:16 (15–30 sn, altyazılı, telif sorunsuz müzik)
- Carousel 4:5 (ürün detayları, ölçü kartı, adım adım bilgi)
- Story 9:16 (atölye anı, soru kutusu, “bu hafta tezgâhta”)
- Facebook: aynı içerik + toptan duyuruları için uzun açıklama

### 7.4 4 haftalık başlangıç takvimi (haftada 3 post + 3–5 story)

| Hafta | Pzt | Çar | Cum | Story |
|---|---|---|---|---|
| 1 — Tanışma | Carousel: “El oyma sanatı ve mobilya ustası” — atölye ve usta tanıtımı | Reels: oyma bıçağı → detay yakın çekim (gerçek süreç) | Carousel: melamin ve PVC kapı satışı başladı (12 Kasım duyurusunun görsel hâli) | Atölye günü, “Bizi Büyük Sanayi’de bulabilirsiniz” konumu |
| 2 — Tek parça | Post: tek parça sandık (ölçü + ağaç türü) | Reels: bir ayna çerçevesinin önden/45°/detay geçişi | Carousel: “Kapı ölçüsü nasıl alınır” (3 adım) | Soru kutusu: “Hangi ürünü görmek istersiniz?” |
| 3 — Kapı odak | Carousel: kapı renk/desen kartelası | Reels: kapı montajı önce/sonra (gerçek iş, izinli) | Post: toptan talepler için iletişim çağrısı | “Bu hafta tezgâhta” serisi |
| 4 — Güven | Reels: “Usta anlatıyor” — neden el oyması | Carousel: özel üretim süreci (ölçü → çizim → oyma → cila → teslim) | Post: web sitesi duyurusu (site yayındaysa) | Referans işler, WhatsApp’tan teklif hatırlatması |

Her hafta için Sosyal botu: caption (TR; gerekirse EN satırı), hashtag seti (#gazimağusa #kuzeykıbrıs #eloyması #ahşap #mobilya #melaminkapı #pvckapı …), Canva tasarımı, çekim listesi; hepsi **onaya** gider.

### 7.5 Önce/sonra atölye Reels’leri
- Sahipten istenen çekim: aynı açıdan ham kütük/levha → oyma ortası → cila sonrası, telefon sabit (tripod/rafa dayalı), 9:16, 4K/1080p, 3–5 sn’lik planlar.
- Montaj: kurgu, altyazı, kapak (Canva). Görüntüde değişiklik yok, sahte geçiş/AI efekt yok.

---

## 8. Ekip ve bot rolleri

| Bot | Rol | Teslim |
|---|---|---|
| **Sezer Usta · Dev** | Repo kurulum, tüm kod, katalog ve kapı motoru, SEO, test; **entegratör** (Tasarım ve Sosyal’den gelenleri tek PR’da toplar). Kodlama Cursor cloud agent ile **yalnız Grok 4.7 high, fast kapalı**. | Tek PR + preview + PNG ekran görüntüleri + test/Lighthouse raporu |
| **Sezer Usta · Tasarım** | Tasarım sistemi, PNG mockup’lar, wordmark önerisi (logo yoksa, yalnız tipografik), görsel manifest/fotoğraf çekim rehberi | PNG + token dosyası + kısa gerekçe |
| **Sezer Usta · Sosyal** | Instagram/Facebook takvimi, caption, Canva tasarımları, Reels kurgu planları (gerçek görüntüyle) | Haftalık taslak paket (onaya) |
| **LiveDev Şef** (hub) | Yönlendirme, Yaşar onaylarının aktarımı, müşteri iletişimi | — |

Akış: **plan → tasarım PNG → kod → tek PR → Yaşar onayı → merge/yayın.** Botlar müşteriye doğrudan yazmaz; raporlar LiveDev Şef’e gider.

Dosya konumları: `/workspace/sezer-usta-mobilya/` (PLAN.md, baslangic-prompt.md, botlar.md, skill/SKILL.md, arastirma/, tasarim/, sosyal/).
