import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { categoryByKey } from "@/config/categories";
import { publicBusiness, siteUrl, whatsappHref } from "@/config/public";
import { dimensionText, relatedProducts, statusView } from "@/lib/catalog-view";
import { pictureById, shownPictures } from "@/lib/product-pictures";
import { jsonContentSource } from "@/lib/content/source";
import { AddPieceButton } from "@/components/quote/AddPieceButton";
import { CarvingViewer } from "@/components/viewer/CarvingViewer";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductFrame } from "@/components/media/ProductFrame";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { photoSlots } from "@/config/slots";
import { OwnerTodo, PlaceholderFrame, StatusBadge } from "@/components/ui/Marks";
import type { Product } from "@/lib/domain/product";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const products = await jsonContentSource.getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await jsonContentSource.getProduct(slug);
  if (!product) return { title: "Ürün" };
  return {
    title: product.seo?.title ?? product.title,
    description: product.seo?.description ?? product.summary,
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = await jsonContentSource.getProduct(slug);
  if (!product) notFound();
  const all = await jsonContentSource.getProducts();
  const related = relatedProducts(all, product);
  const catalogueImages = await jsonContentSource.getImages();
  const pictures = shownPictures(product, catalogueImages);
  const detail =
    product.kind === "carved-piece"
      ? pictureById(product.carvingDetailImageId, `${product.title} oyma detayı`, catalogueImages)
      : null;
  const category = categoryByKey(product.category);
  const origin = siteUrl().origin;
  const pageUrl = new URL(`/urun/${product.slug}`, origin).toString();
  const message = `Merhaba, “${product.title}” için yazıyorum. ${pageUrl}`;
  const crumbs = [
    { name: "Ana sayfa", url: origin },
    { name: "Ürünler", url: new URL("/urunler", origin).toString() },
    { name: category?.title ?? "Ürün", url: new URL(category?.href ?? "/urunler", origin).toString() },
    { name: product.title, url: pageUrl },
  ];

  return (
    <main className="wrap py-10 md:py-16">
      <ProductJsonLd name={product.title} description={product.summary} url={pageUrl} />
      <BreadcrumbJsonLd items={crumbs} />
      <Breadcrumbs
        items={[
          { href: "/", label: "ANA SAYFA" },
          { href: "/urunler", label: "ÜRÜNLER" },
          { href: category?.href ?? "/urunler", label: (category?.title ?? "ÜRÜN").toLocaleUpperCase("tr") },
          { label: product.title.toLocaleUpperCase("tr") },
        ]}
      />
      <div className="mt-8 grid gap-12 lg:grid-cols-[7fr_5fr]">
        <div className="grid gap-6">
          {pictures.length === 0 ? (
            <PlaceholderFrame slot={photoSlots["product-front"]} label={product.title} />
          ) : (
            <ProductGallery images={pictures} />
          )}
        </div>
        <div>
          <p className="font-mono text-[12px] tracking-[0.12em] text-ink-soft">
            {product.isSample ? "ÖRNEK KAYIT" : "KAYIT"}
            {product.kind === "carved-piece" ? " · TEK PARÇA" : null}
          </p>
          <h1 className="mt-3 font-display text-[44px] leading-none tracking-[-0.02em] md:text-[64px]">{product.title}</h1>
          <p className="mt-4 text-ink-soft">{product.summary}</p>
          {product.kind === "carved-piece" ? <CarvedSpec product={product} /> : null}
          {product.kind === "door-model" ? (
            <p className="mt-6">
              Bu bir kapı kaydı. Ölçüyü çizmek için{" "}
              <Link className="underline" href={`/kapi-yapilandir/${product.slug}`}>
                yapılandırıcıyı
              </Link>{" "}
              açın. Fiyat için teklif alın.
            </p>
          ) : null}
          {product.kind === "custom-work" ? (
            <ol className="mt-6 space-y-3">
              {product.steps.map((step) => (
                <li key={step.title}>
                  <span className="font-serif text-xl">{step.title}</span>
                  <p className="text-ink-soft">{step.body}</p>
                </li>
              ))}
            </ol>
          ) : null}
          <div className="mt-8 flex flex-col gap-3">
            <AddPieceButton
              slug={product.slug}
              title={product.title}
              custom={product.kind === "custom-work"}
              {...(product.kind === "carved-piece" ? { availability: product.availability } : {})}
            />
            <a className="btn btn-ghost" href={whatsappHref(message)}>
              <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
              WhatsApp · {publicBusiness.phoneDisplay}
            </a>
          </div>
          <p className="mt-4 text-sm text-ink-soft">Fiyat bilgisi WhatsApp’tan. Bu kayıtta fiyat yok.</p>
        </div>
      </div>
      {product.kind === "carved-piece" && product.carvingDetailImageId ? (
        <section className="mt-16 border-t border-line pt-10" id="detay">
          <h2 className="font-display text-[36px] leading-none md:text-[48px]">Bıçağın izini yakından görün.</h2>
          <p className="mt-3 max-w-xl text-ink-soft">
            {detail
              ? "Bu kare temsilîdir. Atölyenin kendi detay fotoğrafı gelince yerine geçer."
              : "Oyma fotoğrafı atölyeden gelince burada yakınlaştırılır."}
          </p>
          <div className="mt-6 max-w-xl">
            <CarvingViewer label={`${product.title} oyma detayı`}>
              {detail ? (
                <ProductFrame
                  src={detail.src}
                  alt={detail.alt}
                  position={detail.position}
                  sizes="(min-width: 1024px) 560px, 90vw"
                  ratio="1 / 1"
                />
              ) : (
                <PlaceholderFrame slot={photoSlots["product-detail"]} label="product-detail" />
              )}
            </CarvingViewer>
          </div>
        </section>
      ) : null}
      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-mono text-[12px] tracking-[0.12em] text-ink-soft">AYNI ATÖLYEDEN</h2>
          <ul className="mt-4 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={item.kind === "door-model" ? `/kapi-yapilandir/${item.slug}` : `/urun/${item.slug}`} className="font-serif text-xl">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}

function CarvedSpec({ product }: { product: Extract<Product, { kind: "carved-piece" }> }) {
  const status = statusView(product);
  return (
    <div className="mt-6 border-t border-ink">
      <div className="flex items-center justify-between py-3">
        <span className="font-mono text-[11px] tracking-[0.1em] text-ink-soft">MÜZE ETİKETİ</span>
        <StatusBadge status={status.key} />
      </div>
      <dl>
        <Row label="AĞAÇ" value={product.wood ?? <OwnerTodo>ağaç türü</OwnerTodo>} />
        <Row label="ÖLÇÜ" value={dimensionText(product.dimensions)} />
        <Row label="CİLA" value={product.finish ?? <OwnerTodo>cila / boya</OwnerTodo>} />
        <Row label="TÜR" value={pieceLabel(product.pieceType)} />
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 border-t border-line py-3 text-[15px]">
      <dt className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function pieceLabel(type: string): string {
  if (type === "sandik") return "Sandık";
  if (type === "ayna-cercevesi") return "Ayna çerçevesi";
  if (type === "dolap") return "Dolap";
  return "Diğer";
}

