# Sezer Usta Mobilya — corporate + product-showcase website (project-start prompt for the coding agent)

You are a senior product designer and full-stack engineer. Build a **production-grade corporate and product-showcase website** for **Sezer Usta Mobilya**, a hand-carving (*el oyması*) furniture workshop in **Büyük Sanayi, Gazimağusa, Kuzey Kıbrıs**, which on 12 November 2026 also started **wholesale and retail sales of melamine and PVC doors**. This is a real, signed client of **liveDevelopment** (KIRMIZIYÜZ Live Development Software LTD — a software studio working in Kuzey Kıbrıs and Türkiye).

The site has three jobs: (1) make a small-industrial-estate workshop look like the master craftsman it is, (2) present three very different product worlds — **one-of-a-kind hand-carved pieces**, **configurable melamine/PVC doors**, and **custom work** — in one coherent catalogue, and (3) turn visitors into structured quote requests and WhatsApp conversations.

Engineering must be genuinely difficult — a discriminated-union catalogue validated at build time, a door configurator with a constraint engine and a live dimensioned SVG elevation drawing, a persisted, URL-shareable quote list that compiles into a structured WhatsApp message and a validated server-side request, a deep-zoom carving-detail viewer, and an image pipeline that fails the build on broken references — while staying fast, accessible, and warm to look at.

This is the **first build**. The client's real photos and full product list have not arrived yet. Everything you cannot verify is a labelled placeholder. Architect for hand-off: typed domain, swappable content source (JSON today, headless CMS later), no throwaway shortcuts.

---

## 0. Repository and stack

The repository already exists (`DevLiveNC/sezerustamobilya`, default branch `main`, work on one feature branch); it contains `docs/` (project skill, prompt, design files) — read `docs/` first and keep it. Read existing code before writing anything; keep what works and explain structural changes.

Approved PNG mockups and `tokens.json` from the design team live in the repo under `docs/design/` (added in the first commit). **Read them first** before implementing layout or typography. Tokens in `docs/design/tokens.json` take precedence; the §2 palette and typography are the fallback when a token is missing. Any deviation from the approved mockups or tokens must be explained in the PR.

