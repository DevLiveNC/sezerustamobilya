import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { publicBusiness, whatsappHref } from "@/config/public";
import { SectionHeader } from "@/components/ui/Marks";

export default function NotFound() {
  const links = [
    { n: "01", href: "/", label: "Ana sayfa" },
    { n: "02", href: "/urunler/el-oymasi", label: "El oyması tek parçalar" },
    { n: "03", href: "/kapi-yapilandir/melamin-kapi-ornek", label: "Kapı yapılandırıcı" },
  ];
  return (
    <main className="wrap grid items-center gap-12 py-16 md:py-28 lg:grid-cols-[7fr_5fr]">
      <div>
        <SectionHeader index="HATA 404" end="SAYFA BULUNAMADI" />
        <h1 className="font-display text-[64px] leading-[0.9] tracking-[-0.02em] md:text-[120px]">
          Bu ölçü <em className="text-walnut">bizde</em> yok.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-ink-soft">
          Aradığınız sayfa taşınmış, satılmış bir parçaya ait ya da hiç var olmamış olabilir. Atölyede başka neler var, buradan bakın.
        </p>
        <div className="mt-8 border-t border-ink">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="grid grid-cols-[48px_1fr_auto] items-center border-b border-line py-4 font-display text-[26px] md:text-[30px]">
              <span className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">{link.n}</span>
              {link.label}
              <span aria-hidden="true">→</span>
            </Link>
          ))}
          <a
            href={whatsappHref("Merhaba, sitede aradığım sayfayı bulamadım.")}
            className="grid grid-cols-[48px_1fr_auto] items-center border-b border-line py-4 font-display text-[22px] md:text-[28px]"
          >
            <span className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">04</span>
            WhatsApp’tan sorun · {publicBusiness.phoneDisplay}
            <MessageCircle className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
      <BrokenDrawing />
    </main>
  );
}

function BrokenDrawing() {
  return (
    <div className="border border-line bg-linen p-6">
      <svg viewBox="0 0 460 520" className="h-auto w-full" role="img" aria-label="Kırık ölçü çizgisi, çizim no 404">
        <rect width="460" height="520" fill="#FAF6EF" />
        <g fill="none" stroke="#211B16" strokeWidth="1.2">
          <path d="M60 130 H196" />
          <path d="M196 130 l6 -10 l8 20 l6 -10" />
          <path d="M262 166 l6 -10 l8 20 l6 -10" />
          <path d="M282 166 H400" />
          <path d="M226 118 V180" stroke="#A8662E" strokeDasharray="3 4" />
          <rect x="110" y="230" width="120" height="220" />
        </g>
        <g transform="rotate(-9 317 350)" fill="none" stroke="#211B16" strokeWidth="1.1">
          <rect x="262" y="250" width="110" height="200" />
        </g>
        <rect x="80" y="84" width="104" height="26" fill="#4A3426" />
        <text x="132" y="102" textAnchor="middle" fill="#FAF6EF" fontSize="13" fontFamily="IBM Plex Mono, monospace">
          E ??? cm
        </text>
        <text x="282" y="200" fill="#4A3426" fontSize="10" fontFamily="IBM Plex Mono, monospace">
          HİZA KAYDI
        </text>
        <text x="30" y="500" fill="#6A5D50" fontSize="10" fontFamily="IBM Plex Mono, monospace">
          ÇİZİM NO. 404 · ÖLÇÜ TUTMADI · 1:∞
        </text>
      </svg>
    </div>
  );
}
