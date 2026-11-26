const turkish: Record<string, string> = {
  ç: "c",
  ğ: "g",
  ı: "i",
  ö: "o",
  ş: "s",
  ü: "u",
  â: "a",
  î: "i",
  û: "u",
};

/**
 * Turkish-aware slug. Uses the tr locale so İ/I lower-case correctly,
 * then maps ç ğ ı ö ş ü. Returns only a-z, 0-9 and single hyphens.
 */
export function slugify(input: string): string {
  const lower = input.trim().toLocaleLowerCase("tr");
  let mapped = "";
  for (const char of lower) {
    mapped += turkish[char] ?? char;
  }
  return mapped
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}
