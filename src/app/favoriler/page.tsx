import type { Metadata } from "next";
import { FavoriteList } from "@/components/shop/FavoriteList";
import { jsonContentSource } from "@/lib/content/source";
import { toShopCard } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Favoriler",
  description: "Kaydettiğiniz parçalar bu tarayıcıda durur.",
};

export default async function FavoritesPage() {
  const products = await jsonContentSource.getProducts();
  return (
    <main className="wrap py-12 md:py-16">
      <h1 className="font-display text-5xl leading-none md:text-7xl">Favoriler</h1>
      <p className="mt-4 max-w-xl text-ink-soft">Kalp işareti bu tarayıcıda saklanır. Fiyat yoktur.</p>
      <FavoriteList cards={products.map(toShopCard)} />
    </main>
  );
}
