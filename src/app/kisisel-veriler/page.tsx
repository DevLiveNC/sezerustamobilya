import type { Metadata } from "next";
import { OwnerTodo } from "@/components/ui/Marks";

export const metadata: Metadata = {
  title: "Kişisel verilerin korunması",
  description: "Taslak. Hukuk onayı bekleniyor.",
  robots: { index: false, follow: false },
};

export default function PersonalDataPage() {
  return (
    <main className="wrap py-12 md:py-20">
      <p className="inline-flex border border-dashed border-varnish px-2 py-1 font-mono text-[12px] tracking-[0.14em] text-walnut">
        TASLAK
      </p>
      <h1 className="mt-4 max-w-3xl font-display text-[44px] leading-none md:text-[64px]">
        Kişisel Verilerin Korunması
      </h1>
      <p className="mt-6 max-w-2xl">
        <OwnerTodo>kişisel veriler metni — hukuk onayı</OwnerTodo>
      </p>
      <p className="mt-6 max-w-2xl text-ink-soft">
        Kuzey Kıbrıs’ın kişisel verilere ilişkin kendi düzeni vardır. Bu taslak başka bir ülkenin kanununu uygulanan hukuk diye göstermez. Metin hukuk onayından sonra yazılır.
      </p>
    </main>
  );
}
