import "server-only";
import { publicBusiness } from "@/config/public";

export interface Sourced<T> {
  value: T;
  source: string;
  confirmedByOwner: false;
}

/**
 * Facts checked against public posts on 26 Nov 2026.
 * `confirmedByOwner` stays false until the owner signs them off.
 * The English WhatsApp line is stored and must not be rendered.
 */
export const business = {
  name: {
    value: publicBusiness.name,
    source: "işletmenin kendi adı",
    confirmedByOwner: false,
  },
  tagline: {
    value: publicBusiness.tagline,
    source: "Facebook sayfa açıklaması",
    confirmedByOwner: false,
  },
  location: {
    value: publicBusiness.location,
    locality: publicBusiness.locality,
    region: publicBusiness.region,
    district: publicBusiness.district,
    streetAddress: null,
    geo: null,
    source: "kamuya açık işletme bilgisi, 26 Kasım 2026",
    confirmedByOwner: false,
  },
  phone: {
    e164: publicBusiness.phoneE164,
    display: publicBusiness.phoneDisplay,
    source: "işletmenin yayımladığı telefon",
    confirmedByOwner: false,
    hidden: false,
  },
  hiddenPhones: [
    {
      e164: "+905338853624",
      display: "+90 533 885 36 24",
      label: "Whatsapp English",
      source: "bir paylaşımda geçen ikinci hat",
      confirmedByOwner: false,
      hidden: true,
    },
  ],
  statements: [
    {
      text: "Doğal ahşap · El oyması · Her üründen sadece bir adet vardır",
      when: "2025-01",
      source: "işletmenin kendi paylaşımı",
    },
    {
      text: "Farklı boyutlarda sandık, ayna çerçevesi ve dolaplar. Tamamıyla el oyması, el emeği.",
      when: "2023-09",
      source: "işletmenin kendi paylaşımı",
    },
    {
      text: "Toptan ve perakende melamin ve PVC kapı satışlarımız başlamıştır. Uygun fiyat, garantili ürün.",
      when: "2026-11-12",
      source: "işletmenin kendi paylaşımı",
    },
  ],
  email: null,
  hours: null,
  instagram: null,
  legalName: null,
  servesTurkiye: false,
} as const;
