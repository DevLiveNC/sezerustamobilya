import type { DoorConfig, DoorModel, DoorOpening, FrameOption, SizeAxis } from "@/lib/domain";

export interface DoorIssue {
  field: "widthCm" | "heightCm" | "opening" | "colourId" | "frameId" | "wallThicknessCm" | "config";
  message: string;
}

export interface DoorDraft {
  widthCm?: number;
  heightCm?: number;
  opening?: string;
  colourId?: string;
  frameId?: string;
  wallThicknessCm?: number;
}

export interface DoorValidation {
  valid: boolean;
  errors: DoorIssue[];
  warnings: DoorIssue[];
  normalized: DoorConfig | null;
}

const OPENING_LABEL: Record<DoorOpening, string> = {
  "sol-ice": "soldan içe",
  "sag-ice": "sağdan içe",
  "sol-disa": "soldan dışa",
  "sag-disa": "sağdan dışa",
};

export function openingLabel(opening: DoorOpening): string {
  return OPENING_LABEL[opening];
}

export function defaultDoorDraft(model: DoorModel): DoorDraft {
  const width = preferred(model.sizeRules.widthCm, 90);
  const height = preferred(model.sizeRules.heightCm, 210);
  const opening = model.openings.includes("sag-ice") ? "sag-ice" : model.openings[0];
  const frame = model.frameOptions[0];
  return {
    widthCm: width,
    heightCm: height,
    ...(opening ? { opening } : {}),
    colourId: "",
    ...(frame ? { frameId: frame.id } : {}),
  };
}

function preferred(axis: SizeAxis, example: number): number {
  if (axis.standard.includes(example)) return example;
  return axis.standard[0] ?? axis.min;
}

function effectiveAxis(axis: SizeAxis, override?: { min: number; max: number }): SizeAxis {
  if (!override) return axis;
  const min = Math.max(axis.min, override.min);
  const max = Math.min(axis.max, override.max);
  return {
    ...axis,
    min,
    max,
    standard: axis.standard.filter((value) => value >= min && value <= max),
  };
}

function snapToStep(value: number, axis: SizeAxis): { value: number; snapped: boolean } {
  const steps = Math.round((value - axis.min) / axis.step);
  const snapped = roundCm(axis.min + steps * axis.step);
  const clamped = Math.min(axis.max, Math.max(axis.min, snapped));
  return { value: clamped, snapped: Math.abs(clamped - value) > 0.001 };
}

