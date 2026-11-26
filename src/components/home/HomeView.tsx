import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { categories } from "@/config/categories";
import { photoSlots } from "@/config/slots";
import { publicBusiness, whatsappHref } from "@/config/public";
import type { CarvedPiece } from "@/lib/domain/product";
import { dimensionText, statusView } from "@/lib/catalog-view";
import { OwnerTodo, PlaceholderFrame, SectionHeader, StatusBadge } from "@/components/ui/Marks";

const steps = [
  { n: "01", title: "Ölçü", body: "Yerin ve işin ölçüsü alınır. Ölçü alma hizmeti:" },
  { n: "02", title: "Çizim", body: "Parça, ölçüleriyle kâğıda çizilir; birlikte netleştirilir." },
  { n: "03", title: "Oyma", body: "Desen elde, bıçakla ahşaba işlenir." },
  { n: "04", title: "Cila", body: "Yüzey hazırlanır, cila ya da boya atılır. Seçenekler:" },
  { n: "05", title: "Teslim", body: "Teslimat ve montaj:" },
];

export function HomeView({ pieces }: { pieces: CarvedPiece[] }) {
  return (
    <>
      <section className="pt-8 md:pt-[72px]">
        <div className="wrap grid items-end gap-10 lg:grid-cols-[7fr_5fr] lg:gap-[72px]">
          <div>
            <SectionHeader index="01 — ATÖLYE" end="BÜYÜK SANAYİ · GAZİMAĞUSA · KUZEY KIBRIS" />
            <p className="mb-3 font-mono text-[11px] tracking-[0.12em] text-ink-soft lg:hidden">
              BÜYÜK SANAYİ · GAZİMAĞUSA · KUZEY KIBRIS
            </p>
            <h1 data-reveal className="font-display text-[60px] leading-[0.96] tracking-[-0.02em] md:text-[88px] xl:text-[128px] xl:leading-[0.95]">
              <em className="text-walnut">El oyma</em> sanatı ve mobilya ustası.
            </h1>
            <p className="mt-6 max-w-[560px] text-[17px] leading-snug md:text-xl md:leading-relaxed">
              Doğal ahşaptan, tamamen el oyması tek parçalar. Toptan ve perakende melamin ve PVC kapı. Ölçünüze göre özel üretim.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="btn btn-primary" href={whatsappHref("Merhaba, atölyenizle görüşmek istiyorum.")}>
                <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
                WhatsApp’tan yazın
              </a>
              <Link className="btn btn-ghost" href="/teklif">
                Teklif listesi oluşturun
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 border-t border-line pt-4 sm:grid-cols-3">
              <div>
                <span className="font-mono text-[10.5px] tracking-[0.12em] text-ink-soft">TEK PARÇA</span>
                <p className="mt-1 text-[15px]">“Her üründen sadece bir adet vardır.”</p>
              </div>
              <div>
                <span className="font-mono text-[10.5px] tracking-[0.12em] text-ink-soft">KAPI SATIŞI</span>
                <p className="mt-1 text-[15px]">12 Kasım 2026’dan beri, toptan ve perakende</p>
              </div>
              <div>
                <span className="font-mono text-[10.5px] tracking-[0.12em] text-ink-soft">TELEFON</span>
                <p className="mt-1 text-[15px]">
                  <a href={publicBusiness.phoneTel}>{publicBusiness.phoneDisplay}</a>
                </p>
              </div>
            </div>
          </div>
          <div className="relative pr-10">
            <div data-wipe data-parallax>
              <PlaceholderFrame slot={photoSlots["home-hero-4x5"]} />
            </div>
            <div className="absolute inset-y-0 right-0 flex w-8 flex-col items-center" aria-hidden="true">
              <span className="h-px w-3 bg-ink" />
              <span className="w-px flex-1 bg-ink" />
              <span className="bg-shaving py-2 font-mono text-[10.5px] tracking-[0.1em] [writing-mode:vertical-rl]">
                KADRAJ 4:5 · DİKEY
              </span>
              <span className="w-px flex-1 bg-ink" />
              <span className="h-px w-3 bg-ink" />
            </div>
          </div>
        </div>
        <div className="wrap mt-12 hidden md:block">
          <div className="ruler-ticks border-t border-ink" />
          <div className="grid grid-cols-4 pb-8 pt-6">
            {categories.map((category, index) => (
              <Link
                key={category.key}
                href={category.href}
                className={index === 0 ? "pr-6" : "border-l border-line px-6"}
              >
                <span className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">{category.eyebrow}</span>
                <span className="mt-2 flex items-baseline justify-between font-display text-[32px] leading-tight xl:text-[38px]">
                  {category.title}
                  <ArrowRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="mt-2 block text-[14.5px] leading-snug text-ink-soft">{category.summary}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 md:hidden">
          <div className="mx-5 h-4 border-t border-ink bg-[repeating-linear-gradient(to_right,var(--color-ink)_0_1px,transparent_1px_40px)]" />
          <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
            {categories.map((category) => (
              <Link key={category.key} href={category.href} className="w-[232px] shrink-0 snap-start border border-line bg-linen p-4">
                <span className="font-mono text-[10px] tracking-[0.12em] text-ink-soft">{category.eyebrow}</span>
                <span className="mt-2 block font-display text-[32px] leading-none">{category.title}</span>
                <span className="mt-2 block text-[13.5px] leading-snug text-ink-soft">{category.summary}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[72px] md:py-32">
        <div className="wrap">
          <SectionHeader index="02 — TEK PARÇALAR" end="MEVCUT OLANLAR ÖNCE" />
          <div className="mb-12 grid items-end gap-8 lg:grid-cols-[5fr_7fr] lg:gap-[72px]">
            <h2 data-reveal className="font-display text-[44px] leading-none tracking-[-0.02em] md:text-[72px]">
              Her üründen sadece bir adet.
            </h2>
            <p className="max-w-[520px] text-ink-soft">
              “Farklı boyutlarda sandık, ayna çerçevesi ve dolaplar. Tamamıyla el oyması, el emeği.” Satılan parça sitede “satıldı” olarak kalır; benzeri için özel üretim isteyebilirsiniz.
            </p>
          </div>
          <div className="grid gap-14 md:grid-cols-[1.15fr_1fr_1fr] md:gap-14">
            {pieces.map((piece, index) => {
              const status = statusView(piece);
              const offset = index === 1 ? "md:mt-[120px]" : index === 2 ? "md:mt-10" : "";
              return (
                <article key={piece.slug} className={offset}>
                  <Link href={`/urun/${piece.slug}`} className="block">
                    <PlaceholderFrame
                      slot={photoSlots["product-front"]}
                      label={`product-front · ${piece.pieceType}`}
                    />
                  </Link>
                  <div className="mt-6 border-t border-ink pt-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] tracking-[0.08em] text-ink-soft">TEK PARÇA · ÖRNEK KAYIT</span>
                      <StatusBadge status={status.key} />
                    </div>
                    <h3 className="my-3 font-serif text-2xl leading-tight">
                      <Link href={`/urun/${piece.slug}`}>{piece.title.replace(" — örnek kayıt", "")}</Link>
                    </h3>
                    <dl className="grid grid-cols-[86px_1fr] gap-y-2 text-sm">
                      <dt className="font-mono text-[10.5px] tracking-[0.1em] text-ink-soft">AĞAÇ</dt>
                      <dd>{piece.wood ?? <OwnerTodo>ağaç türü</OwnerTodo>}</dd>
                      <dt className="font-mono text-[10.5px] tracking-[0.1em] text-ink-soft">ÖLÇÜ</dt>
                      <dd className="text-ink-soft">{dimensionText(piece.dimensions)}</dd>
                      <dt className="font-mono text-[10.5px] tracking-[0.1em] text-ink-soft">CİLA</dt>
                      <dd>{piece.finish ?? <OwnerTodo>cila / boya</OwnerTodo>}</dd>
                    </dl>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-14 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[11px] tracking-[0.08em] text-ink-soft">
              ÜRÜN ADLARI, AĞAÇ, ÖLÇÜ VE DURUM İŞLETMEDEN GELECEK · ŞU AN ÖRNEK KAYIT
            </p>
            <Link className="btn btn-ghost btn-sm" href="/urunler/el-oymasi">
              Tüm el oyması parçalar
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="band-oak py-[72px] md:py-32">
        <div className="wrap">
          <SectionHeader index="03 — KAPILAR" end="MELAMİN · PVC" />
          <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <div>
              <p className="mb-6 inline-flex border border-olive px-2 py-1 font-mono text-[11px] tracking-[0.1em] text-olive">
                Satışta · 12 Kasım 2026’dan beri
              </p>
              <h2 data-reveal className="font-display text-[44px] leading-none tracking-[-0.02em] md:text-[72px]">
                Kapınızı ölçüsüyle çizin, teklifi alın.
              </h2>
              <blockquote className="mt-8 max-w-md font-display text-[28px] leading-snug md:text-[34px]">
                “Uygun fiyat, garantili ürün.”
              </blockquote>
              <p className="mt-3 font-mono text-[11px] tracking-[0.06em] text-walnut">
                İŞLETMENİN 12 KASIM 2026 DUYURUSUNDAN
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link className="btn btn-primary" href="/kapi-yapilandir/melamin-kapi-ornek">
                  Kapı yapılandırıcı
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
                <Link className="btn btn-ghost" href="/olcu-rehberi">
                  Ölçü nasıl alınır
                </Link>
              </div>
            </div>
            <div className="grid border border-line bg-linen md:grid-cols-[220px_1fr]">
              <div className="border-b border-line p-5 md:border-b-0 md:border-r">
                <p className="mb-2 font-mono text-[11px] tracking-[0.08em] text-walnut">ÖN GÖRÜNÜŞ · 1:20</p>
                <DoorSketch />
              </div>
              <div className="p-5 md:p-7">
                <div className="grid grid-cols-[110px_1fr] border-b border-ink pb-2 font-mono text-[11px] tracking-[0.12em]">
                  <span>ÖZELLİK</span>
                  <span>MELAMİN VE PVC</span>
                </div>
                <SheetRow label="SATIŞ" value="Toptan ve perakende" />
                <SheetRow label="MODELLER" value={<OwnerTodo>model / seri adları</OwnerTodo>} />
                <SheetRow label="RENK / DESEN" value={<OwnerTodo>renk ve desen kartelası</OwnerTodo>} />
                <SheetRow label="STANDART ÖLÇÜ" value={<OwnerTodo>standart ölçüler</OwnerTodo>} />
                <SheetRow label="KASA / PERVAZ" value={<OwnerTodo>kasa ve pervaz seçenekleri</OwnerTodo>} />
                <SheetRow
                  label="GARANTİ"
                  value={
                    <>
                      “Garantili ürün” — işletmenin ifadesi
                      <br />
                      <OwnerTodo>süre ve kapsam</OwnerTodo>
                    </>
                  }
                />
                <p className="mt-4 font-mono text-[11px] tracking-[0.06em] text-walnut">
                  Fiyat için teklif alın · fiyat bilgisi WhatsApp’tan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[72px] md:py-32">
        <div className="wrap">
          <SectionHeader index="04 — ÖZEL ÜRETİM" end="ÖLÇÜ → TESLİM" />
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[5fr_7fr]">
            <h2 data-reveal className="font-display text-[44px] leading-none tracking-[-0.02em] md:text-[72px]">
              Ölçünüzden başlar, cilayla biter.
            </h2>
            <p className="text-ink-soft">
              Aklınızdaki işi ve ölçüsünü anlatın; atölyede çizip oyuyoruz. Üretim süresi: <OwnerTodo>ortalama süre</OwnerTodo>
            </p>
          </div>
          <ol className="grid gap-6 md:grid-cols-5">
            {steps.map((step) => (
              <li key={step.n} className="border-t border-ink pt-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink font-mono text-xs">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-[30px] leading-none md:text-[40px]">{step.title}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">
                  {step.body}{" "}
                  {step.n === "01" || step.n === "05" ? <OwnerTodo>bölgeler</OwnerTodo> : null}
                  {step.n === "04" ? <OwnerTodo>cila</OwnerTodo> : null}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-walnut py-[72px] text-shaving md:py-32">
        <div className="wrap">
          <SectionHeader index="05 — ATÖLYE" end="BÜYÜK SANAYİ, GAZİMAĞUSA" onDark />
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <PlaceholderFrame slot={photoSlots["hands-carving-1x1"]} dark />
            <div>
              <blockquote data-reveal className="font-display text-[46px] leading-none tracking-[-0.02em] md:text-[76px]">
                “Tamamıyla <em className="text-oak">el oyması</em>, el emeği.”
              </blockquote>
              <p className="mt-5 font-mono text-[11px] tracking-[0.08em] text-shaving/60">
                İŞLETMENİN KENDİ PAYLAŞIMINDAN · EYLÜL 2023
              </p>
              <div className="mt-8 grid gap-6 border-t border-line/35 pt-6 sm:grid-cols-2">
                <div>
                  <span className="font-mono text-[10.5px] tracking-[0.12em] text-shaving/55">USTA</span>
                  <p className="mt-2"><OwnerTodo onDark>ustanın adı ve hikâyesi</OwnerTodo></p>
                </div>
                <div>
                  <span className="font-mono text-[10.5px] tracking-[0.12em] text-shaving/55">KURULUŞ</span>
                  <p className="mt-2"><OwnerTodo onDark>kuruluş yılı</OwnerTodo></p>
                </div>
              </div>
              <Link className="btn btn-light mt-8" href="/hakkimizda">
                Atölyeyi tanıyın
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[72px] md:py-32">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[7fr_5fr] lg:gap-20">
          <div>
            <SectionHeader index="06 — İLETİŞİM" />
            <h2 data-reveal className="font-display text-[44px] leading-none tracking-[-0.02em] md:text-[72px] xl:text-[88px]">
              Ölçünüzü söyleyin, gerisini atölyede konuşalım.
            </h2>
            <p className="mt-6 max-w-[520px] text-lg text-ink-soft">
              Tek parça bir sandık, on adet kapı ya da ölçüye göre bir dolap — WhatsApp’tan yazın ya da teklif listenizi gönderin.
            </p>
          </div>
          <div className="border border-line bg-linen p-6 md:p-8">
            <p className="font-mono text-[12px] tracking-[0.12em] text-ink-soft">TELEFON · WHATSAPP</p>
            <p className="my-3 font-display text-[40px] leading-none md:text-[46px]">
              <a href={publicBusiness.phoneTel}>{publicBusiness.phoneDisplay}</a>
            </p>
            <div className="flex flex-col gap-2.5">
              <a className="btn btn-primary w-full justify-between" href={whatsappHref("Merhaba, teklif almak istiyorum.")}>
                WhatsApp’tan yazın
                <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a className="btn btn-ghost w-full justify-between" href={publicBusiness.phoneTel}>
                Arayın
                <Phone className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
            <dl className="mt-6 text-sm">
              <div className="grid grid-cols-[110px_1fr] gap-3 border-t border-line py-2.5">
                <dt className="font-mono text-[10.5px] tracking-[0.1em] text-ink-soft">ADRES</dt>
                <dd>
                  {publicBusiness.location}
                  <br />
                  <OwnerTodo>açık adres ve harita konumu</OwnerTodo>
                </dd>
              </div>
              <div className="grid grid-cols-[110px_1fr] gap-3 border-t border-line py-2.5">
                <dt className="font-mono text-[10.5px] tracking-[0.1em] text-ink-soft">SAATLER</dt>
                <dd><OwnerTodo>çalışma saatleri</OwnerTodo></dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

function SheetRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 border-b border-line py-3 text-sm">
      <span className="pt-1 font-mono text-[10.5px] tracking-[0.1em] text-walnut">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function DoorSketch() {
  return (
    <svg viewBox="0 0 250 330" className="h-auto w-full" role="img" aria-label="Kapı ön görünüş taslağı, ölçü işletmeden bekleniyor">
      <g fill="none" stroke="#211B16" strokeWidth="1.2">
        <rect x="58" y="22" width="150" height="270" />
        <rect x="68" y="32" width="130" height="260" strokeWidth="1" />
        <path d="M198 32 L68 162 L198 292" strokeDasharray="4 4" stroke="#A8662E" strokeWidth="1" />
        <rect x="76" y="156" width="14" height="4" fill="#211B16" />
      </g>
      <text x="133" y="314" textAnchor="middle" fill="#4A3426" fontSize="10" fontFamily="IBM Plex Mono, monospace">
        E — cm
      </text>
      <text x="34" y="162" textAnchor="middle" fill="#4A3426" fontSize="10" fontFamily="IBM Plex Mono, monospace" transform="rotate(-90 34 162)">
        B — cm
      </text>
    </svg>
  );
}
