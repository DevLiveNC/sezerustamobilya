import { isPreviewMode } from "@/config/public";

export function PreviewRibbon() {
  if (!isPreviewMode()) return null;
  return (
    <div className="bg-walnut px-3 py-2 text-center font-mono text-[11px] tracking-[0.1em] text-shaving">
      <b className="font-medium text-oak">ÖNİZLEME</b>
      <span> — fotoğraflar ve ürün bilgileri işletmeden bekleniyor.</span>
    </div>
  );
}
