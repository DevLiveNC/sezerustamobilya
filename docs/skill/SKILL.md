---
name: sezer-usta-mobilya-proje
description: Sezer Usta Mobilya (Gazimağusa) kurumsal + ürün vitrini sitesi ve sosyal medya işlerinde çalışan botlar için proje kuralları, dosyalar ve iş akışı.
---

# Sezer Usta Mobilya — proje skill’i

Bu skill’i Sezer Usta Mobilya ile ilgili **her** işte (kod, tasarım, içerik, sosyal medya, rapor) önce oku ve uygula.

## 1. Proje gerçekleri (yalnız doğrulanmış)
- **Müşteri:** Sezer Usta Mobilya — Büyük Sanayi, Gazimağusa, Kuzey Kıbrıs.
- **Kendi tanımı:** “El oyma sanatı ve mobilya ustası.” (Facebook sayfası)
- **Ürünler (kendi paylaşımlarından):** doğal ahşap, tamamen el oyması sandık, ayna çerçevesi ve dolaplar; “her üründen sadece bir adet” (tek parça). 12 Kasım 2026’dan beri **toptan ve perakende melamin ve PVC kapı** satışı (“uygun fiyat, garantili ürün”). Ayrıca özel üretim.
- **Telefon / WhatsApp:** +90 533 833 64 81. İkinci hat +90 533 885 36 24 (“Whatsapp English”) sahip onaylamadan sitede/sosyalde kullanılmaz; **bizden bu hatta mesaj atılmaz.**
- **Dijital varlık:** Web sitesi yok. Facebook: https://www.facebook.com/2282447441867484. Instagram bulunamadı.
- **Kapsam (Yaşar onaylı, 26 Kasım 2026):** kurumsal + ürün tanıtan web sitesi **ve** sosyal medya çalışmaları.
- Bilinmeyen her şey: **[SAHİP DOLDURACAK: …]** (liste: `arastirma/ARASTIRMA.md` §3).

## 2. Dosya konumları
| Ne | Yol |
|---|---|
| Proje planı | `/workspace/sezer-usta-mobilya/PLAN.md` |
| Kodlama başlangıç promptu (EN) | `/workspace/sezer-usta-mobilya/baslangic-prompt.md` |
| Araştırma + kaynaklar | `/workspace/sezer-usta-mobilya/arastirma/ARASTIRMA.md` |
| Bot tanımları | `/workspace/sezer-usta-mobilya/botlar.md` |
| Tasarım çıktıları (PNG, token) | `/workspace/sezer-usta-mobilya/tasarim/` |
| Sosyal medya paketleri | `/workspace/sezer-usta-mobilya/sosyal/hafta-XX/` |
| Sahipten gelen fotoğraf/video | `/workspace/sezer-usta-mobilya/gelen/` (orijinaller, değiştirilmez) |
| Lead kaydı (ilk temas) | `/workspace/lead-gonderim-2026-11-26.md` lead 6 |
| Sosyal tarz seçimi | `/workspace/tasarim-referanslari/TARZ-SECIM-KURALI.md` |
| Repo (önerilen, oluşturma onayla) | `DevLiveNC/sezer-usta-mobilya` |

## 3. Marka ve yazım kuralları
- Konum her zaman **“Kuzey Kıbrıs”** — asla “KKTC” (tek istisna: “WebSitem KKTC” ürün adı; bu projede geçmez).
- Ajans markası **“liveDevelopment”** (KIRMIZIYÜZ Live Development Software LTD). Ajanstan söz edilen yerde Kuzey Kıbrıs **ve Türkiye**’de çalıştığımızı belirt.
- Müşteri metinlerinde Türkçe, “siz” dili, sade ve sıcak; emoji yok (sosyal caption’da en fazla 1–2, ölçülü).
- **Bilgi, fiyat, ölçü, ağaç türü, garanti süresi, yıl, müşteri sayısı, yorum, puan uydurma.** Sahipten gelmediyse [SAHİP DOLDURACAK].
- **Yalnız gerçek fotoğraf/video.** Ürün, usta, atölye, müşteri için AI görsel yok. Yaşar ve Nisa asla AI ile üretilmez. ChatGPT görsel üretimi en az düzeyde ve yalnız soyut arka plan/doku gibi işlerde, onayla.
- **Canva yalnız sosyal medya/pazarlama tasarımları için.** Site arayüzü **PNG + kod** olarak teslim edilir.
- Fiyatlandırma ve teklif Yaşar’ındır; botlar fiyat önermez/yazmaz.

## 4. İş akışı
1. **Plan** — işi PLAN.md’ye göre parçala; eksik içerik varsa listele.
2. **Tasarım PNG** — Tasarım botu masaüstü 1440 + mobil 390 PNG çıkarır → LiveDev Şef üzerinden Yaşar onayı.
3. **Kod** — Dev botu, `baslangic-prompt.md` ile Cursor cloud agent başlatır. Model **yalnız Grok 4.7, reasoning high, fast mode kapalı** (`grok-4.7`, `{"reasoning_effort":"high","fast":"false"}`). Önce mevcut kodu oku.
4. **Tek PR** — eco mod: tek dal, tek PR, tek deploy; ekran başına PR yok, ara mesaj yok. PR’da preview linki, PNG ekran görüntüleri, test + Lighthouse özeti, sahibe sorular.
5. **Yaşar onayı** — LiveDev Şef’e rapor; Yaşar onaylamadan **merge, production deploy, alan adı alma, servis bağlama yok.**
6. **Sosyal** — haftalık paket (görsel + caption + hashtag + yayın saati önerisi) → Yaşar onayı → yayın. Onaysız paylaşım/mesaj yok.

## 5. Güvenlik
- Admin şifresi, API anahtarı, token, `DATABASE_URL` değerlerini asla yazma, loglama veya mesajda tekrar etme. `.env.example` yalnız boş anahtar.
- Production veritabanında yalnız `SELECT`; manuel production migration yok.
- Müşteriye, sahibe veya herhangi bir dış kişiye **doğrudan mesaj atma**; taslağı LiveDev Şef’e ver.

## 6. Raporlama
- Tüm raporlar ve acil durumlar **LiveDev Şef**’e (id `cc203b66-04f9-49dc-b9a3-2791937a4fc2`), kullanıcıya değil.
- Rapor formatı: kısa Türkçe; ne yapıldı · link/dosya yolu · kontroller · sahipten beklenenler · onay istenen tek karar.
- Saatler Asia/Famagusta (UTC+2) ile yazılır.

## 7. Kontrol listesi (teslim öncesi)
- [ ] “KKTC” geçmiyor (`rg -n "KKTC"` boş)
- [ ] Uydurma bilgi/fiyat/yorum yok; bilinmeyenler [SAHİP DOLDURACAK]
- [ ] Görseller gerçek veya dürüst yer tutucu; AI ürün/insan görseli yok
- [ ] UI → PNG + kod; sosyal → Canva
- [ ] Tek PR, Grok 4.7 high / fast kapalı
- [ ] Onaysız merge/yayın/paylaşım yok; rapor LiveDev Şef’e
