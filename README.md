# Sezer Usta Mobilya

Corporate and product-showcase site for the hand-carving workshop in Büyük Sanayi, Gazimağusa, Kuzey Kıbrıs. Sample catalogue only — unknown facts stay as `[SAHİP DOLDURACAK: …]`.

## Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run test
npm run validate:content
npm run build
npm run start
npm run test:e2e
```

`scripts/ingest-images.ts` reads `incoming/`, re-encodes to AVIF/WebP and drops EXIF (including GPS). It does not run in CI.

## Content

JSON under `content/` is validated with Zod at build time (`src/lib/content`). `JsonContentSource` is the current source. A later `CmsContentSource` should implement the same `ContentSource` interface (`getProducts`, `getProduct`, `getReferences`, `getFaq`, `getImages`).

Next.js 16 Cache Components replace the route-level `revalidate` export. Catalogue reads use `use cache` and `cacheLife("hours")`.

## Environment

See `.env.example`. Keys only, empty values. `PREVIEW_MODE=false` turns the preview ribbon and `noindex` off. Any other value, including empty, keeps preview on.

Email is not connected. `QUOTE_EMAIL_TO` and `RESEND_API_KEY` are reserved.

The in-memory rate limit used by the quote action is per server instance. On Vercel that is not a shared store; production needs Vercel KV or Upstash behind the same interface.
