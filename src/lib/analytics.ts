export type AnalyticsEvent =
  | "whatsapp_click"
  | "call_click"
  | "quote_line_add"
  | "quote_submit"
  | "door_config_share";

export function track(event: AnalyticsEvent, props?: Record<string, string | number>): void {
  if (typeof window === "undefined") return;
  if (process.env.NEXT_PUBLIC_ANALYTICS !== "plausible") return;
  const plausible = (window as unknown as { plausible?: (name: string, options?: { props?: Record<string, string | number> }) => void }).plausible;
  plausible?.(event, props ? { props } : undefined);
}
