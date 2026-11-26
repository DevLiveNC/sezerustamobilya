import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/config/categories";
import { photoSlots } from "@/config/slots";
import { PlaceholderFrame } from "@/components/ui/Marks";
import { CategoryHover } from "@/components/catalog/CategoryHover";

export const metadata: Metadata = {
  title: "Ürünler",
  description: "El oyması tek parçalar, melamin kapı, PVC kapı ve ölçüye göre özel üretim. Gazimağusa, Kuzey Kıbrıs.",
};

export default function ProductsPage() {
  return (
    <main className="wrap py-12 md:py-20">
      <p className="font-mono text-[12px] tracking-[0.12em] text-ink-soft">ÜRÜNLER</p>
      <h1 className="mt-3 max-w-3xl font-display text-[48px] leading-none tracking-[-0.02em] md:text-[72px]">
        Üç ürün dünyası, bir atölye.
      </h1>
      <div className="mt-12 hidden md:block">
        <CategoryHover />
      </div>
      <div className="mt-8 flex snap-x gap-3 overflow-x-auto md:hidden">
        {categories.map((category) => (
          <Link key={category.key} href={category.href} className="w-[240px] shrink-0 snap-start border border-line bg-linen">
            <PlaceholderFrame slot={photoSlots["product-front"]} label={category.title} ratio="4 / 3" />
            <span className="block p-4 font-display text-[28px] leading-none">{category.title}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
