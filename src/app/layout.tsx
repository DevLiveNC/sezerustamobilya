import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono, Instrument_Serif, Young_Serif } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PreviewRibbon } from "@/components/layout/PreviewRibbon";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { isPreviewMode, publicBusiness, siteUrl } from "@/config/public";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const young = Young_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-young-serif",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${instrument.variable} ${young.variable} ${hanken.variable} ${plex.variable}`}
    >
      <body className="min-h-full antialiased">
        <a className="skip" href="#icerik">
          İçeriğe geç
        </a>
        <PreviewRibbon />
        <Header />
        <div id="icerik">{children}</div>
        <Footer />
        <MobileActionBar />
        <MotionRoot />
      </body>
    </html>
  );
}
