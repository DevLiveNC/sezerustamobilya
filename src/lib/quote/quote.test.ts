import { describe, expect, it } from "vitest";
import type { ProductSlug } from "@/lib/domain";
import { addCarved, addDoor, applyAvailability, doorLineKey, migrateQuote } from "@/lib/quote/model";
import { toE164 } from "@/lib/quote/phone";
import { compileWhatsApp, WHATSAPP_URL_LIMIT } from "@/lib/quote/toWhatsApp";
import { createMemoryRateLimiter } from "@/lib/quote/rate-limit";
import { emptyQuote } from "@/lib/quote/model";

const slug = "el-oymasi-sandik-ornek" as ProductSlug;

describe("quote list", () => {
  it("does not add the same carved piece twice", () => {
    const first = addCarved(emptyQuote, { slug, title: "Sandık" });
    const second = addCarved(first.snapshot, { slug, title: "Sandık" });
    expect(second.added).toBe(false);
    expect(second.snapshot.lines).toHaveLength(1);
    expect(second.notice).toContain("tektir");
  });

  it("merges quantity for the same door configuration", () => {
    const config = {
      widthCm: 90,
      heightCm: 210,
      opening: "sag-ice" as const,
      colourId: "ornek",
      frameId: "kasa",
    };
    const door = { slug, title: "Melamin kapı", config, qty: 1 };
    const first = addDoor(emptyQuote, door);
    const second = addDoor(first.snapshot, { ...door, qty: 2 });
    expect(second.snapshot.lines).toHaveLength(1);
    expect(second.snapshot.lines[0]).toMatchObject({ qty: 3 });
    expect(doorLineKey(slug, config)).toBe(doorLineKey(slug, { ...config }));
  });

  it("flags a sold line and keeps it", () => {
    const added = addCarved(emptyQuote, { slug, title: "Sandık" }, "satildi");
    expect(added.snapshot.lines).toHaveLength(1);
    expect(added.snapshot.flags[added.snapshot.lines[0]!.key]).toContain("satıldı");
    const refreshed = applyAvailability(added.snapshot, {});
    expect(refreshed.lines).toHaveLength(1);
    expect(refreshed.flags[added.snapshot.lines[0]!.key]).toContain("katalogda yok");
  });

  it("migrates a version 0 list", () => {
    const next = migrateQuote({ version: 0, items: [{ slug, title: "Sandık", qty: 1 }] });
    expect(next.version).toBe(1);
    expect(next.lines[0]).toMatchObject({ type: "carved-piece", title: "Sandık" });
  });
});

describe("phone", () => {
  it("normalises Türkiye and Kuzey Kıbrıs mobiles to E.164", () => {
    expect(toE164("+90 533 833 64 81")).toBe("+905338336481");
    expect(toE164("0533 833 64 81")).toBe("+905338336481");
    expect(toE164("5338336481")).toBe("+905338336481");
    expect(toE164("+1 202 555 0100")).toBeNull();
  });
});

describe("whatsapp compiler", () => {
  const base = {
    lines: [{ type: "carved-piece" as const, key: "c:1", slug, title: "El oyması sandık" }],
    origin: "http://127.0.0.1:3000",
    name: "Ayşe",
    phone: "+905338336481",
    city: "Gazimağusa",
    contact: "whatsapp" as const,
    message: "",
    wholesale: false,
    photoCount: 0,
  };

  it("stays within 2000 characters at the boundary and summarises just over it", () => {
    const empty = compileWhatsApp(base);
    expect(empty.summarized).toBe(false);
    expect(empty.href.startsWith("https://wa.me/905338336481?text=")).toBe(true);
    expect(empty.text).toContain("El oyması sandık");
    const room = WHATSAPP_URL_LIMIT - empty.href.length;
    const exact = compileWhatsApp({ ...base, message: "a".repeat(room + "yok".length) });
    expect(exact.href.length).toBe(WHATSAPP_URL_LIMIT);
    expect(exact.summarized).toBe(false);
    const over = compileWhatsApp({ ...base, message: "a".repeat(room + "yok".length + 1) });
    expect(over.summarized).toBe(true);
    expect(over.href.length).toBeLessThanOrEqual(WHATSAPP_URL_LIMIT);
    expect(over.text).toContain("Detaylar web formunda");
  });
});

describe("rate limit", () => {
  it("blocks the sixth call inside the window", () => {
    const limiter = createMemoryRateLimiter(5, 60_000);
    for (let i = 0; i < 5; i += 1) expect(limiter.take("1.1.1.1", 1_000).ok).toBe(true);
    const blocked = limiter.take("1.1.1.1", 1_000);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
    expect(limiter.take("1.1.1.1", 61_000).ok).toBe(true);
  });
});
