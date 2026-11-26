import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { Header, type SearchHit } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PreviewRibbon } from "@/components/layout/PreviewRibbon";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { QuoteRoot } from "@/components/quote/QuoteRoot";
import { FurnitureJsonLd } from "@/components/seo/JsonLd";
import { isPreviewMode, publicBusiness, siteUrl } from "@/config/public";
import { jsonContentSource } from "@/lib/content/source";
import "./globals.css";

const instrument = localFont({
  src: [{ path: "../fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: true,
  adjustFontFallback: "Times New Roman",
});

const instrumentItalic = localFont({
  src: [{ path: "../fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" }],
  variable: "--font-instrument-italic",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const young = localFont({
  src: "../fonts/YoungSerif-Regular.woff2",
  weight: "400",
  variable: "--font-young-serif",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
});

const hanken = localFont({
  src: "../fonts/HankenGrotesk.woff2",
  weight: "100 900",
  variable: "--font-hanken",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial",
});

const plex = localFont({
  src: [
    { path: "../fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: {
    default: `${publicBusiness.name} — Gazimağusa`,
    template: `%s | ${publicBusiness.name} — Gazimağusa`,
  },
  description: publicBusiness.tagline,
  robots: isPreviewMode() ? { index: false, follow: false } : { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await jsonContentSource.getProducts();
  const hits: SearchHit[] = products.map((product) => ({
    title: product.title,
    href: product.kind === "door-model" ? `/kapi-yapilandir/${product.slug}` : `/urun/${product.slug}`,
    group: product.kind === "door-model" ? "Kapı" : product.kind === "custom-work" ? "Özel üretim" : "El oyması",
  }));
  return (
    <html
      lang="tr"
      className={`${instrument.variable} ${instrumentItalic.variable} ${young.variable} ${hanken.variable} ${plex.variable}`}
    >
      <body className="min-h-full antialiased">
        <a className="skip" href="#icerik">
          İçeriğe geç
        </a>
        <FurnitureJsonLd />
        <QuoteRoot />
        <PreviewRibbon />
        <Header hits={hits} />
        <div id="icerik">{children}</div>
        <Footer />
        <MobileActionBar />
        <MotionRoot />
      </body>
    </html>
  );
}
