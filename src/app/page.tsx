import { HomeView } from "@/components/home/HomeView";
import { featuredCarved } from "@/lib/catalog-view";
import { jsonContentSource } from "@/lib/content/source";

export default async function HomePage() {
  const products = await jsonContentSource.getProducts();
  const pieces = featuredCarved(products)
    .filter((piece) => piece.availability !== "satildi")
    .slice(0, 3);
  return <HomeView pieces={pieces} />;
}
