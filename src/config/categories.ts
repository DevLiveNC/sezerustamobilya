import type { CategoryKey } from "@/lib/domain/brand";

export interface CategoryCopy {
  key: CategoryKey;
  index: string;
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
}

export const categories: readonly CategoryCopy[] = [
  {
    key: "el-oymasi",
    index: "01",
    eyebrow: "01 · TEK PARÇA",
    title: "El oyması",
    summary: "Sandık, ayna çerçevesi, dolap — her biri bir tane.",
    href: "/urunler/el-oymasi",
  },
  {
    key: "melamin-kapi",
    index: "02",
    eyebrow: "02 · TOPTAN + PERAKENDE",
    title: "Melamin kapı",
    summary: "Ölçü, açılım, renk — yapılandırıp teklif isteyin.",
    href: "/urunler/melamin-kapi",
  },
  {
    key: "pvc-kapi",
    index: "03",
    eyebrow: "03 · TOPTAN + PERAKENDE",
    title: "PVC kapı",
    summary: "Aynı yapılandırıcı, PVC modeller için.",
    href: "/urunler/pvc-kapi",
  },
  {
    key: "ozel-uretim",
    index: "04",
    eyebrow: "04 · ÖLÇÜYE GÖRE",
    title: "Özel üretim",
    summary: "Fikrinizi ve ölçünüzü getirin, atölyede çizelim.",
    href: "/urunler/ozel-uretim",
  },
];

export function categoryByKey(key: string): CategoryCopy | undefined {
  return categories.find((category) => category.key === key);
}
