import type { Metadata } from "next";
import { jsonContentSource } from "@/lib/content/source";
import { SectionHeader } from "@/components/ui/Marks";

export const metadata: Metadata = {
  title: "Sık sorulanlar",
  description: "Örnek sorular. Cevaplar işletmeden bekleniyor.",
};

export default async function FaqPage() {
  const faq = await jsonContentSource.getFaq();
  return (
    <main className="wrap py-12 md:py-20">
      <SectionHeader index="SIK SORULANLAR" end="ÖRNEK SORULAR" />
      <h1 className="font-display text-[48px] leading-none tracking-[-0.02em] md:text-[72px]">Sorular.</h1>
      <p className="mt-4 max-w-xl text-ink-soft">Cevaplar örnek kayıttır ve işletme yazana kadar yerinde durur.</p>
      <dl className="mt-10 max-w-3xl">
        {faq.map((item) => (
          <div key={item.id} className="border-t border-ink py-6">
            <dt className="font-serif text-2xl">{item.question}</dt>
            <dd className="mt-2 text-ink-soft">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
