export interface PhotoSlot {
  id: string;
  ratio: string;
  min: string;
  brief: string;
}

export const photoSlots = {
  "home-hero-4x5": {
    id: "home-hero-4x5",
    ratio: "4:5",
    min: "1600×2000",
    brief: "Bitmiş bir oyma parça, gün ışığında, atölye kapısı ya da sade duvar önünde",
  },
  "atolye-wide-3x2": {
    id: "atolye-wide-3x2",
    ratio: "3:2",
    min: "2400×1600",
    brief: "Tezgâh, aletler dizili, yatay kadraj",
  },
  "hands-carving-1x1": {
    id: "hands-carving-1x1",
    ratio: "1:1",
    min: "1600×1600",
    brief: "Eller ve oyma bıçağı, işin üstünde, yakından — yüz gerekmez",
  },
  "product-front": {
    id: "product-front",
    ratio: "4:5",
    min: "1600×2000",
    brief: "Ürün önden, gün ışığı, sade zemin",
  },
  "product-angle": {
    id: "product-angle",
    ratio: "4:5",
    min: "1600×2000",
    brief: "Ürün 45 derece, ön ve yan yüz birlikte",
  },
  "product-detail": {
    id: "product-detail",
    ratio: "1:1",
    min: "3000×3000",
    brief: "Oyma detayı, keskin, yakınlaştırma için",
  },
  "product-scale": {
    id: "product-scale",
    ratio: "3:4",
    min: "1500×2000",
    brief: "Ürünün yanında metre ya da el, ölçek için",
  },
  "door-swatch": {
    id: "door-swatch",
    ratio: "1:1",
    min: "800×800",
    brief: "Renk örneği, düz ışık, gölgesiz",
  },
  "door-installed": {
    id: "door-installed",
    ratio: "3:4",
    min: "1500×2000",
    brief: "Takılmış kapı, müşteri izniyle",
  },
  "reference-before": {
    id: "reference-before",
    ratio: "4:3",
    min: "2000×1500",
    brief: "Aynı açı, önce",
  },
  "reference-after": {
    id: "reference-after",
    ratio: "4:3",
    min: "2000×1500",
    brief: "Aynı açı, sonra",
  },
} as const satisfies Record<string, PhotoSlot>;

export type PhotoSlotId = keyof typeof photoSlots;

export function slotForRole(role: string): PhotoSlot {
  if (role === "front" || role === "hero") return photoSlots["product-front"];
  if (role === "angle") return photoSlots["product-angle"];
  if (role === "detail") return photoSlots["product-detail"];
  if (role === "scale") return photoSlots["product-scale"];
  if (role === "before") return photoSlots["reference-before"];
  if (role === "after") return photoSlots["reference-after"];
  return photoSlots["product-front"];
}
