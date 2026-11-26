/** Accepts Türkiye and Kuzey Kıbrıs mobiles written with spaces, 0, or +90. */

export function toE164(input: string): string | null {
  const compact = input.replace(/[\s().-]/g, "");
  const digits = compact.startsWith("+") ? compact.slice(1) : compact;
  if (!/^\d+$/.test(digits)) return null;
  let national = digits;
  if (national.startsWith("90") && national.length === 12) national = national.slice(2);
  else if (national.startsWith("0") && national.length === 11) national = national.slice(1);
  if (national.length !== 10 || !national.startsWith("5")) return null;
  return `+90${national}`;
}
