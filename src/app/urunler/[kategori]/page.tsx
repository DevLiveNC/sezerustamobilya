import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories, categoryByKey } from "@/config/categories";
import type { CategoryKey } from "@/lib/domain/brand";
import { isCategoryKey } from "@/lib/domain/brand";
import { jsonContentSource } from "@/lib/content/source";
import { dimensionText, statusView } from "@/lib/catalog-view";
import { photoSlots } from "@/config/slots";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { OwnerTodo, PlaceholderFrame, StatusBadge } from "@/components/ui/Marks";
import type { Product } from "@/lib/domain/product";

type Params = { kategori: string };
type Search = Record<string, string | string[] | undefined>;

export function generateStaticParams(): Params[] {
  return categories.map((category) => ({ kategori: category.key }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { kategori } = await params;
  const category = categoryByKey(kategori);
  if (!category) return { title: "Ürünler" };
  return {
    title: category.title,
    description: `${category.summary} Sezer Usta Mobilya, Gazimağusa, Kuzey Kıbrıs.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { kategori } = await params;
  if (!isCategoryKey(kategori)) notFound();
  const category = categoryByKey(kategori);
  if (!category) notFound();
  return (
    <main className="wrap py-10 md:py-16">
      <Breadcrumbs
        items={[
          { href: "/", label: "ANA SAYFA" },
          { href: "/urunler", label: "ÜRÜNLER" },
          { label: category.title.toLocaleUpperCase("tr") },
        ]}
      />
      <p className="mt-8 font-mono text-[12px] tracking-[0.12em] text-ink-soft">{category.eyebrow}</p>
      <h1 className="mt-3 font-display text-[48px] leading-none tracking-[-0.02em] md:text-[72px]">{category.title}</h1>
      <p className="mt-4 max-w-xl text-ink-soft">{category.summary}</p>
      <Suspense fallback={<p className="mt-10 text-ink-soft">Liste hazırlanıyor.</p>}>
        <Listing category={category.key} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Listing({ category, searchParams }: { category: CategoryKey; searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const durum = first(sp.durum);
  const sirala = first(sp.sirala) === "ad" ? "ad" : "yeni";
  const products = await jsonContentSource.getProductsByCategory(category);
  const filtered = products.filter((product) => matches(product, durum));
  const sorted = [...filtered].sort((a, b) =>
    sirala === "ad" ? a.title.localeCompare(b.title, "tr") : b.publishedAt.localeCompare(a.publishedAt),
  );
  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2 text-sm">
        {category === "el-oymasi" ? (
          <>
            <FilterLink href={href(category, sirala)} current={!durum}>Tümü</FilterLink>
            <FilterLink href={href(category, sirala, "bekleniyor")} current={durum === "bekleniyor"}>Durum bekleniyor</FilterLink>
            <FilterLink href={href(category, sirala, "mevcut")} current={durum === "mevcut"}>Mevcut</FilterLink>
            <FilterLink href={href(category, sirala, "rezerve")} current={durum === "rezerve"}>Rezerve</FilterLink>
            <FilterLink href={href(category, sirala, "satildi")} current={durum === "satildi"}>Satıldı</FilterLink>
          </>
        ) : (
          <span className="font-mono text-[11px] tracking-[0.08em] text-ink-soft">
            Renk kartelası işletmeden bekleniyor. Örnek kayıtlar listelenir.
          </span>
        )}
        <span className="mx-2 text-line" aria-hidden="true">|</span>
        <FilterLink href={href(category, "yeni", durum)} current={sirala === "yeni"}>Yeni kayıt</FilterLink>
        <FilterLink href={href(category, "ad", durum)} current={sirala === "ad"}>Ada göre</FilterLink>
      </div>
      {sorted.length === 0 ? (
        <p className="mt-12 max-w-md border border-dashed border-line p-6">
          Bu filtrede parça yok. Filtreyi temizleyin ya da WhatsApp’tan sorun.
        </p>
      ) : (
        <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  const hrefTo = product.kind === "door-model" ? `/kapi-yapilandir/${product.slug}` : `/urun/${product.slug}`;
  return (
    <article>
      <Link href={hrefTo}>
        <PlaceholderFrame slot={photoSlots["product-front"]} label={product.title} />
      </Link>
      <div className="mt-4 border-t border-ink pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] tracking-[0.08em] text-ink-soft">
            {product.isSample ? "ÖRNEK KAYIT" : "KAYIT"}
          </span>
          {product.kind === "carved-piece" ? <StatusBadge status={statusView(product).key} /> : null}
        </div>
        <h2 className="mt-2 font-serif text-[22px] leading-tight">
          <Link href={hrefTo}>{product.title}</Link>
        </h2>
        {product.kind === "carved-piece" ? (
          <p className="mt-2 text-sm text-ink-soft">{dimensionText(product.dimensions)}</p>
        ) : null}
        {product.kind === "door-model" ? (
          <p className="mt-2 text-sm text-ink-soft">
            Model: {product.modelCode ?? <OwnerTodo>model adı</OwnerTodo>}
          </p>
        ) : null}
        <p className="mt-2 text-sm">Fiyat için teklif alın</p>
      </div>
    </article>
  );
}

function FilterLink({ href, current, children }: { href: string; current: boolean; children: string }) {
  return (
    <Link
      href={href}
      aria-current={current ? "true" : undefined}
      className={current ? "border border-ink bg-ink px-3 py-2 text-shaving" : "border border-line px-3 py-2"}
    >
      {children}
    </Link>
  );
}

function href(category: CategoryKey, sirala: string, durum?: string): string {
  const params = new URLSearchParams();
  if (durum) params.set("durum", durum);
  if (sirala === "ad") params.set("sirala", "ad");
  const q = params.toString();
  return q ? `/urunler/${category}?${q}` : `/urunler/${category}`;
}

function matches(product: Product, durum: string | undefined): boolean {
  if (!durum || product.kind !== "carved-piece") return true;
  return statusView(product).key === durum;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
