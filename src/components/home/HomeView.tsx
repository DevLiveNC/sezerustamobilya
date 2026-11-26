import Link from "next/link";
import { DoorOpen, Hammer, MapPin, MessageCircle, Ruler, Sparkles } from "lucide-react";
import { AtmosphereFrame } from "@/components/media/AtmosphereFrame";
import { HeroSlider, type HeroSlide } from "@/components/shop/HeroSlider";
import { ProductTabs } from "@/components/shop/ProductTabs";
import { OwnerTodo } from "@/components/ui/Marks";
import { publicBusiness } from "@/config/public";
import type { SiteImageId } from "@/lib/site-images";
import type { ShopCard } from "@/lib/shop";

export interface HomeGroup {
  id: SiteImageId;
  href: string;
  title: string | null;
  todo: string;
  subtitle: string | null;
}

export function HomeView({
  slides,
  large,
  small,
  tabs,
}: {
  slides: HeroSlide[];
  large: HomeGroup[];
  small: HomeGroup[];
  tabs: { yeni: ShopCard[]; "one-cikan": ShopCard[]; kapilar: ShopCard[] };
}) {
  return (
    <main>
      <section className="relative h-[78vh] min-h-[560px] max-h-[820px] bg-oak">
        <HeroSlider slides={slides} />
        <div className="relative z-10 flex h-full items-end md:items-center">
          <div className="w-full bg-shaving/92 px-5 py-8 md:w-[min(46%,640px)] md:bg-shaving/84 md:px-16 md:py-14">
            <p className="font-mono text-[12px] tracking-[0.14em] text-walnut">GAZİMAĞUSA · EL OYMASI</p>
            <h1 className="mt-4 max-w-xl font-display text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl">
              El oyma sanatı ve mobilya ustası.
            </h1>
            <p className="mt-5 max-w-md text-ink-soft">
              Büyük Sanayi’deki atölyede tek parça el oyması, ölçünüze kapı ve özel iş. Fiyat için teklif alın.
            </p>
            <Link className="btn btn-primary mt-8" href="/urunler">
              Ürünleri incele →
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap py-14 md:py-20">
        <h2 className="font-display text-4xl leading-none md:text-5xl">El oyması</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {large.map((group) => (
            <li key={group.id}>
              <Link href={group.href} className="group block">
                <AtmosphereFrame id={group.id} className="aspect-[4/3]" sizes="(min-width: 768px) 30vw, 100vw" />
                <span className="mt-3 block font-serif text-2xl">{group.title ?? <OwnerTodo>{group.todo}</OwnerTodo>}</span>
                <span className="mt-1 block text-sm text-ink-soft">
                  {group.subtitle ?? <OwnerTodo>kısa açıklama</OwnerTodo>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {small.map((group) => (
            <li key={group.id}>
              <Link href={group.href} className="grid grid-cols-[96px_1fr] items-center gap-4 border border-line bg-linen p-3">
                <AtmosphereFrame id={group.id} className="aspect-square" sizes="96px" />
                <span>
                  <span className="block font-serif text-xl">{group.title ?? <OwnerTodo>{group.todo}</OwnerTodo>}</span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    {group.subtitle ?? <OwnerTodo>kısa açıklama</OwnerTodo>}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ProductTabs groups={tabs} />

      <section className="border-y border-line bg-linen">
        <ul className="wrap grid grid-cols-2 gap-6 py-10 md:grid-cols-3 xl:grid-cols-6">
          {features.map((feature) => (
            <li key={feature.label} className="flex items-center gap-3 text-sm font-medium">
              <feature.icon className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {feature.label}
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap py-16 md:py-24">
        <h2 className="font-display text-4xl leading-none md:text-5xl">Atölyeden rehber</h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-2">
          <li>
            <article className="grid gap-4 md:grid-cols-[220px_1fr] md:items-center">
              <AtmosphereFrame id="rehber-olcu" className="aspect-[4/3]" sizes="220px" />
              <div>
                <h3 className="font-serif text-2xl">Kapı ölçüsü nasıl alınır?</h3>
                <p className="mt-2 line-clamp-2 text-ink-soft">
                  Kapı boşluğunun içinden, üstten, ortadan ve alttan genişlik ölçün. En dar olanı not edin.
                </p>
                <Link className="mt-3 inline-flex min-h-11 items-center font-semibold" href="/olcu-rehberi">
                  Devamını oku →
                </Link>
              </div>
            </article>
          </li>
          <li>
            <article className="grid gap-4 md:grid-cols-[220px_1fr] md:items-center">
              <AtmosphereFrame id="rehber-bakim" className="aspect-[4/3]" sizes="220px" />
              <div>
                <h3 className="font-serif text-2xl">El oyması bakımı</h3>
                <p className="mt-2 line-clamp-2 text-ink-soft">
                  <OwnerTodo>bakım metni</OwnerTodo>
                </p>
                <Link className="mt-3 inline-flex min-h-11 items-center font-semibold" href="/sss">
                  Devamını oku →
                </Link>
              </div>
            </article>
          </li>
        </ul>
        <p className="mt-8 text-sm text-ink-soft">{publicBusiness.location}. Fiyat bilgisi WhatsApp’tan.</p>
      </section>
    </main>
  );
}

const features = [
  { label: "El oyması", icon: Hammer },
  { label: "Tek parça üretim", icon: Sparkles },
  { label: "Ölçüye özel kapı", icon: Ruler },
  { label: "Melamin ve PVC", icon: DoorOpen },
  { label: "Gazimağusa atölye", icon: MapPin },
  { label: "WhatsApp teklif", icon: MessageCircle },
];
