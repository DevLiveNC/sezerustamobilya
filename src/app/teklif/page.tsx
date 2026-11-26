import type { Metadata } from "next";
import { publicBusiness, whatsappHref } from "@/config/public";

export const metadata: Metadata = {
  title: "Teklif",
  description: "Teklif listesi. Fiyat konuşularak verilir.",
};

export default function QuotePage() {
  return (
    <main className="wrap py-12 md:py-16">
      <p className="font-mono text-[12px] tracking-[0.12em] text-ink-soft">TEKLİF</p>
      <h1 className="mt-3 font-display text-[48px] leading-[0.95] md:text-[72px]">Teklif isteyin.</h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Listeniz bu sayfada toplanacak. Fiyat bilgisi sizinle konuşularak verilir. Şimdilik WhatsApp’tan yazabilirsiniz: {publicBusiness.phoneDisplay}.
      </p>
      <a className="btn btn-primary mt-8" href={whatsappHref("Merhaba, teklif almak istiyorum.")}>
        WhatsApp’ta aç
      </a>
    </main>
  );
}
