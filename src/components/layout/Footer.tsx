import Link from "next/link";
import { publicBusiness } from "@/config/public";
import { categories } from "@/config/categories";
import { Wordmark } from "@/components/layout/Wordmark";
import { OwnerTodo } from "@/components/ui/Marks";

export function Footer() {
  return (
    <footer className="bg-walnut text-shaving">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-12 md:py-20">
        <div className="md:col-span-1">
          <Wordmark tone="dark" size="footer" />
          <p className="mt-5 max-w-xs text-[15px] text-shaving/80">“{publicBusiness.tagline}”</p>
        </div>
        <div>
          <h2 className="mb-4 font-mono text-[11px] tracking-[0.14em] text-shaving/60">ÜRÜNLER</h2>
          <ul className="space-y-2.5 text-[15px]">
            {categories.map((category) => (
              <li key={category.key}>
                <Link href={category.href}>{category.key === "el-oymasi" ? "El oyması tek parçalar" : category.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-mono text-[11px] tracking-[0.14em] text-shaving/60">ATÖLYE</h2>
          <ul className="space-y-2.5 text-[15px]">
            <li><Link href="/hakkimizda">Hakkımızda</Link></li>
            <li><Link href="/referanslar">Referanslar</Link></li>
            <li><Link href="/olcu-rehberi">Ölçü rehberi</Link></li>
            <li><Link href="/sss">Sık sorulanlar</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-mono text-[11px] tracking-[0.14em] text-shaving/60">İLETİŞİM</h2>
          <ul className="space-y-2.5 text-[15px]">
            <li>
              <a href={publicBusiness.phoneTel}>{publicBusiness.phoneDisplay}</a>
              <span className="font-mono text-[11px] tracking-[0.08em] text-shaving/60"> · WHATSAPP</span>
            </li>
            <li>{publicBusiness.location}</li>
            <li><OwnerTodo onDark>çalışma saatleri</OwnerTodo></li>
            <li><OwnerTodo onDark>e-posta</OwnerTodo></li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col gap-3 border-t border-line/35 py-5 font-mono text-[11px] tracking-[0.08em] text-shaving/60 md:flex-row md:items-center md:justify-between">
        <span>
          © SEZER USTA MOBİLYA · <OwnerTodo onDark>ticari unvan</OwnerTodo>
        </span>
        <span className="flex gap-4">
          <Link href="/gizlilik">GİZLİLİK</Link>
          <Link href="/kisisel-veriler">KİŞİSEL VERİLER (TASLAK)</Link>
        </span>
        <a href={publicBusiness.studioUrl}>SİTE: LIVEDEVELOPMENT</a>
      </div>
    </footer>
  );
}
