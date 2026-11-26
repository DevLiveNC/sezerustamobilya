import type { Metadata } from "next";
import { Suspense } from "react";
import { jsonContentSource } from "@/lib/content/source";
import { canShowBeforeAfter } from "@/lib/content/load";
import { ReferenceBoard } from "@/components/gallery/ReferenceBoard";
import { BeforeAfter } from "@/components/gallery/BeforeAfter";
import { SectionHeader } from "@/components/ui/Marks";

export const metadata: Metadata = {
  title: "Referanslar",
  description: "Müşteri onayı olan işler. Örnek kayıtta gerçek fotoğraf yok.",
};

export default async function ReferencesPage() {
  const [references, images] = await Promise.all([
    jsonContentSource.getReferences(),
    jsonContentSource.getImages(),
  ]);
  const comparable = references.filter((reference) => canShowBeforeAfter(reference, images));
  return (
    <main className="wrap py-12 md:py-20">
      <SectionHeader index="REFERANSLAR" end="ONAYLI KAYITLAR" />
      <h1 className="font-display text-[48px] leading-none tracking-[-0.02em] md:text-[72px]">İşler.</h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Yalnız müşterisi onaylayan işler görünür. Önce / sonra kaydırıcısı iki gerçek fotoğraf gelince açılır.
      </p>
      {comparable.map((reference) => (
        <div key={reference.id} className="mt-8 max-w-xl">
          <BeforeAfter
            beforeLabel={reference.beforeAfter?.before.alt ?? "Önce"}
            afterLabel={reference.beforeAfter?.after.alt ?? "Sonra"}
          />
        </div>
      ))}
      {references.length === 0 ? (
        <p className="mt-10">Gösterilecek onaylı referans yok.</p>
      ) : (
        <Suspense fallback={<p className="mt-10">Kayıtlar yükleniyor.</p>}>
          <ReferenceBoard
            items={references.map((reference) => ({
              id: reference.id,
              title: reference.title,
              category: reference.productSlugs.some((slug) => slug.startsWith("el-oymasi")) ? "El oyması" : "Atölye",
              year: reference.year ? String(reference.year) : null,
              meta: `${reference.location ?? "Konum işletmeden bekleniyor"}${reference.year ? ` · ${reference.year}` : ""}${reference.isSample ? " · örnek kayıt" : ""}`,
            }))}
          />
        </Suspense>
      )}
    </main>
  );
}
