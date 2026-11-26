import Link from "next/link";
import { cn } from "@/lib/cn";

/** Option B, Tezgâh Yazısı. Young Serif plus the workshop’s own line. No emblem. */
export function Wordmark({
  tone = "light",
  size = "header",
}: {
  tone?: "light" | "dark";
  size?: "header" | "footer";
}) {
  return (
    <Link href="/" className="inline-flex max-w-[16rem] flex-col leading-none md:max-w-none">
      <span
        className={cn(
          "font-wordmark tracking-[-0.01em]",
          size === "footer" ? "text-[28px] md:text-[34px]" : "text-[18px] md:text-[22px]",
          tone === "dark" ? "text-shaving" : "text-ink",
        )}
      >
        Sezer Usta Mobilya
      </span>
      <span
        className={cn(
          "mt-1 font-sans leading-tight",
          size === "footer" ? "text-[13px]" : "text-[11px] md:text-[12px]",
          tone === "dark" ? "text-shaving/70" : "text-ink-soft",
        )}
      >
        El oyma sanatı ve mobilya ustası
      </span>
    </Link>
  );
}
