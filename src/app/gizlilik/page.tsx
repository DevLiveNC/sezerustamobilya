import type { Metadata } from "next";
import { OwnerTodo } from "@/components/ui/Marks";

export const metadata: Metadata = {
  title: "Gizlilik",
  description: "Taslak gizlilik metni. Hukuk onayı bekleniyor.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="wrap py-12 md:py-20">
      <p className="inline-flex border border-dashed border-varnish px-2 py-1 font-mono text-[12px] tracking-[0.14em] text-walnut">
        TASLAK
      </p>
      <h1 className="mt-4 font-display text-[48px] leading-none md:text-[72px]">Gizlilik</h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Bu sayfa taslaktır. Yayımlanmış bir metin değildir. Kuzey Kıbrıs’ın kendi kişisel veri düzeni vardır; metin hukuk onayından sonra yazılır.
      </p>
      <div className="mt-8 max-w-2xl space-y-4">
        <p><OwnerTodo>kişisel veriler / gizlilik metni</OwnerTodo></p>
        <p className="text-sm text-ink-soft">Bu bilgi işletme tarafından henüz girilmedi. Bağlantı yok.</p>
      </div>
    </main>
  );
}
