import type { DoorOpening } from "@/lib/domain";
import { openingLabel } from "@/lib/doors/engine";

const INK = "#211B16";
const SOFT = "#6A5D50";
const WALNUT = "#4A3426";
const LINEN = "#FAF6EF";
const VARNISH = "#A8662E";
const LINE = "#D3C2A8";

export interface DoorElevationProps {
  widthCm: number;
  heightCm: number;
  opening: DoorOpening;
  materialLabel: string;
  modelLabel: string;
  colourLabel: string;
  example: boolean;
  summary: string;
}

export function DoorElevation({
  widthCm,
  heightCm,
  opening,
  materialLabel,
  modelLabel,
  colourLabel,
  example,
  summary,
}: DoorElevationProps) {
  const safeWidth = Math.max(widthCm, 1);
  const safeHeight = Math.max(heightCm, 1);
  const scale = Math.min(252 / safeWidth, 586 / safeHeight);
  const leafW = safeWidth * scale;
  const leafH = safeHeight * scale;
  const left = 170;
  const top = 92;
  const hingeRight = opening.startsWith("sag");
  const swingInside = opening.endsWith("ice");
  const hingeX = hingeRight ? left + leafW - 5 : left - 2;
  const handleX = hingeRight ? left + 24 : left + leafW - 24;
  const midY = top + leafH / 2;
  const apexX = hingeRight ? left + leafW - 6 : left + 6;
  const swing = `M${left + 4} ${top + 4} L${apexX} ${midY} L${left + 4} ${top + leafH - 2}`;
  const swingMirrored = `M${left + leafW - 4} ${top + 4} L${apexX} ${midY} L${left + leafW - 4} ${top + leafH - 2}`;
  const widthLabel = `${example ? "E " : "E "}${trim(safeWidth)} cm`;
  const heightLabel = `B ${trim(safeHeight)} cm`;

  return (
    <svg
      data-door-elevation
      viewBox="0 0 780 800"
      width="100%"
      height="100%"
      role="img"
      aria-label={summary}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{summary}</title>
      <defs>
        <pattern id="door-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V8" stroke={INK} strokeWidth="0.8" />
        </pattern>
      </defs>
      <path d={`M60 680H${left + leafW + 40}`} stroke={INK} strokeWidth="1.4" />
      <rect x="60" y="680" width={left + leafW - 20} height="10" fill="url(#door-hatch)" opacity="0.35" />
      <path d={`M${left - 16} 680V${top - 16}H${left + leafW + 16}V680`} fill="none" stroke={INK} strokeWidth="1.4" />
      <rect x={left + 2} y={top + 2} width={leafW - 4} height={leafH - 4} fill={LINEN} stroke={INK} strokeWidth="0.8" />
      <path
        d={hingeRight ? swing : swingMirrored}
        fill="none"
        stroke={VARNISH}
        strokeWidth="1"
        strokeDasharray="6 5"
      />
      {[0.18, 0.5, 0.82].map((ratio) => (
        <rect key={ratio} x={hingeX} y={top + leafH * ratio - 13} width="7" height="26" fill={INK} />
      ))}
      <circle cx={handleX} cy={midY} r="9" fill="none" stroke={INK} strokeWidth="1.2" />
      <rect x={hingeRight ? handleX : handleX - 40} y={midY - 3} width="40" height="6" rx="3" fill={INK} />
      <text x={left + leafW / 2} y="48" textAnchor="middle" fill={SOFT} fontSize="10" letterSpacing="0.08em">
        KASA · {modelLabel}
      </text>
      <text x={left + leafW / 2} y="64" textAnchor="middle" fill={WALNUT} fontSize="10">
        {colourLabel}
      </text>
      <path d={`M${left} ${top + leafH + 14}V742M${left + leafW} ${top + leafH + 14}V742`} stroke={INK} strokeWidth="0.8" />
      <path d={`M${left} 732H${left + leafW}`} stroke={INK} />
      <rect x={left + leafW / 2 - 58} y="720" width="116" height="24" fill={WALNUT} />
      <text x={left + leafW / 2} y="736.5" textAnchor="middle" fill={LINEN} fontSize="12.5" fontWeight="600">
        {widthLabel}
      </text>
      <text x={left + leafW / 2} y="766" textAnchor="middle" fill={SOFT} fontSize="9.5">
        {example ? "GENİŞLİK · ÖRNEK" : "GENİŞLİK"}
      </text>
      <path d={`M${left - 26} ${top}H96M${left - 26} ${top + leafH}H96`} stroke={INK} strokeWidth="0.8" />
      <path d={`M106 ${top}V${top + leafH}`} stroke={INK} />
      <rect x="94" y={midY - 60} width="24" height="120" fill={WALNUT} />
      <text transform={`translate(110.5 ${midY}) rotate(-90)`} textAnchor="middle" fill={LINEN} fontSize="12.5" fontWeight="600">
        {heightLabel}
      </text>
      <PlanInset hingeRight={hingeRight} swingInside={swingInside} label={openingLabel(opening)} />
      <TitleBlock materialLabel={materialLabel} modelLabel={modelLabel} example={example} />
    </svg>
  );
}

