import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glif denemesi",
  robots: { index: false, follow: false },
};

const sample = "ç ğ ı İ ö ş ü Ç Ğ Ö Ş Ü â î û";

const faces = [
  { id: "display", label: "Instrument Serif", className: "font-display text-5xl" },
  { id: "wordmark", label: "Young Serif", className: "font-wordmark text-5xl" },
  { id: "serif", label: "Young Serif ürün", className: "font-serif text-3xl" },
  { id: "sans", label: "Hanken Grotesk", className: "font-sans text-3xl" },
  { id: "mono", label: "IBM Plex Mono", className: "font-mono text-2xl" },
];

export default function GlyphPage() {
  return (
    <main className="wrap py-12">
      <h1 className="font-display text-4xl">Glif denemesi</h1>
      <p className="mt-2 text-ink-soft">Bu sayfa site haritasında yok.</p>
      <ul className="mt-8 space-y-8">
        {faces.map((face) => (
          <li key={face.id}>
            <p className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">{face.label}</p>
            <p data-testid={face.id} className={face.className}>
              {sample}
            </p>
            <p className={face.id === "display" ? `${face.className} italic` : face.className}>
              Gazimağusa, Büyük Sanayi, Kuzey Kıbrıs
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
