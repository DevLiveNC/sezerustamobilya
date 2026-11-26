import type { Metadata } from "next";
import { OwnerTodo, SectionHeader } from "@/components/ui/Marks";

export const metadata: Metadata = {
  title: "Ölçü rehberi",
  description: "Kapı boşluğu nasıl ölçülür: genel bir tarif. Kesin ölçü için Sezer Usta Mobilya’dan teklif alın.",
};

const steps = [
  {
    n: "01",
    title: "Genişliği üç yerden alın",
    body: "Kapı boşluğunun içinden, üstten, ortadan ve alttan genişlik ölçün. En dar olanı not edin. Bu genel bir tariftir.",
  },
  {
    n: "02",
    title: "Yüksekliği üç yerden alın",
    body: "Soldan, ortadan ve sağdan, döşemeden lentoya kadar. En kısa olanı not edin.",
  },
  {
    n: "03",
    title: "Duvar kalınlığı",
    body: "Kasa ve pervaz için duvarın kalınlığı gerekir. Ölçü işletmenin kendi usulüne göre netleşir.",
  },
  {
    n: "04",
    title: "Açılım yönü",
    body: "Kapı içeri mi dışarı mı açılacak, menteşe solda mı sağda mı? İçeriden bakarak söyleyin.",
  },
];

export default function MeasurePage() {
  return (
    <main className="wrap py-12 md:py-20">
      <SectionHeader index="ÖLÇÜ REHBERİ" end="GENEL TARİF" />
      <h1 className="max-w-3xl font-display text-[48px] leading-none tracking-[-0.02em] md:text-[72px]">
        Kapı ölçüsü nasıl alınır?
      </h1>
      <p className="mt-5 max-w-2xl text-ink-soft">
        Aşağısı genel bir anlatımdır; atölyenin kendi ölçü alma usulü bunun yerine geçebilir. Kesin ölçü için teklif alın. <OwnerTodo>ölçü alma hizmeti</OwnerTodo>
      </p>
      <ol className="mt-12 grid gap-10 md:grid-cols-2">
        {steps.map((step) => (
          <li key={step.n} className="border border-line bg-linen p-5">
            <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
              <MeasureSvg n={step.n} />
              <div>
                <p className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">{step.n}</p>
                <h2 className="mt-2 font-display text-[32px] leading-none">{step.title}</h2>
                <p className="mt-3 text-[15px] text-ink-soft">{step.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}

function MeasureSvg({ n }: { n: string }) {
  return (
    <svg viewBox="0 0 140 180" className="h-auto w-full bg-oak" role="img" aria-label={`${n} ölçü çizimi`}>
      <rect x="40" y="24" width="60" height="130" fill="#FAF6EF" stroke="#211B16" />
      {n === "01" ? <path d="M40 50 H100 M40 89 H100 M40 130 H100" stroke="#A8662E" /> : null}
      {n === "02" ? <path d="M55 24 V154 M70 24 V154 M85 24 V154" stroke="#A8662E" /> : null}
      {n === "03" ? <path d="M40 154 H100" stroke="#211B16" strokeWidth="6" /> : null}
      {n === "04" ? <path d="M46 30 L94 89 L46 148" fill="none" stroke="#A8662E" strokeDasharray="4 3" /> : null}
    </svg>
  );
}