function PlanInset({ hingeRight, swingInside, label }: { hingeRight: boolean; swingInside: boolean; label: string }) {
  const hinge = hingeRight ? 682 : 558;
  const far = hingeRight ? 558 : 682;
  const leafEnd = swingInside ? 148 : 396;
  const sweep = hingeRight === swingInside ? 0 : 1;
  return (
    <g>
      <rect x="500" y="92" width="240" height="250" fill={LINEN} stroke={INK} strokeWidth="0.8" />
      <text x="514" y="116" fill={INK} fontSize="10" fontWeight="500" letterSpacing="0.08em">
        PLAN · AÇILIM YÖNÜ
      </text>
      <rect x="514" y="272" width="44" height="16" fill="url(#door-hatch)" stroke={INK} strokeWidth="0.8" />
      <rect x="682" y="272" width="44" height="16" fill="url(#door-hatch)" stroke={INK} strokeWidth="0.8" />
      <path d={`M${hinge} 272V${leafEnd}`} stroke={INK} strokeWidth="3" />
      <path
        d={`M${hinge} ${leafEnd}A124 124 0 0 ${sweep} ${far} 272`}
        fill="none"
        stroke={VARNISH}
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <circle cx={hinge} cy="272" r="3" fill={INK} />
      <text x="620" y="312" textAnchor="middle" fill={SOFT} fontSize="9.5">
        İÇ ↑ · DIŞ ↓
      </text>
      <text x="620" y="330" textAnchor="middle" fill={WALNUT} fontSize="10.5" fontWeight="600">
        {label.toLocaleUpperCase("tr")} AÇILIR
      </text>
    </g>
  );
}

function TitleBlock({
  materialLabel,
  modelLabel,
  example,
}: {
  materialLabel: string;
  modelLabel: string;
  example: boolean;
}) {
  const rows = [
    ["PROJE", "Sezer Usta Mobilya"],
    ["ÇİZİM", "Kapı ön görünüş"],
    ["MALZEME", materialLabel],
    ["MODEL", modelLabel],
    ["ÖLÇEK", example ? "1:20 · ÖRNEK ÖLÇÜ" : "1:20"],
  ];
  return (
    <g>
      <rect x="500" y="560" width="240" height="120" fill={LINEN} stroke={INK} strokeWidth="0.9" />
      {rows.map(([label, value], index) => (
        <g key={label}>
          <text x="510" y={576 + index * 24} fill={SOFT} fontSize="9">
            {label}
          </text>
          <text x="580" y={576 + index * 24} fill={label === "MODEL" ? WALNUT : INK} fontSize="10" fontWeight="500">
            {value}
          </text>
          <path d={`M500 ${584 + index * 24}H740`} stroke={LINE} />
        </g>
      ))}
      <path d="M572 560V680" stroke={LINE} />
    </g>
  );
}

function trim(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
