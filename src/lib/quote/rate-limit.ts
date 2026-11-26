export interface RateLimitResult {
  ok: boolean;
  retryAfterSec: number;
}

export interface RateLimiter {
  take(key: string, now?: number): RateLimitResult;
}

export function createMemoryRateLimiter(limit: number, windowMs: number): RateLimiter {
  const hits = new Map<string, number[]>();
  return {
    take(key, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
      if (recent.length >= limit) {
        const oldest = recent[0] ?? now;
        hits.set(key, recent);
        return { ok: false, retryAfterSec: Math.ceil((windowMs - (now - oldest)) / 1000) };
      }
      recent.push(now);
      hits.set(key, recent);
      return { ok: true, retryAfterSec: 0 };
    },
  };
}

/** Per server instance. A production deploy needs a shared store such as Vercel KV or Upstash. */
export const quoteRateLimit = createMemoryRateLimiter(5, 10 * 60 * 1000);
