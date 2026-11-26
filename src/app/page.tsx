import { HomeView, type HomeGroup } from "@/components/home/HomeView";
import { categoryByKey } from "@/config/categories";
import { jsonContentSource } from "@/lib/content/source";
import { heroImageIds, siteImage, type SiteImageId } from "@/lib/site-images";
import { isSiteImageReady } from "@/lib/site-images-files";
import { cardsForTab, groupTitle } from "@/lib/shop";
import type { PieceType } from "@/lib/domain";

export default async function HomePage() {
  const products = await jsonContentSource.getProducts();
  const images = await jsonContentSource.getImages();
  const slides = heroImageIds.map((id) => ({ ...siteImage(id), ready: isSiteImageReady(id) }));
  const large = [
    group("kat-oymali-dolap", "dolap", "oymalı dolap / vitrin", "/urunler/el-oymasi?tur=dolap", products),
    group("kat-oymali-sandik", "sandik", "oymalı sandık", "/urunler/el-oymasi?tur=sandik", products),
    { id: "kat-oymali-masa" as const, href: "/urunler/el-oymasi", title: null, todo: "oymalı masa / sehpa", subtitle: null },
  ];
  const melamin = categoryByKey("melamin-kapi");
  const pvc = categoryByKey("pvc-kapi");
  const custom = categoryByKey("ozel-uretim");
  const small: HomeGroup[] = [
    { id: "kat-melamin-kapi", href: "/urunler/melamin-kapi", title: melamin?.title ?? null, todo: "melamin kapı", subtitle: melamin?.summary ?? null },
    { id: "kat-pvc-kapi", href: "/urunler/pvc-kapi", title: pvc?.title ?? null, todo: "pvc kapı", subtitle: pvc?.summary ?? null },
    {
      id: "kat-ozel-uretim",
      href: "/kapi-yapilandir/melamin-kapi-ornek",
      title: "Kapı yapılandırıcı",
      todo: "kapı yapılandırıcı",
      subtitle: custom?.summary ?? null,
    },
  ];
  return (
    <HomeView
      slides={slides}
      large={large}
      small={small}
      tabs={{
        yeni: cardsForTab(products, "yeni", images),
        "one-cikan": cardsForTab(products, "one-cikan", images),
        kapilar: cardsForTab(products, "kapilar", images),
      }}
    />
  );
}

function group(id: SiteImageId, pieceType: PieceType, todo: string, href: string, products: Awaited<ReturnType<typeof jsonContentSource.getProducts>>): HomeGroup {
  const title = groupTitle(products, pieceType);
  const match = products.find((product) => product.kind === "carved-piece" && product.pieceType === pieceType);
  return { id, href, title, todo, subtitle: match?.summary ?? null };
}
