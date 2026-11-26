import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { publicBusiness, whatsappHref } from "@/config/public";
import { OwnerTodo, SectionHeader } from "@/components/ui/Marks";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Sezer Usta Mobilya, Büyük Sanayi, Gazimağusa. Telefon ve WhatsApp +90 533 833 64 81.",
};

export default function ContactPage() {
  return (
    <main className="wrap py-12 md:py-20">
      <SectionHeader index="İLETİŞİM" end="BÜYÜK SANAYİ · GAZİMAĞUSA" />
      <h1 className="max-w-3xl font-display text-[48px] leading-none tracking-[-0.02em] md:text-[72px]">
        Ölçünüzü söyleyin.
      </h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="border border-line bg-linen p-6 md:p-8">
          <p className="font-mono text-[12px] tracking-[0.12em] text-ink-soft">TELEFON · WHATSAPP</p>
          <p className="my-3 font-display text-[40px] leading-none md:text-[52px]">
            <a href={publicBusiness.phoneTel}>{publicBusiness.phoneDisplay}</a>
          </p>
          <div className="flex flex-col gap-3">
            <a className="btn btn-primary" href={whatsappHref("Merhaba, atölyenizle görüşmek istiyorum.")}>
              <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
              WhatsApp’tan yazın
            </a>
            <a className="btn btn-ghost" href={publicBusiness.phoneTel}>
              <Phone className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
              Arayın
            </a>
            <Link className="btn btn-ghost" href="/teklif">
              Teklif formu
            </Link>
          </div>
        </div>
        <div>
          <h2 className="font-serif text-2xl">Adres</h2>
          <p className="mt-2">{publicBusiness.location}</p>
          <p className="mt-3 border border-line bg-oak/60 p-4 text-walnut">
            Büyük Sanayi, Gazimağusa — konum pini işletmeden bekleniyor.
          </p>
          <p className="mt-3"><OwnerTodo>açık adres ve harita konumu</OwnerTodo></p>
          <h2 className="mt-8 font-serif text-2xl">Saatler</h2>
          <p className="mt-2"><OwnerTodo>çalışma saatleri</OwnerTodo></p>
          <p className="mt-3 text-sm text-ink-soft">Bu bilgi işletme tarafından henüz girilmedi.</p>
          <h2 className="mt-8 font-serif text-2xl">E-posta</h2>
          <p className="mt-2"><OwnerTodo>e-posta</OwnerTodo></p>
          <p className="mt-3 text-sm text-ink-soft">Bu bilgi işletme tarafından henüz girilmedi.</p>
        </div>
      </div>
    </main>
  );
}
