"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Wordmark } from "@/components/layout/Wordmark";
import { useFavorites } from "@/lib/favorites/store";
import { quoteCount, useQuote } from "@/lib/quote/store";

const QuoteDrawer = dynamic(() => import("@/components/quote/QuoteDrawer").then((mod) => mod.QuoteDrawer), {
  ssr: false,
});

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

const productLinks = [
  { label: "El oyması", href: "/urunler/el-oymasi" },
  { label: "Sandık", href: "/urunler/el-oymasi?tur=sandik" },
  { label: "Dolap", href: "/urunler/el-oymasi?tur=dolap" },
  { label: "Ayna çerçevesi", href: "/urunler/el-oymasi?tur=ayna-cercevesi" },
  { label: "Melamin kapı", href: "/urunler/melamin-kapi" },
  { label: "PVC kapı", href: "/urunler/pvc-kapi" },
  { label: "Kapı yapılandırıcı", href: "/kapi-yapilandir/melamin-kapi-ornek" },
];

const drawerSections = [
  {
    id: "atolye",
    label: "Atölye",
    links: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Referanslar", href: "/referanslar" },
      { label: "Ölçü rehberi", href: "/olcu-rehberi" },
      { label: "Sık sorulanlar", href: "/sss" },
    ],
  },
  {
    id: "iletisim",
    label: "İletişim",
    links: [
      { label: "Atölye", href: "/iletisim" },
      { label: "Teklif", href: "/teklif" },
    ],
  },
];

export function Header({ hits }: { hits: SearchHit[] }) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(true);
  const [sectionOpen, setSectionOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const scrollLocked = useRef(false);
  const ready = useQuote((state) => state.ready);
  const count = useQuote((state) => (state.ready ? quoteCount(state.lines) : 0));
  const drawer = useQuote((state) => state.drawer);
  const setDrawer = useQuote((state) => state.setDrawer);
  const [drawerMounted, setDrawerMounted] = useState(false);
  if (drawer && !drawerMounted) setDrawerMounted(true);
  const saved = useFavorites((state) => (state.ready ? state.slugs.length : 0));
  const searchId = useId();
  const drawerSearchId = useId();
  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("tr");
    if (needle.length < 2) return [];
    return hits.filter((hit) => hit.title.toLocaleLowerCase("tr").includes(needle)).slice(0, 8);
  }, [hits, query]);

  function lockScroll(open: boolean) {
    if (scrollLocked.current === open) return;
    scrollLocked.current = open;
    document.body.classList.toggle("menu-open", open);
    void import("@/lib/motion/smooth-scroll").then((mod) => mod.setOverlay(open));
  }

  function openMenu() {
    const dialog = menuRef.current;
    if (!dialog || dialog.open) return;
    setMenuOpen(true);
    dialog.showModal();
    lockScroll(true);
  }

  function closeMenu() {
    menuRef.current?.close();
  }

  function showSearch() {
    setSearchOpen(true);
    searchRef.current?.showModal();
  }

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenLabel(null);
    };
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-shaving">
      <div className="wrap flex h-16 min-w-0 items-center gap-2 md:h-[84px] md:gap-3">
        <Wordmark compact className="min-w-0 shrink" />
        <nav
          ref={navRef}
          className="ml-6 hidden items-center gap-1 xl:flex"
          aria-label="Ana menü"
        >
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
        <div className="ml-auto flex shrink-0 items-center">
          <button type="button" className="hidden h-11 w-11 place-items-center md:grid" aria-label="Ara" onClick={showSearch}>
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <Link href="/favoriler" className="relative hidden h-11 w-11 place-items-center md:grid" aria-label={`Favoriler, ${saved}`}>
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
          <Link href="/teklif" className="btn btn-primary btn-sm ml-1 max-md:hidden! md:inline-flex">
            Teklif al
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="tam-menu"
            onClick={openMenu}
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
        onClose={() => {
          setMenuOpen(false);
          lockScroll(false);
        }}
        onClick={(event) => {
          if (event.target === menuRef.current) closeMenu();
        }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <Wordmark compact className="min-w-0 shrink" />
          <button type="button" className="grid h-11 w-11 shrink-0 place-items-center" onClick={closeMenu} aria-label="Menüyü kapat" autoFocus>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 py-4">
          <label className="sr-only" htmlFor={drawerSearchId}>
            Ara
          </label>
          <input
            id={drawerSearchId}
            className="h-12 w-full border border-ink-soft bg-linen px-3"
            value={query}
            placeholder="Parça veya kapı adı"
            onChange={(event) => setQuery(event.target.value)}
          />
          <ul className="mt-2">
            {results.map((hit) => (
              <li key={hit.href}>
                <Link href={hit.href} className="block min-h-11 py-2" onClick={closeMenu}>
                  <span className="block">{hit.title}</span>
                  <span className="text-sm text-ink-soft">{hit.group}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <nav className="grid px-3 pb-6" aria-label="Mobil menü">
          <div className="border-b border-line">
            <button
              type="button"
              className="flex min-h-11 w-full items-center justify-between px-2 text-left text-lg"
              aria-expanded={productsOpen}
              aria-controls="menu-urunler"
              onClick={() => setProductsOpen((open) => !open)}
            >
              Ürünler
              <ChevronDown className={`h-5 w-5 transition-transform ${productsOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {productsOpen ? (
              <div id="menu-urunler" className="pb-2">
                {productLinks.map((link) => (
                  <Link key={link.href + link.label} href={link.href} className="block min-h-11 px-4 py-2" onClick={closeMenu}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {drawerSections.map((section) => {
            const open = sectionOpen === section.id;
            return (
              <div key={section.id} className="border-b border-line">
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between px-2 text-left text-lg"
                  aria-expanded={open}
                  aria-controls={`menu-${section.id}`}
                  onClick={() => setSectionOpen(open ? null : section.id)}
                >
                  {section.label}
                  <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {open ? (
                  <div id={`menu-${section.id}`} className="pb-2">
                    {section.links.map((link) => (
                      <Link key={link.href + link.label} href={link.href} className="block min-h-11 px-4 py-2" onClick={closeMenu}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <Link href="/favoriler" className="flex min-h-11 items-center gap-2 px-2" onClick={closeMenu}>
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            Favoriler{saved > 0 ? ` (${saved})` : ""}
          </Link>
          <Link href="/teklif" className="btn btn-primary mx-2 mt-3" onClick={closeMenu}>
            Teklif al
          </Link>
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
      {drawerMounted ? <QuoteDrawer /> : null}
    </header>
  );
}
