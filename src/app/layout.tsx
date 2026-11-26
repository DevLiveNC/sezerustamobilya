import type { Metadata } from "next";
import { publicBusiness, siteUrl } from "@/config/public";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: `${publicBusiness.name} — Gazimağusa`,
  description: publicBusiness.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
