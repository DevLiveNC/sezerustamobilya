import Image from "next/image";
import { cn } from "@/lib/cn";

export function ProductFrame({
  src,
  alt,
  position = "center",
  priority = false,
  sizes,
  ratio = "4 / 5",
  caption = true,
  fillParent = false,
}: {
  src: string;
  alt: string;
  position?: "left" | "center" | "right";
  priority?: boolean;
  sizes: string;
  ratio?: string;
  caption?: boolean;
  fillParent?: boolean;
}) {
  return (
    <figure className={cn("relative overflow-hidden bg-oak", fillParent && "h-full w-full")} style={fillParent ? undefined : { aspectRatio: ratio }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={cn(
          "object-cover",
          position === "left" && "object-left",
          position === "right" && "object-right",
          position === "center" && "object-center",
        )}
      />
      {caption ? (
        <figcaption className="pointer-events-none absolute bottom-2 right-2 bg-linen/85 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-walnut">
          Temsilî görsel
        </figcaption>
      ) : null}
    </figure>
  );
}
