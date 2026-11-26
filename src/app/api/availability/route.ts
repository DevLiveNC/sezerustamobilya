import { jsonContentSource } from "@/lib/content/source";

export async function GET(): Promise<Response> {
  const products = await jsonContentSource.getProducts();
  const body: Record<string, string> = {};
  for (const product of products) {
    body[product.slug] = product.kind === "carved-piece" ? product.availability : "mevcut";
  }
  return Response.json(body);
}
