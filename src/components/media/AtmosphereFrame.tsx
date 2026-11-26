import { AtmosphereVisual } from "@/components/media/AtmosphereVisual";
import { siteImage, type SiteImageId } from "@/lib/site-images";
import { isSiteImageReady } from "@/lib/site-images-files";

export function AtmosphereFrame({
  id,
  className,
  priority = false,
  sizes,
}: {
  id: SiteImageId;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const image = siteImage(id);
  return (
    <AtmosphereVisual
      image={image}
      ready={isSiteImageReady(id)}
      priority={priority}
      {...(className ? { className } : {})}
      {...(sizes ? { sizes } : {})}
    />
  );
}
