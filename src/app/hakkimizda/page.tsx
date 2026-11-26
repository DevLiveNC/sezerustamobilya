import type { Metadata } from "next";
import { business } from "@/config/business";
import { publicBusiness } from "@/config/public";
import { photoSlots } from "@/config/slots";
import { OwnerTodo, PlaceholderFrame, SectionHeader } from "@/components/ui/Marks";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Büyük Sanayi, Gazimağusa’da el oyma atölyesi. Sezer Usta Mobilya’nın kendi cümleleri.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="wrap py-12 md:py-20">
        <SectionHeader index="ATÖLYE" end="GAZİMAĞUSA · KUZEY KIBRIS" />
        <h1 className="max-w-4xl font-display text-[48px] leading-none tracking-[-0.02em] md:text-[80px]">
          El oyma sanatı ve mobilya ustası.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-soft">
          Atölye Büyük Sanayi, Gazimağusa’da. Aşağıdaki cümleler işletmenin kendi paylaşımlarından. Yıl, usta adı ve açık adres henüz yazılmadı.
        </p>
        <div className="mt-12 grid gap-8">
          {business.statements.map((statement) => (
            <blockquote key={statement.when} className="border-t border-ink pt-6">
              <p className="font-display text-[32px] leading-snug md:text-[40px]">“{statement.text}”</p>
              <footer className="mt-3 font-mono text-[11px] tracking-[0.08em] text-ink-soft">
                {statement.source} · {statement.when}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
      <section className="band-oak py-16 md:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <PlaceholderFrame slot={photoSlots["atolye-wide-3x2"]} />
          <div>
            <h2 className="font-display text-[40px] leading-none">Tezgâhtan teslime</h2>
            <ol className="mt-6 space-y-4">
              {[
                ["Ölçü", "Yerin ve işin ölçüsü alınır."],
                ["Çizim", "Parça kâğıda çizilir, birlikte netleştirilir."],
                ["Oyma", "Desen elde, bıçakla işlenir."],
                ["Cila", "Yüzey hazırlanır. Cila seçenekleri işletmeden bekleniyor."],
                ["Teslim", "Teslimat bölgesi işletmeden bekleniyor."],
              ].map(([title, body]) => (
                <li key={title}>
                  <span className="font-serif text-2xl">{title}</span>
                  <p className="text-walnut">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="wrap grid gap-8 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h2 className="font-mono text-[12px] tracking-[0.12em] text-ink-soft">USTA</h2>
          <p className="mt-3"><OwnerTodo>ustanın adı ve hikâyesi</OwnerTodo></p>
          <p className="mt-4"><OwnerTodo>kuruluş yılı</OwnerTodo></p>
        </div>
        <div>
          <h2 className="font-mono text-[12px] tracking-[0.12em] text-ink-soft">KONUM</h2>
          <p className="mt-3">{publicBusiness.location}</p>
          <p className="mt-3 text-ink-soft">Büyük Sanayi, Gazimağusa — konum pini işletmeden bekleniyor.</p>
          <p className="mt-3"><OwnerTodo>açık adres ve harita konumu</OwnerTodo></p>
        </div>
      </section>
    </main>
  );
}
