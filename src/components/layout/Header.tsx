"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Wordmark } from "@/components/layout/Wordmark";
import { QuoteDrawer } from "@/components/quote/QuoteDrawer";
import { useFavorites } from "@/lib/favorites/store";
import { quoteCount, useQuote } from "@/lib/quote/store";

export interface SearchHit {
  title: string;
  href: string;
  group: string;
}

const nav = [
  {
    label: "El oyması",
    href: "/urunler/el-oymasi",
    children: [
      { label: "Tümü", href: "/urunler/el-oymasi" },
      { label: "Sandık", href: "/urunler/el-oymasi?tur=sandik" },
      { label: "Dolap", href: "/urunler/el-oymasi?tur=dolap" },
      { label: "Ayna çerçevesi", href: "/urunler/el-oymasi?tur=ayna-cercevesi" },
    ],
  },
  {
    label: "Melamin kapı",
    href: "/urunler/melamin-kapi",
    children: [
      { label: "Modeller", href: "/urunler/melamin-kapi" },
      { label: "Yapılandırıcı", href: "/kapi-yapilandir/melamin-kapi-ornek" },
    ],
  },
  {
    label: "PVC kapı",
    href: "/urunler/pvc-kapi",
    children: [
      { label: "Modeller", href: "/urunler/pvc-kapi" },
      { label: "Yapılandırıcı", href: "/kapi-yapilandir/pvc-kapi-ornek" },
    ],
  },
  {
    label: "Kapı yapılandırıcı",
    href: "/kapi-yapilandir/melamin-kapi-ornek",
    children: [
      { label: "Melamin", href: "/kapi-yapilandir/melamin-kapi-ornek" },
      { label: "PVC", href: "/kapi-yapilandir/pvc-kapi-ornek" },
    ],
  },
  {
    label: "Atölye",
    href: "/hakkimizda",
    children: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Referanslar", href: "/referanslar" },
      { label: "Ölçü rehberi", href: "/olcu-rehberi" },
      { label: "Sık sorulanlar", href: "/sss" },
    ],
  },
  {
    label: "İletişim",
    href: "/iletisim",
    children: [
      { label: "Atölye", href: "/iletisim" },
      { label: "Teklif", href: "/teklif" },
    ],
  },
];

export function Header({ hits }: { hits: SearchHit[] }) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const ready = useQuote((state) => state.ready);
  const count = useQuote((state) => (state.ready ? quoteCount(state.lines) : 0));
  const setDrawer = useQuote((state) => state.setDrawer);
  const saved = useFavorites((state) => (state.ready ? state.slugs.length : 0));
  const searchId = useId();
  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("tr");
    if (needle.length < 2) return [];
    return hits.filter((hit) => hit.title.toLocaleLowerCase("tr").includes(needle)).slice(0, 8);
  }, [hits, query]);

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenLabel(null);
    };
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, []);

  function showSearch() {
    setSearchOpen(true);
    searchRef.current?.showModal();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-shaving">
      <div className="wrap flex h-16 items-center gap-3 md:h-[84px]">
        <Wordmark />
        <nav ref={navRef} className="ml-6 hidden items-center gap-1 xl:flex" aria-label="Ana menü">
          {nav.map((item) => {
            const open = openLabel === item.label;
            return (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center px-2 text-sm font-medium"
                  aria-expanded={open}
                  onClick={() => setOpenLabel(open ? null : item.label)}
                >
                  {item.label}
                </button>
                {open ? (
                  <div className="absolute left-0 top-full z-20 min-w-52 border border-line bg-linen p-2 shadow-lift">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block min-h-11 px-3 py-2 text-sm"
                        onClick={() => setOpenLabel(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <button type="button" className="grid h-11 w-11 place-items-center" aria-label="Ara" onClick={showSearch}>
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <Link href="/favoriler" className="relative grid h-11 w-11 place-items-center" aria-label={`Favoriler, ${saved}`}>
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center"
            aria-label={`Teklif listesi, ${count} kalem`}
            onClick={() => setDrawer(true)}
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            <span key={ready ? count : "yok"} className="roll absolute -right-0.5 -top-0.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-ink px-1 font-mono text-[10px] text-shaving" aria-live="polite">
              {count}
            </span>
          </button>
          <Link href="/teklif" className="btn btn-primary btn-sm ml-1 hidden sm:inline-flex">
            Teklif al
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="tam-menu"
            onClick={() => {
              setMenuOpen(true);
              menuRef.current?.showModal();
            }}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Menü</span>
          </button>
        </div>
      </div>
      <dialog
        id="tam-menu"
        ref={menuRef}
        className="menu-dialog"
        aria-label="Menü"
        onClose={() => setMenuOpen(false)}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Wordmark />
          <button type="button" className="grid h-11 w-11 place-items-center" onClick={() => menuRef.current?.close()} aria-label="Menüyü kapat">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="grid gap-1 px-3 py-4" aria-label="Mobil menü">
          {nav.map((item) => (
            <div key={item.label} className="border-b border-line py-2">
              <p className="px-2 font-mono text-[11px] tracking-[0.12em] text-ink-soft">{item.label.toLocaleUpperCase("tr")}</p>
              {item.children.map((child) => (
                <Link key={child.href + child.label} href={child.href} className="block min-h-11 px-2 py-2 text-lg" onClick={() => menuRef.current?.close()}>
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          </nav>
      </dialog>
      <dialog ref={searchRef} className="w-[min(100%,560px)] border border-line bg-linen p-5" aria-labelledby={searchId} onClose={() => setSearchOpen(false)}>
        <h2 id={searchId} className="font-serif text-2xl">
          Ara
        </h2>
        <input
          className="mt-4 h-12 w-full border border-ink-soft bg-shaving px-3"
          value={query}
          placeholder="Parça veya kapı adı"
          onChange={(event) => setQuery(event.target.value)}
          autoFocus={searchOpen}
        />
        <ul className="mt-3">
          {results.map((hit) => (
            <li key={hit.href}>
              <Link href={hit.href} className="block min-h-11 py-2" onClick={() => searchRef.current?.close()}>
                <span className="block">{hit.title}</span>
                <span className="text-sm text-ink-soft">{hit.group}</span>
              </Link>
            </li>
          ))}
        </ul>
        {query.trim().length >= 2 && results.length === 0 ? <p className="mt-3 text-sm text-ink-soft">Bu adla kayıt yok.</p> : null}
      </dialog>
      <QuoteDrawer />
    </header>
  );
}
