"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { publicBusiness } from "@/config/public";

export function MobileActionBar() {
  const pathname = usePathname();
  const hidden = pathname === "/teklif";
  useEffect(() => {
    document.body.dataset.actionbar = hidden ? "off" : "on";
  }, [hidden]);
  if (hidden) return null;
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-[1fr_1fr_1.3fr] gap-2 border-t border-line bg-linen px-3 py-2.5 pb-3.5 md:hidden"
      aria-label="Hızlı iletişim"
    >
      <a href={publicBusiness.whatsappBase} className="inline-flex h-12 items-center justify-center gap-2 border border-line text-sm font-semibold">
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        WhatsApp
      </a>
      <a href={publicBusiness.phoneTel} className="inline-flex h-12 items-center justify-center gap-2 border border-line text-sm font-semibold">
        <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        Ara
      </a>
      <Link href="/teklif" className="inline-flex h-12 items-center justify-center bg-walnut text-sm font-semibold text-shaving">
        Teklif
      </Link>
    </nav>
  );
}