function roundCm(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function rangeError(label: string, value: number, axis: SizeAxis): string {
  if (value < axis.min) {
    const gap = roundCm(axis.min - value);
    return `${label} en az ${axis.min} cm olabilir. ${gap} cm artırın veya özel üretim için teklif isteyin.`;
  }
  const gap = roundCm(value - axis.max);
  return `${label} en fazla ${axis.max} cm olabilir. ${gap} cm azaltın veya özel üretim için teklif isteyin.`;
}

export function validateDoorConfig(model: DoorModel, draft: DoorDraft): DoorValidation {
  const errors: DoorIssue[] = [];
  const warnings: DoorIssue[] = [];

  if (model.sizeRules.isSample) {
    warnings.push({
      field: "config",
      message: "Ölçü aralıkları örnektir. Kesin değerler işletmeden gelecek.",
    });
  }

  const frame = model.frameOptions.find((option) => option.id === draft.frameId);
  if (!draft.frameId) {
    errors.push({ field: "frameId", message: "Bir kasa seçin." });
  } else if (!frame) {
    errors.push({ field: "frameId", message: "Seçilen kasa bu modelde yok." });
  }

  const widthAxis = effectiveAxis(model.sizeRules.widthCm, frame?.widthCm);
  const heightAxis = effectiveAxis(model.sizeRules.heightCm, frame?.heightCm);
  if (widthAxis.min > widthAxis.max || heightAxis.min > heightAxis.max) {
    errors.push({
      field: "frameId",
      message: "Bu kasa, modelin ölçü aralığıyla kesişmiyor. Başka bir kasa seçin.",
    });
  }

  let width = draft.widthCm;
  let height = draft.heightCm;
  if (width === undefined || Number.isNaN(width)) {
    errors.push({ field: "widthCm", message: "Genişliği cm olarak yazın." });
  } else if (width < widthAxis.min || width > widthAxis.max) {
    errors.push({ field: "widthCm", message: rangeError("Genişlik", width, widthAxis) });
  } else {
    const snapped = snapToStep(width, widthAxis);
    if (snapped.snapped) {
      warnings.push({
        field: "widthCm",
        message: `${width} cm → ${snapped.value} cm olarak yuvarlandı.`,
      });
    }
    width = snapped.value;
    if (!widthAxis.standard.includes(width)) {
      warnings.push({
        field: "widthCm",
        message: "Standart dışı genişlik — üretim süresi ve fiyat için teklif alın.",
      });
    }
  }

  if (height === undefined || Number.isNaN(height)) {
    errors.push({ field: "heightCm", message: "Yüksekliği cm olarak yazın." });
  } else if (height < heightAxis.min || height > heightAxis.max) {
    errors.push({ field: "heightCm", message: rangeError("Yükseklik", height, heightAxis) });
  } else {
    const snapped = snapToStep(height, heightAxis);
    if (snapped.snapped) {
      warnings.push({
        field: "heightCm",
        message: `${height} cm → ${snapped.value} cm olarak yuvarlandı.`,
      });
    }
    height = snapped.value;
    if (!heightAxis.standard.includes(height)) {
      warnings.push({
        field: "heightCm",
        message: "Standart dışı yükseklik — üretim süresi ve fiyat için teklif alın.",
      });
    }
  }

  const opening = model.openings.find((value) => value === draft.opening);
  if (!opening) {
    const choices = model.openings.map((value) => OPENING_LABEL[value]).join(", ");
    errors.push({
      field: "opening",
      message: `Bu açılım yönü bu modelde yok. ${choices} arasından seçin.`,
    });
  }

  if (!draft.colourId) {
    errors.push({
      field: "colourId",
      message: "Bir renk seçin. Kartela işletmeden gelene kadar örnek yuvası kullanılabilir.",
    });
  } else if (!model.colours.some((colour) => colour.id === draft.colourId)) {
    errors.push({ field: "colourId", message: "Seçilen renk bu modelde yok." });
  }

  let wall = draft.wallThicknessCm;
  if (frame?.requiresWallThickness) {
    const axis = model.sizeRules.wallThicknessCm;
    if (!axis) {
      errors.push({
        field: "wallThicknessCm",
        message: "Bu kasa duvar kalınlığı ister, modelde aralık tanımlı değil.",
      });
    } else if (wall === undefined || Number.isNaN(wall)) {
      errors.push({
        field: "wallThicknessCm",
        message: "Bu kasa duvar kalınlığı ister. Kalınlığı cm olarak yazın.",
      });
    } else if (wall < axis.min || wall > axis.max) {
      errors.push({
        field: "wallThicknessCm",
        message: rangeError("Duvar kalınlığı", wall, { ...axis, step: 1, standard: [] }),
      });
    } else {
      const snapped = Math.round(wall);
      if (Math.abs(snapped - wall) > 0.001) {
        warnings.push({
          field: "wallThicknessCm",
          message: `${wall} cm → ${snapped} cm olarak yuvarlandı.`,
        });
      }
      wall = snapped;
    }
  } else {
    wall = undefined;
  }

  const valid = errors.length === 0 && opening !== undefined && width !== undefined && height !== undefined && frame !== undefined && Boolean(draft.colourId);
  if (!valid || !opening || width === undefined || height === undefined || !frame || !draft.colourId) {
    return { valid: false, errors, warnings, normalized: null };
  }
  const normalized: DoorConfig = {
    widthCm: width,
    heightCm: height,
    opening,
    colourId: draft.colourId,
    frameId: frame.id,
    ...(wall !== undefined ? { wallThicknessCm: wall } : {}),
  };
  return { valid: true, errors, warnings, normalized };
}

export function frameById(model: DoorModel, id: string | undefined): FrameOption | undefined {
  return model.frameOptions.find((option) => option.id === id);
}