Bootstrap checklist:
- `create-next-app` with App Router, TypeScript, ESLint, `src/` dir, import alias `@/*`; pnpm or npm (pick one, commit the lockfile)
- `tsconfig`: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`. Keep `exactOptionalPropertyTypes` **on**; do not silently disable it. If a third-party type forces a workaround, localise it (a narrow wrapper or type) and explain it in the PR. Disabling the flag is allowed only with a written justification in the PR.
- Prettier + ESLint (next/core-web-vitals, typescript), `npm run typecheck|lint|test|test:e2e|build|validate:content`
- `.env.example` with **keys only, empty values** (`SITE_URL=`, `PREVIEW_MODE=`, `QUOTE_EMAIL_TO=`, `RESEND_API_KEY=` — the email provider is **not** connected in this task)
- GitHub Actions CI: typecheck, lint, unit, content validation, build, Playwright (chromium) on PR
- `README.md`, `OWNER-CHECKLIST.md`, `CONTENT-GUIDE.md` (how to add a product + photos)

Stack (use exactly this unless strictly impossible):
- **Next.js 15+ App Router**, React 19 (Server Components by default; client components only where interaction requires), **TypeScript strict**
- **Tailwind CSS 4** with design tokens as CSS variables (`@theme`)
- **GSAP 3** + **ScrollTrigger** (+ **Flip** for gallery filtering), registered once in a client-only module; load GSAP, ScrollTrigger, Flip, and Lenis **only via dynamic import** on the routes/components that animate; `useGSAP` / `gsap.context()` so every animation is cleaned up on unmount and route change
- **Lenis** smooth scroll driven by the GSAP ticker (`gsap.ticker.add((t) => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`); one instance; reset to top on route change; paused while dialogs/drawers/lightbox are open; **fully disabled** under `prefers-reduced-motion: reduce`
- **Zod** (v4) at every boundary (catalogue files, URL state, form input, server action payloads). On the client, use `zod/mini` for URL state and form validation
- Small store (Zustand or reducer + context) for the quote list, persisted to `localStorage` with a **versioned schema + migration**
- **Vitest** for pure engines, **Playwright** for critical flows, `@axe-core/playwright` for a11y smoke tests
- Headless primitives (Radix) allowed for dialog, popover, radio group, slider, tabs. **No UI kit that imposes a template look.** Icons: Lucide at 1.5px stroke only.

### 0.1 Build order

Complete the phases below **in order**. Commit each phase and leave CI green before starting the next:

1. Bootstrap + CI + domain types + content loader/validation
2. Layout, design tokens, home, category and product pages
3. Door constraint engine + SVG elevation + URL state
4. Quote list + `/teklif` + WhatsApp compiler
5. Carving viewer, gallery Flip, before/after
6. SEO, a11y, performance polish, screenshots, Lighthouse

Do not stop early. If context runs short, finish the current phase, push, and list the remaining phases in the PR description.

---

## 0.2 Approved design decisions (Yaşar, 26 Nov 2026, 16:37)

- The PNG mockups in `docs/design/` are **approved**; match them closely (layout, rhythm, technical-drawing details).
- **Wordmark: option B “Tezgâh Yazısı”**: Young Serif single line “Sezer Usta Mobilya” + Hanken Grotesk line “El oyma sanatı ve mobilya ustası”. The mockups' header shows option A; **replace it with B everywhere** (header, footer, OG image, 404). No emblem, monogram or icon. Write uppercase Turkish text directly, not via `text-transform`.
- **Palette: only the original palette** from §2 / `docs/design/tokens.json`. **Do not add derived tones** (no extra tints/shades beyond the listed tokens). If the updated `tokens.json` contains derived tones, ignore them and say so in the PR.

---

- **Design hand-off notes (Tasarım bot, 26 Nov):** `docs/design/tokens.json` v1.1.0 is the source of truth for colour; the PNGs still show old derived tones (brown-orange dimension labels, amber accents), so follow tokens, not PNG colours. Wordmark token is `--font-wordmark` (Young Serif). Cila `#A8662E` only for large type, decoration, dimension lines and focus rings; small accent text uses ceviz; muted text on meşe bands is also ceviz. Ignore off-palette tones in `kaynak/*.py` (`#B9A587`, `#BCA88A`, `#9A8A79`): ornamental borders use `#D3C2A8`, input borders and hint text use ink-soft. Do NOT run `kaynak/hepsini-uret.sh` (overwrites PNGs). Photo placeholders read "FOTOĞRAF ATÖLYEDEN GELECEK"; the 90×210 door value is labelled ÖRNEK.

## 1. Hard rules — never invent information

Non-negotiable.

### 1.1 What we actually know (from public sources, 26 Nov 2026)
Put these in `src/config/business.ts` with a `source` and `confirmedByOwner: false` flag on each field:
- Name: **Sezer Usta Mobilya**
- Tagline (their own Facebook page description): **“El oyma sanatı ve mobilya ustası.”**
- Location: **Büyük Sanayi, Gazimağusa, Kuzey Kıbrıs** (no street address / map pin known)
- Phone / WhatsApp: **+90 533 833 64 81**
- Their own words: “Doğal ahşap · El oyması · Her üründen sadece bir adet vardır” (Jan 2025); “Farklı boyutlarda sandık, ayna çerçevesi ve dolaplar. Tamamıyla el oyması, el emeği.” (Sep 2023); “Toptan ve perakende melamin ve PVC kapı satışlarımız başlamıştır. Uygun fiyat, garantili ürün.” (12 Nov 2026)
- A second line, +90 533 885 36 24, is labelled “Whatsapp English” in one of their posts. **Do not put it on the site** unless the owner confirms (`config` field present but `hidden: true`).

### 1.2 Everything else is a placeholder
Use the exact format `[SAHİP DOLDURACAK: …]`:
- `[SAHİP DOLDURACAK: logo]` → render a neutral typographic wordmark “Sezer Usta Mobilya”; **do not design a fictional logo, monogram, or emblem**
- `[SAHİP DOLDURACAK: açık adres ve harita konumu]`, `[SAHİP DOLDURACAK: çalışma saatleri]`, `[SAHİP DOLDURACAK: e-posta]`
- `[SAHİP DOLDURACAK: ustanın adı ve hikâyesi]`, `[SAHİP DOLDURACAK: kuruluş yılı]`, `[SAHİP DOLDURACAK: ağaç türleri]`
- `[SAHİP DOLDURACAK: kapı modelleri, renk kartelası, standart ölçüler, garanti süresi ve kapsamı]`
- `[SAHİP DOLDURACAK: teslimat / ölçü alma / montaj bölgeleri]`, `[SAHİP DOLDURACAK: ortalama üretim süresi]`
- `[SAHİP DOLDURACAK: ticari unvan]`, `[SAHİP DOLDURACAK: kişisel veriler / gizlilik metni]`
- `[SAHİP DOLDURACAK: Instagram hesabı]`, `[SAHİP DOLDURACAK: gerçek fotoğraflar]`

Rules for placeholders:
- A placeholder **never becomes a working link**: no `mailto:`, Maps, or social links for unknown values. Hide the action and show a muted note: “Bu bilgi işletme tarafından henüz girilmedi.”
- The Google Map on `/iletisim` renders only when `business.geo` is filled; until then show a static, honest block: “Büyük Sanayi, Gazimağusa — konum pini işletmeden bekleniyor.”
- `tel:` and `wa.me` links for **+90 533 833 64 81** are allowed (it is the publicly listed number the owner answers).

### 1.3 Products, measurements, prices
- **No prices anywhere** in this build. The UI says “Fiyat için teklif alın” / “Fiyat bilgisi WhatsApp’tan”. The data model supports an optional `price` field for later.
- Catalogue entries in this build are **sample entries** marked `isSample: true`, named generically and honestly (e.g. “El oyması sandık — örnek kayıt”), with all measurements as `null` → UI shows “Ölçü: işletmeden bekleniyor”. **Never invent wood species, dimensions, finishes, model names, colour names, or warranty terms.**
- Door configurator limits (min/max width/height, available opening directions, colours) live in `content/doors/*.json` as **sample config** with `isSample: true`, and the configurator shows a small persistent note: “Ölçü aralıkları örnektir; kesin ölçüler için teklif alın.”
- A small, always-visible preview ribbon while `PREVIEW_MODE=true`: “Önizleme — fotoğraflar ve ürün bilgileri işletmeden bekleniyor.”

### 1.4 Honesty and taste
- **No fake social proof**: no reviews, star ratings, “500+ mutlu müşteri”, “30 yıllık tecrübe” (unless owner states it), counters, testimonials, press logos, awards. No `Review` / `AggregateRating` schema.
- **No AI-looking artifacts**: no lorem ipsum, no AI-generated photos of furniture, people, workshops or hands; no generic gradient hero; no emoji in UI copy; no “Product name here”.
- **Language**: all UI copy in **Turkish**. Location wording is always **“Kuzey Kıbrıs”** — **never “KKTC”**. Where the studio credit appears (footer): “Site: liveDevelopment” linking to https://livedevelopment.dev.
- **No real integrations** in this task: no email provider, analytics with cookies, or CMS connected. Code paths exist behind env flags and are off by default.

---

## 2. Art direction — “Talaş ve Cila” (Shavings & Varnish)

The feeling: a carver’s bench in Büyük Sanayi at 4 p.m. — low sun across walnut and oak, a curl of shaving on the floor, a pencil-marked plywood template with dimension arrows, a chisel set laid out in order. **Warm, grounded, premium, quiet.** The furniture is the ornament; the UI is the workbench. Not a furniture-store template (no full-bleed stock living room with centred white text, no carousel of sofas).

### Palette (tokens; don’t add more)

| Token | Hex | Use |
|---|---|---|
| `--shaving` | `#F2EADF` | Page background (pale wood shaving) |
| `--oak` | `#E3D2B6` | Section bands, configurator canvas backdrop |
| `--linen` | `#FAF6EF` | Cards, drawers, form surfaces |
| `--ink` | `#211B16` | Primary text (charcoal-brown, never #000) |
| `--ink-soft` | `#6A5D50` | Secondary text, captions |
| `--walnut` | `#4A3426` | Dark sections (footer, atölye hikâyesi band), primary buttons |
| `--varnish` | `#A8662E` | Accent: focus ring, active states, dimension-line highlights (use sparingly) |
| `--olive` | `#5A5C3A` | Secondary accent: “Mevcut” status, success |
| `--line` | `#D3C2A8` | 1px hairlines, technical-drawing lines |
| `--sold` | `#8C7B6B` | “Satıldı” status (muted, not red) |
| `--danger` | `#9E3B2E` | Errors only |

Rules: no gradients; an optional wood-grain line texture (SVG, ≤ 4% opacity) only on `--oak` bands. All text AA contrast on every background (verify `--varnish` on `--shaving` for large text only, otherwise darken). Dark sections use `--walnut` with `--shaving` text.

### Typography
- Display: verify **Instrument Serif** first — large, tight tracking at hero sizes, sentence case. If any of ç ğ ı İ ö ş ü fails the glyph test, fall back to **Young Serif**. If both fail, use a `latin-ext` serif and name it in the PR.
- Text/UI: **Hanken Grotesk**, with `latin` + `latin-ext`.
- Technical labels (dimensions, scale, model codes, step counters): **IBM Plex Mono**, with `latin` + `latin-ext`; small caps feel via letter-spacing, e.g. `E 90 × B 210 cm · 1:10`.
- `next/font`, `display: swap`, subsets `latin` + `latin-ext`. A **glyph-test route** (excluded from the sitemap) is required; add a Playwright visual check that ç ğ ı İ ö ş ü render in every face.

### Layout ideas (avoid the template look)
- **Technical-drawing grammar**: section headers carry a thin dimension line with end ticks and a mono label (`01 — ATÖLYE`), image frames have corner crop marks, the configurator is literally an elevation drawing.
- **Home hero**: left, a large serif line built from their own tagline “El oyma sanatı ve mobilya ustası.”; right, a tall 4:5 image slot (real photo later; until then an honest framed placeholder with crop marks and the mono caption “FOTOĞRAF ATÖLYEDEN GELECEK”). Under it, a ruler-like strip with the four category links spaced like centimetre ticks.
- **Three product worlds, three rhythms**: el oyması = gallery of single objects with lots of air, each like a museum label (name, wood, dimensions, status); kapılar = a precise, gridded spec sheet; özel üretim = a horizontal process timeline (ölçü → çizim → oyma → cila → teslim).
- **Category index** as a list of large serif words; on desktop a small image follows the cursor on hover; on mobile a horizontal snap scroller.
- Hairlines in `--line`, radius 2–6px (wood is cut, not inflated), no heavy shadows; one soft shadow for lifted items (drawer, lightbox).
- Mobile: sticky bottom action bar **WhatsApp · Ara · Teklif** (44px+ targets), hidden on `/teklif` itself.

### Motion language — “planing, not bouncing”
- Default ease `power3.out`, 0.5–0.9s, translate ≤ 24px, stagger 0.04–0.08s.
- Image reveals: horizontal clip-path wipe like a plane stroke (`inset(0 100% 0 0)` → `inset(0)`), one direction only.
- Dimension lines and crop marks **draw in** via `stroke-dashoffset` when their section enters.
- Headlines: masked line reveal (split into lines; respect Turkish hyphenation — do not split words).
- Gentle parallax ≤ 6% on large editorial images only.
- Gallery filter (Referanslar, El oyması) uses **GSAP Flip** for re-layout.
- Configurator: when width/height change, the elevation drawing tweens its proportions (0.35s) and dimension labels roll their numbers.
- Page transitions: short `--shaving` fade ≤ 300ms; never block input.
- `prefers-reduced-motion: reduce`: Lenis off, no parallax, no split text, no wipes; opacity-only ≤ 150ms. Covered by a Playwright test with `reducedMotion: 'reduce'`.

---

## 3. Engineering (mandatory)

### 3.1 Typed domain model — `src/lib/domain/*.ts`

```ts
type Slug<T extends string> = string & { readonly __brand: T }
type CategorySlug = Slug<'Category'>
type ProductSlug = Slug<'Product'>

type CategoryKey = 'el-oymasi' | 'melamin-kapi' | 'pvc-kapi' | 'ozel-uretim'

interface Dimensions { widthCm: number | null; heightCm: number | null; depthCm: number | null }

interface ImageRef {
  id: string                 // key into the image manifest
  alt: string                // Turkish, descriptive; required
  role: 'hero' | 'front' | 'angle' | 'detail' | 'scale' | 'process' | 'before' | 'after'
}

interface ProductBase {
  slug: ProductSlug
  category: CategoryKey
  title: string
  summary: string
  images: ImageRef[]         // may be empty → placeholder frames rendered
  isSample: boolean
  confirmedByOwner: boolean
  seo?: { title?: string; description?: string }
  publishedAt: string        // ISO date
}

// One-of-a-kind hand-carved piece
interface CarvedPiece extends ProductBase {
  kind: 'carved-piece'
  pieceType: 'sandik' | 'ayna-cercevesi' | 'dolap' | 'diger'
  wood: string | null        // null → “işletmeden bekleniyor”
  finish: string | null
  dimensions: Dimensions
  availability: 'mevcut' | 'satildi' | 'rezerve'
  carvingDetailImageId?: string   // enables the deep-zoom viewer
  price?: Money                   // not rendered in this build
}

// Configurable door (melamine or PVC)
interface DoorModel extends ProductBase {
  kind: 'door-model'
  material: 'melamin' | 'pvc'
  modelCode: string | null
  colours: DoorColour[]           // swatches; sample until owner sends the kartela
  sizeRules: DoorSizeRules
  openings: DoorOpening[]         // allowed opening directions
  frameOptions: FrameOption[]     // kasa / pervaz
  sale: { retail: boolean; wholesale: boolean; wholesaleMinQty: number | null }
  warranty: string | null         // owner’s own wording only
}

interface DoorSizeRules {
  widthCm: { min: number; max: number; step: number; standard: number[] }
  heightCm: { min: number; max: number; step: number; standard: number[] }
  wallThicknessCm?: { min: number; max: number }   // only if frame option requires it
  isSample: boolean
}
type DoorOpening = 'sol-ice' | 'sag-ice' | 'sol-disa' | 'sag-disa'

// Custom work showcase (process + references)
interface CustomWork extends ProductBase {
  kind: 'custom-work'
  workType: string
  steps: { title: string; body: string }[]
  referenceIds: string[]          // links into Referanslar
}

type Product = CarvedPiece | DoorModel | CustomWork

interface Reference {             // Referanslar / galeri
  id: string; title: string; location: string | null; year: number | null
  images: ImageRef[]; productSlugs: ProductSlug[]
  beforeAfter?: { before: ImageRef; after: ImageRef }
  clientConsent: boolean          // must be true to render
}

type QuoteLine =
  | { type: 'carved-piece'; slug: ProductSlug }
  | { type: 'door'; slug: ProductSlug; config: DoorConfig; qty: number }
  | { type: 'custom'; description: string; dimensions: Dimensions; photoCount: number }

interface DoorConfig { widthCm: number; heightCm: number; opening: DoorOpening; colourId: string; frameId: string }
```

Use exhaustive `switch` on `kind` / `type` with a `never` check everywhere.

### 3.2 Content pipeline — `content/` + `src/lib/content/*`
- Files: `content/products/*.json`, `content/doors/*.json`, `content/references/*.json`, `content/faq.json`, `content/images/manifest.json`.
- A **loader** reads, parses with Zod (discriminated union on `kind`), and throws a readable, path-annotated error on any invalid file. `npm run validate:content` runs it in CI.
- **Referential integrity checks** at build: every `ImageRef.id` exists in the manifest; every `referenceIds` / `productSlugs` resolves; slugs unique; door `standard` sizes lie within `min..max` and on `step`; a reference without `clientConsent: true` is excluded with a warning.
- Image manifest entries: `{ id, src, width, height, blurDataURL, focalPoint?: {x,y}, credit: 'sahip' | 'liveDevelopment-cekim', isPlaceholder }`. A script `scripts/ingest-images.ts` takes owner photos from `incoming/`, strips EXIF GPS, generates AVIF/WebP + blur, writes the manifest. Placeholders are rendered as **honest SVG frames** (crop marks + mono caption), never as stock or generated imagery.
- `generateStaticParams` for all product/category/door routes; ISR-ready (`revalidate`) so a CMS can replace the loader later behind a `ContentSource` interface (`getProducts`, `getProduct`, `getReferences`, …). Ship a `JsonContentSource`; document how to add `CmsContentSource`.

### 3.3 Door configurator — `src/lib/doors/*` (pure, tested) + `/kapi-yapilandir/[model]`
- **Constraint engine** `validateDoorConfig(model, partialConfig) → { valid, errors[], warnings[], normalized }`:
  - width/height within `sizeRules`, snapped to `step` (show “89 cm → 90 cm olarak yuvarlandı” as a warning, not silently);
  - opening must be in `model.openings`; colour and frame must exist; frame options may restrict size ranges (e.g. a frame that requires `wallThicknessCm`);
  - non-standard size → warning “Standart dışı ölçü — üretim süresi ve fiyat için teklif alın.”;
  - errors are **actionable Turkish sentences** (“Genişlik en fazla 100 cm olabilir. 4 cm azaltın veya özel üretim için teklif isteyin.”).
- **Live SVG elevation drawing** `components/doors/DoorElevation`: proportional to the configured size, shows the leaf, frame, handle side and swing arc for the chosen opening (plan-view arc inset), dimension lines with mono labels, and a `1:20` scale tag. Deterministic, no raster images, `role="img"` with a full Turkish `aria-label` summary (“90 × 210 cm, sağdan içe açılır, renk: …”). Export as PNG via `canvas` for attaching to the quote.
- **URL state**: the configuration lives in the query string (`?g=90&y=210&a=sag-ice&r=ceviz&k=standart&v=1`), parsed with Zod (`zod/mini` on the client), versioned, tampered input falls back safely with a notice; back/forward works; a “Bağlantıyı kopyala” button shares the exact configuration.
- Quantity stepper (wholesale aware: if `wholesaleMinQty` is set and qty ≥ it, show “Toptan talep olarak işaretlenecek”).
- Unit tests: boundaries, step snapping, every opening × frame combination, tampered URLs, version migration.

### 3.4 Quote list (“Teklif listesi”) + request flow
- A persistent quote list (drawer from the header icon, count badge with a number roll) holds `QuoteLine`s: carved pieces (one each — they are unique; adding twice is a no-op with a notice), configured doors (stable line key = hash of model + normalized config; adding the same config merges qty), and custom requests.
- Persisted in `localStorage` with schema `v1` + migration path; lines whose product disappeared or became `satildi` are flagged on rehydrate (“Bu ürün artık satıldı olarak görünüyor.”) — never silently dropped. Generate a small `availability` JSON (a route handler or a static file built from the catalogue, ISR-revalidated) that the client quote store fetches to perform this flagging.
- **`/teklif` form** (Server Action): name, phone (Kuzey Kıbrıs / Türkiye formats, normalized to E.164), optional email, city/region, preferred contact (WhatsApp / arama), message, toptan checkbox, up to 5 photos (resized and previewed **client-side only**, ≤ 2000px, with type/size checks; they are **never sent to the server** in this build — the server action receives only photo count and metadata, because Server Actions default to a ~1 MB body limit and Vercel function payloads are limited to 4.5 MB), consent checkbox for “kişisel verilerin işlenmesi” (links to `/kisisel-veriler`). Zod on the client (`zod/mini`) and on the server; honeypot field; simple IP+time-window rate limit (in-memory adapter behind an interface — the README must note that this is per-instance on Vercel and that production needs a shared store, e.g. Vercel KV / Upstash); server returns a typed result.
- **WhatsApp compiler** `lib/quote/toWhatsApp.ts` (pure, tested): turns the quote list + form into a clean, numbered Turkish message (door lines with `E×B`, opening, colour, frame, qty; carved pieces with title + page URL; custom request summary). The full encoded `wa.me` URL must be **≤ 2000 characters**; above that, summarise and append “Detaylar web formunda”. Unit-test the boundary (at 2000 and just over). Opens `https://wa.me/905338336481?text=…`.
- In this build the server action **does not send email**: it validates, logs a redacted summary in dev, and returns `{ ok: true, channel: 'whatsapp' }`; the UI then offers the compiled WhatsApp message. The email adapter exists behind `QUOTE_EMAIL_TO` / provider env and is off.

### 3.5 Carving detail viewer
- On carved pieces with `carvingDetailImageId`, a **deep-zoom lightbox**: pinch/scroll zoom (1×–4×), drag pan with inertia (GSAP), double-tap to zoom at point, keyboard (+/−, arrows, 0 to reset, Esc to close), focus trap, `aria-live` zoom level; desktop hover **loupe** on the detail image. Loads a higher-resolution source only on open. Lenis paused while open.

### 3.6 Gallery / Referanslar
- Masonry-like aligned grid with filter chips (kategori, yıl) synced to URL; GSAP Flip transitions.
- **Before/after slider** (keyboard-operable range input under the hood, `aria-valuetext` “%40 önce”), rendered only when both images are real and `clientConsent` is true.
- Lightbox with prev/next, swipe, and the same keyboard model as §3.5.

### 3.7 Analytics hooks (no tracking yet)
- A typed `track(event)` facade with events `whatsapp_click`, `call_click`, `quote_line_add`, `quote_submit`, `door_config_share`. No-op unless `NEXT_PUBLIC_ANALYTICS=plausible` (cookieless) is set — not set in this task.

---

## 4. Pages and components

| Route | Must contain |
|---|---|
| `/` | Hero (§2), “Üç ürün dünyası” ruler strip, featured carved pieces (mevcut first), doors spec teaser, özel üretim process timeline, atölye band (walnut), referanslar teaser (only if consented references exist, otherwise section omitted), contact CTA with WhatsApp + call |
| `/hakkimizda` | Atölye hikâyesi: their own quotes (§1.1) as pull quotes, process steps, owner-story placeholder, location block. No invented years or biography |
| `/urunler` + `/urunler/[kategori]` | Category intro, filters (availability for el oyması; material/colour for doors), sorting, empty state copy, breadcrumbs |
| `/urun/[slug]` | Gallery with role-ordered images, museum-label spec block (wood, finish, dimensions, availability — nulls shown honestly), carving viewer, “Teklif listesine ekle”, WhatsApp with prefilled product name + URL, related items |
| `/kapi-yapilandir/[model]` | §3.3 |
| `/referanslar` | §3.6 |
| `/teklif` | Quote list review + form §3.4 + success state with WhatsApp hand-off |
| `/iletisim` | Phone/WhatsApp (real), address/map/hours (placeholders until filled), contact form shortcut |
| `/olcu-rehberi` | “Kapı ölçüsü nasıl alınır” — 3–4 steps with SVG diagrams in the technical-drawing style; mark measurements advice as general guidance; owner can edit |
| `/sss` | From `content/faq.json`; sample questions only with `[SAHİP DOLDURACAK: cevap]` answers |
| `/gizlilik` | Placeholder privacy template, clearly marked “TASLAK” (keep as draft) |
| `/kisisel-veriler` | Heading “Kişisel Verilerin Korunması” with a visible “TASLAK” badge; body is the placeholder `[SAHİP DOLDURACAK: kişisel veriler metni — hukuk onayı]`. Kuzey Kıbrıs has its own personal data law; Turkey’s KVKK must not be cited as the governing law |
| `not-found` | Branded 404: a broken dimension line, “Bu ölçü bizde yok.” + links |

Shared components: `Header` (wordmark, nav, mega menu with the 4 categories, quote icon), full-screen mobile menu, `Footer` (walnut; contact, categories, links to `/gizlilik` and `/kisisel-veriler`, “Kuzey Kıbrıs ve Türkiye’ye hizmet” only if owner confirms Türkiye shipping — otherwise omit), `MobileActionBar`, `DimensionRule`, `CropFrame`, `PlaceholderFrame`, `StatusBadge` (mevcut/satıldı/rezerve), `SpecTable`, `WhatsAppButton`, `QuoteDrawer`, `Lightbox`, `BeforeAfter`, `SectionHeader`.

---

## 5. Image slots (all real photos later; honest placeholders now)

| Slot | Ratio | Min size | Brief for the owner |
|---|---|---|---|
| `home-hero-4x5` | 4:5 | 1600×2000 | One finished carved piece in daylight, workshop door or neutral wall behind |
| `atolye-wide-3x2` | 3:2 | 2400×1600 | The workbench with tools laid out |
| `hands-carving-1x1` | 1:1 | 1600×1600 | Hands + chisel on a carving, close (no face required) |
| `product-front` / `product-angle` | 4:5 | 1600×2000 | Each product front and 45° |
| `product-detail` | 1:1 | 3000×3000 | Carving detail, sharp, for the deep-zoom viewer |
| `product-scale` | 3:4 | 1500×2000 | Product next to a known object for scale |
| `door-swatch` | 1:1 | 800×800 | Each melamine/PVC colour sample, flat light |
| `door-installed` | 3:4 | 1500×2000 | An installed door (with client consent) |
| `reference-before` / `-after` | 4:3 | 2000×1500 | Same angle before/after |

No stock photos, no AI-generated imagery, no people unless the owner approves.

---

## 6. SEO and metadata
- `lang="tr"`, `generateMetadata` per route (title pattern `… | Sezer Usta Mobilya — Gazimağusa`), canonical, Open Graph image via `next/og` in the palette with the wordmark.
- While `PREVIEW_MODE=true`: `noindex, nofollow` and a disallowing `robots.txt` (one flag controls ribbon + robots).
- When off: `sitemap.ts` of real routes; JSON-LD `FurnitureStore` (LocalBusiness) with name, telephone, `areaServed`, and address **only from confirmed fields** (`addressLocality: "Gazimağusa"`, `addressRegion: "Kuzey Kıbrıs"`); `Product` (no `offers` until prices exist) and `BreadcrumbList`. Never `Review` / `AggregateRating`.
- Turkish slugs with consistent transliteration (`/urunler/el-oymasi`, `/urunler/melamin-kapi`); a tested `slugify` handling ç ğ ı İ ö ş ü.
- Local keywords used naturally in copy: Gazimağusa, Büyük Sanayi, Kuzey Kıbrıs, el oyması mobilya, melamin kapı, PVC kapı, özel üretim. No keyword stuffing.

---

## 7. Quality bar
- `typecheck`, `lint`, `test` (Vitest), `test:e2e` (Playwright), `validate:content`, `build` all pass in CI.
- **Performance (Lighthouse mobile, preview build):** Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 (except noindex in preview); LCP < 2.5s, CLS < 0.05, INP < 200ms; initial JS on `/` ≤ 170 KB gzip (report the measured bundle size of `/` in the PR); on the client use `zod/mini` (Zod v4) for URL state and form validation; GSAP, ScrollTrigger, Flip, and Lenis must be loaded via dynamic import only on the routes/components that animate; Lenis lazy-initialised after first interaction or idle.
- **Accessibility (WCAG 2.2 AA):** full keyboard paths for menu, configurator, drawer, lightbox, before/after; visible `--varnish` focus ring; labels and errors tied with `aria-describedby`; `aria-live` for quote count and validation; 44px targets; axe smoke tests on `/`, `/urun/[slug]`, `/kapi-yapilandir/[model]`, `/teklif` with zero serious violations.
- No secrets in the repo or client bundle; no console errors or hydration warnings.
- Required Playwright flows: (1) home → el oyması → product → add to quote → `/teklif` → submit → WhatsApp link contains the product; (2) door configurator: set size out of range → see error → fix → share URL → reload restores state → add twice merges qty; (3) reduced-motion run; (4) mobile 390px: bottom bar, full-screen menu, lightbox wheel + keyboard zoom. Pinch-zoom belongs on a manual QA checklist in the PR (Playwright has no reliable multi-touch API).

### Acceptance checklist
- [ ] Existing code reviewed first (or clean bootstrap per §0) with CI; build order in §0.1 followed (each phase committed and CI-green)
- [ ] Palette, type, technical-drawing layout and motion as specified; `docs/design/tokens.json` takes precedence; no template look
- [ ] Only verified facts (§1.1); everything else `[SAHİP DOLDURACAK: …]`; no fake links, reviews, stats, prices
- [ ] Catalogue = discriminated union, Zod-validated, referential integrity enforced at build
- [ ] Door constraint engine + live dimensioned SVG + URL state + PNG export, fully tested
- [ ] Quote list: unique carved pieces, merged door lines, versioned persistence, sold-item flagging via the `availability` JSON
- [ ] `/teklif` server action with Zod / `zod/mini` on the client, honeypot, rate limit; photos never sent to the server; WhatsApp compiler unit-tested at the `wa.me` ≤ 2000 character boundary
- [ ] Carving deep-zoom viewer and gallery Flip filters, keyboard-complete
- [ ] Preview ribbon + noindex controlled by one flag; JSON-LD only from confirmed data
- [ ] “Kuzey Kıbrıs” everywhere, never “KKTC”; Turkish glyphs verified in all fonts (glyph-test route)
- [ ] `/kisisel-veriler` (TASLAK) shipped; form consent wording is “kişisel verilerin işlenmesi”; `/gizlilik` kept as draft
- [ ] Lighthouse and a11y targets met; `/` bundle size and Lighthouse numbers reported

---

## 8. What to deliver
1. **One pull request** (single branch, single PR — no per-screen PRs) with the complete app on sample content.
2. `src/lib/domain`, `src/lib/content`, `src/lib/doors`, `src/lib/quote` as typed, tested modules; `content/*` sample entries clearly `isSample: true`.
3. `README.md` (architecture, ContentSource swap, adding products/doors/photos, env flags, commands, and the rate-limit adapter caveat), `CONTENT-GUIDE.md` (Turkish, for the team), `OWNER-CHECKLIST.md` (every `[SAHİP DOLDURACAK]` field + photo list from §5 + door data needed).
4. In the PR description: Vercel preview URL (if a preview was approved), **PNG screenshots** (home 1440 + 390, product detail, door configurator 1440 + 390, `/teklif`, 404), Lighthouse table (include the measured JS bundle size of `/`), test summary, remaining build-order phases if any, and open questions for the owner.
5. Connect to Vercel for **preview deployments only** (no production) — and only after explicit approval. If the preview is protected (Vercel Authentication) and Lighthouse or Playwright cannot reach it, run Lighthouse against a local `next build && next start` and state that clearly in the PR’s Lighthouse table.
6. Do **not** merge, deploy to production, buy/connect a domain, or connect email/analytics/CMS. Merge happens only after Yaşar’s approval via LiveDev Şef.

Build it as if the usta will open it on his phone at the workbench tomorrow and say “bu benim atölyem” — warm, exact, and honest about every photo still to come.
