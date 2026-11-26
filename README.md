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

The four OFL families (Instrument Serif, Young Serif, Hanken Grotesk, IBM Plex Mono) are subset for Turkish and loaded with `next/font/local` from `src/fonts/`. The licence is `src/fonts/OFL.txt`.

## Content

JSON under `content/` is validated with Zod at build time (`src/lib/content`). `JsonContentSource` is the current source. A later `CmsContentSource` should implement the same `ContentSource` interface (`getProducts`, `getProduct`, `getReferences`, `getFaq`, `getImages`).

Next.js 16 Cache Components replace the route-level `revalidate` export. Catalogue reads use `use cache` and `cacheLife("hours")`.

## Environment

See `.env.example`. Keys only, empty values. `PREVIEW_MODE=false` turns the preview ribbon and `noindex` off. Any other value, including empty, keeps preview on.

Email is not connected. `QUOTE_EMAIL_TO` and `RESEND_API_KEY` are reserved.

The in-memory rate limit used by the quote action is per server instance. On Vercel that is not a shared store; production needs Vercel KV or Upstash behind the same interface.

## Illustrative images

`public/images/site/` holds the eleven atmosphere pictures (hero, category cards, guide cards). `content/images/site.json` marks each `kind: "illustrative"`. They are not photographs of listed pieces. Product cards and product pages keep the “FOTOĞRAF ATÖLYEDEN GELECEK” placeholder.
