"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, List } from "lucide-react";
import { categories } from "@/config/categories";
import { Wordmark } from "@/components/layout/Wordmark";
import { cn } from "@/lib/cn";

const links = [
  { href: "/hakkimizda", label: "Atölye" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/olcu-rehberi", label: "Ölçü Rehberi" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const menuWasOpen = useRef(false);

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!productsRef.current?.contains(event.target as Node)) setOpenPath(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function showMenu() {
    if (menuWasOpen.current) return;
    menuWasOpen.current = true;
    dialogRef.current?.showModal();
    setMenuOpen(true);
    void import("@/lib/motion/smooth-scroll").then((mod) => mod.setOverlay(true));
  }

  function hideMenu() {
    dialogRef.current?.close();
  }

  function onDialogClose() {
    setMenuOpen(false);
    if (!menuWasOpen.current) return;
    menuWasOpen.current = false;
    void import("@/lib/motion/smooth-scroll").then((mod) => mod.setOverlay(false));
  }

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-shaving">
      <div className="wrap flex h-16 items-center gap-4 md:h-[84px] md:gap-8">
        <Wordmark />
        <nav className="ml-auto hidden items-center gap-7 text-[15px] font-medium lg:flex" aria-label="Ana menü">
          <div className="relative" ref={productsRef}>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-1.5"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpenPath(open ? null : pathname)}
            >
              Ürünler
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            {open ? (
              <div
                id={menuId}
                className="absolute left-0 top-full z-20 mt-3 w-[420px] border border-line bg-linen p-2 shadow-[var(--shadow-lift)]"
              >
                {categories.map((category) => (
                  <Link
                    key={category.key}
                    href={category.href}
                    className="block px-3 py-3 hover:bg-shaving"
                    onClick={() => setOpenPath(null)}
                  >
                    <span className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">{category.eyebrow}</span>
                    <span className="mt-1 block font-display text-[28px] leading-none">{category.title}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{category.summary}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center" aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Link href="/teklif" className="inline-flex min-h-11 items-center gap-2 text-[15px] font-medium">
            <List className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            <span className="hidden sm:inline">Teklif listesi</span>
            <span className="rounded-full bg-ink px-1.5 py-0.5 font-mono text-[11px] text-shaving">0</span>
          </Link>
          <Link href="/teklif" className="btn btn-primary btn-sm hidden md:inline-flex">
            Teklif Al
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="tam-menu"
            onClick={showMenu}
          >
            <span className="sr-only">Menüyü aç</span>
            <span className="block h-3 w-[22px] border-y-[1.5px] border-ink" />
          </button>
        </div>
      </div>
      <dialog ref={dialogRef} id="tam-menu" className="menu-dialog" onClose={onDialogClose}>
        <div className="flex h-16 items-center justify-between px-5">
          <Wordmark />
          <button type="button" className="btn btn-ghost btn-sm" onClick={hideMenu}>
            Kapat
          </button>
        </div>
        <nav className="flex flex-col px-5 pb-28" aria-label="Mobil menü">
          {categories.map((category) => (
            <Link key={category.key} href={category.href} onClick={hideMenu} className="border-b border-line py-4 font-display text-[36px] leading-none">
              {category.title}
            </Link>
          ))}
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={hideMenu} className={cn("border-b border-line py-4 text-lg")}>
              {link.label}
            </Link>
          ))}
          <Link href="/sss" onClick={hideMenu} className="border-b border-line py-4 text-lg">
            Sık sorulanlar
          </Link>
        </nav>
      </dialog>
    </header>
  );
}
