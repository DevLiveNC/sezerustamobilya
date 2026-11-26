import type { Metadata } from "next";
import { photoSlots } from "@/config/slots";
import { jsonContentSource } from "@/lib/content/source";
import { PlaceholderFrame, SectionHeader } from "@/components/ui/Marks";

export const metadata: Metadata = {
  title: "Referanslar",
  description: "Müşteri onayı olan işler. Örnek kayıtta gerçek fotoğraf yok.",
};

export default async function ReferencesPage() {
  const references = await jsonContentSource.getReferences();
  return (
    <main className="wrap py-12 md:py-20">
      <SectionHeader index="REFERANSLAR" end="ONAYLI KAYITLAR" />
      <h1 className="font-display text-[48px] leading-none tracking-[-0.02em] md:text-[72px]">İşler.</h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Yalnız müşterisi onaylayan işler görünür. Önce / sonra kaydırıcısı iki gerçek fotoğraf gelince açılır.
      </p>
      {references.length === 0 ? (
        <p className="mt-10">Gösterilecek onaylı referans yok.</p>
      ) : (
        <ul className="mt-10 grid gap-8 sm:grid-cols-2">
          {references.map((reference) => (
            <li key={reference.id} className="border border-line bg-linen">
              <PlaceholderFrame slot={photoSlots["reference-after"]} label={reference.title} ratio="4 / 3" />
              <div className="p-4">
                <h2 className="font-serif text-2xl">{reference.title}</h2>
                <p className="mt-1 text-sm text-ink-soft">
                  {reference.location ?? "Konum işletmeden bekleniyor"}
                  {reference.year ? ` · ${reference.year}` : ""}
                  {reference.isSample ? " · örnek kayıt" : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
