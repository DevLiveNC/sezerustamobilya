import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DoorConfigurator } from "@/components/doors/DoorConfigurator";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { OwnerTodo } from "@/components/ui/Marks";
import { categoryByKey } from "@/config/categories";
import { jsonContentSource } from "@/lib/content/source";

type Params = { model: string };

export async function generateStaticParams(): Promise<Params[]> {
  const products = await jsonContentSource.getProducts();
  return products.filter((product) => product.kind === "door-model").map((product) => ({ model: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { model } = await params;
  const product = await jsonContentSource.getProduct(model);
  return { title: product?.kind === "door-model" ? `${product.title} yapılandırıcı` : "Kapı yapılandırıcı" };
}

export default async function DoorPage({ params }: { params: Promise<Params> }) {
  const { model: slug } = await params;
  const products = await jsonContentSource.getProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product || product.kind !== "door-model") notFound();
  const sibling = products.find((item) => item.kind === "door-model" && item.material !== product.material);
  const category = categoryByKey(product.category);
  const materialLabel = product.material === "melamin" ? "Melamin" : "PVC";

  return (
    <main>
      <div className="wrap">
        <Breadcrumbs
          items={[
            { href: "/", label: "Ana sayfa" },
            { href: "/urunler", label: "Ürünler" },
            { href: category?.href ?? "/urunler", label: category?.title ?? "Kapı" },
            { label: "Yapılandırıcı" },
          ]}
        />
        <div className="flex flex-col gap-6 border-b border-line py-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">
              KAPI YAPILANDIRICI · TOPTAN + PERAKENDE
            </p>
            <h1 className="mt-3 font-display text-5xl leading-none md:text-7xl">{product.title}</h1>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] tracking-[0.12em] text-ink-soft">MALZEME</p>
            <div className="inline-flex overflow-hidden rounded-[3px] border border-ink">
              <MaterialLink href={`/kapi-yapilandir/${product.slug}`} label={materialLabel} current />
              {sibling && sibling.kind === "door-model" ? (
                <MaterialLink
                  href={`/kapi-yapilandir/${sibling.slug}`}
                  label={sibling.material === "melamin" ? "Melamin" : "PVC"}
                  current={false}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<p className="wrap py-10 text-ink-soft">Çizim hazırlanıyor.</p>}>
        <DoorConfigurator model={product} />
      </Suspense>
      <div className="wrap grid gap-10 py-20 md:grid-cols-3">
        <section>
          <p className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">ÖLÇÜ REHBERİ</p>
          <h2 className="mt-3 font-display text-3xl font-normal">Kapı ölçüsü nasıl alınır?</h2>
          <p className="mt-3 text-ink-soft">Duvar boşluğunu üç noktadan ölçmek için adım adım çizimli rehber.</p>
          <Link className="mt-4 inline-block underline" href="/olcu-rehberi">
            Ölçü rehberi
          </Link>
        </section>
        <section>
          <p className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">TOPTAN</p>
          <h2 className="mt-3 font-display text-3xl font-normal">Müteahhit ve toplu alım</h2>
          <p className="mt-3 text-ink-soft">
            Birden fazla ölçüyü listeye ekleyin; talep toptan olarak işaretlenir. Minimum adet:{" "}
            <OwnerTodo>adet</OwnerTodo>
          </p>
        </section>
        <section>
          <p className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">GARANTİ</p>
          <h2 className="mt-3 font-display text-3xl font-normal">“Garantili ürün.”</h2>
          <p className="mt-3 text-ink-soft">
            İşletmenin kendi ifadesi. Süre ve kapsam: <OwnerTodo>garanti süresi ve kapsamı</OwnerTodo>
          </p>
        </section>
      </div>
    </main>
  );
}

function MaterialLink({ href, label, current }: { href: string; label: string; current: boolean }) {
  return (
    <Link
      href={href}
      {...(current ? { "aria-current": "page" as const } : {})}
      className={`grid h-11 place-items-center px-5 text-sm font-semibold ${current ? "bg-walnut text-shaving" : ""}`}
    >
      {label}
    </Link>
  );
}
