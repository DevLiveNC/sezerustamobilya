import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { siteUrl } from "@/config/public";

export const metadata: Metadata = {
  title: "Teklif",
  description: "Teklif listesi. Fiyat konuşularak verilir.",
};

export default function QuotePage() {
  return (
    <main className="wrap py-12 md:py-16">
      <p className="font-mono text-[12px] tracking-[0.12em] text-ink-soft">TEKLİF</p>
      <h1 className="mt-3 font-display text-5xl leading-[0.95] md:text-7xl">Teklif isteyin.</h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Fiyat listede yazılmaz. Fotoğraflar tarayıcıda kalır, sunucuya gitmez. Talep WhatsApp mesajına döner.
      </p>
      <div className="mt-10">
        <QuoteForm origin={siteUrl().origin} />
      </div>
    </main>
  );
}
