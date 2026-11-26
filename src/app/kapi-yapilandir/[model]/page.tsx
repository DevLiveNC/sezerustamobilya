import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { jsonContentSource } from "@/lib/content/source";

type Params = { model: string };

export async function generateStaticParams(): Promise<Params[]> {
  const products = await jsonContentSource.getProducts();
  return products.filter((product) => product.kind === "door-model").map((product) => ({ model: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { model } = await params;
  const product = await jsonContentSource.getProduct(model);
  return { title: product ? `${product.title} yapılandırıcı` : "Kapı yapılandırıcı" };
}

export default async function DoorPlaceholder({ params }: { params: Promise<Params> }) {
  const { model } = await params;
  const product = await jsonContentSource.getProduct(model);
  if (!product || product.kind !== "door-model") notFound();
  return (
    <main className="wrap py-16">
      <h1 className="font-display text-5xl">{product.title}</h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Ölçü aralıkları örnektir; kesin ölçüler için teklif alın. Çizim ve kısıt motoru bu sayfaya bağlanıyor.
      </p>
      <Link className="btn btn-primary mt-8" href="/teklif">
        Teklif listesi
      </Link>
    </main>
  );
}
