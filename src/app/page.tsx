import { jsonContentSource } from "@/lib/content/source";
import { publicBusiness } from "@/config/public";

export default async function HomePage() {
  const products = await jsonContentSource.getProducts();
  return (
    <main>
      <h1>{publicBusiness.name}</h1>
      <p>{publicBusiness.tagline}</p>
      <p>{products.length} örnek kayıt</p>
    </main>
  );
}
