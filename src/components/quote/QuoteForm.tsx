"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitQuote, type QuoteActionResult } from "@/app/teklif/actions";
import { track } from "@/lib/analytics";
import { openingLabel } from "@/lib/doors/engine";
import { toE164 } from "@/lib/quote/phone";
import { useQuote } from "@/lib/quote/store";
import { compileWhatsApp, type QuoteMessageInput } from "@/lib/quote/toWhatsApp";

const initial: QuoteActionResult | null = null;

export function QuoteForm({ origin }: { origin: string }) {
  const lines = useQuote((state) => state.lines);
  const flags = useQuote((state) => state.flags);
  const setQty = useQuote((state) => state.setQty);
  const remove = useQuote((state) => state.remove);
  const [state, action, pending] = useActionState(submitQuote, initial);
  const [photos, setPhotos] = useState<{ name: string; bytes: number; url: string }[]>([]);
  const [localError, setLocalError] = useState("");
  const [sent, setSent] = useState<Omit<QuoteMessageInput, "lines" | "origin"> | null>(null);

  async function onPhotos(list: FileList | null) {
    if (!list) return;
    const next = [...photos];
    for (const file of Array.from(list)) {
      if (next.length >= 5) break;
      if (!file.type.startsWith("image/")) {
        setLocalError("Yalnızca fotoğraf eklenebilir.");
        continue;
      }
      const resized = await resizeImage(file);
      if ("error" in resized) {
        setLocalError(resized.error);
        continue;
      }
      next.push(resized);
    }
    setPhotos(next);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section>
        <h2 className="font-serif text-2xl">Liste</h2>
        {lines.length === 0 ? (
          <p className="mt-4 text-ink-soft">
            Listeniz boş. <Link className="underline" href="/urunler">Ürünlere bakın</Link>.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {lines.map((line) => (
              <li key={line.key} className="border border-line bg-linen p-4">
                <p className="font-medium">{line.type === "custom" ? line.description : line.title}</p>
                {line.type === "door" ? (
                  <p className="text-sm text-ink-soft">
                    E {line.config.widthCm} × B {line.config.heightCm} cm, {openingLabel(line.config.opening)}, {line.qty} adet
                  </p>
                ) : null}
                {flags[line.key] ? <p className="text-sm text-walnut">{flags[line.key]}</p> : null}
                <div className="mt-2 flex gap-3 text-sm">
                  {line.type === "door" ? (
                    <>
                      <button type="button" onClick={() => setQty(line.key, line.qty - 1)}>Azalt</button>
                      <button type="button" onClick={() => setQty(line.key, line.qty + 1)}>Artır</button>
                    </>
                  ) : null}
                  <button type="button" className="underline" onClick={() => remove(line.key)}>Çıkar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <form
        className="grid gap-4"
        action={action}
        onSubmit={(event) => {
          setLocalError("");
          const data = new FormData(event.currentTarget);
          setSent({
            name: String(data.get("name") ?? ""),
            phone: String(data.get("phone") ?? ""),
            city: String(data.get("city") ?? ""),
            contact: data.get("contact") === "arama" ? "arama" : "whatsapp",
            message: String(data.get("message") ?? ""),
            wholesale: data.get("wholesale") === "on",
            photoCount: Number(data.get("photoCount") ?? 0),
          });
          track("quote_submit");
        }}
      >
        <input type="hidden" name="lines" value={JSON.stringify(lines)} />
        <input type="hidden" name="photoCount" value={String(photos.length)} />
        <input type="hidden" name="photoMeta" value={JSON.stringify(photos.map(({ name, bytes }) => ({ name, bytes })))} />
        <Field label="Ad ve soyad" name="name" required />
        <Field label="Telefon" name="phone" required hint="05xx veya +90" />
        <Field label="E-posta" name="email" type="email" />
        <Field label="İl / bölge" name="city" required />
        <fieldset>
          <legend className="mb-2 text-sm">Nasıl dönelim?</legend>
          <label className="mr-4 inline-flex min-h-11 items-center gap-2">
            <input type="radio" name="contact" value="whatsapp" defaultChecked /> WhatsApp
          </label>
          <label className="inline-flex min-h-11 items-center gap-2">
            <input type="radio" name="contact" value="arama" /> Arama
          </label>
        </fieldset>
        <label className="grid gap-1 text-sm">
          Mesaj
          <textarea name="message" rows={4} className="border border-ink-soft bg-shaving px-3 py-2" />
        </label>
        <label className="inline-flex min-h-11 items-center gap-2 text-sm">
          <input type="checkbox" name="wholesale" /> Toptan talep
        </label>
        <div>
          <label className="text-sm">
            Fotoğraf (en çok 5, sizde kalır)
            <input className="mt-1 block" type="file" accept="image/*" multiple onChange={(event) => void onPhotos(event.target.files)} />
          </label>
          <ul className="mt-2 flex gap-2">
            {photos.map((photo) => (
              <li key={photo.url}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt="" className="h-16 w-16 object-cover" />
              </li>
            ))}
          </ul>
        </div>
        <label className="flex min-h-11 items-start gap-2 text-sm">
          <input type="checkbox" name="consent" required />
          <span>
            <Link className="underline" href="/kisisel-veriler">Kişisel verilerin işlenmesi</Link> metnini okudum.
          </span>
        </label>
        <label className="sr-only">
          Web sitesi
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        {localError ? <p className="text-sm text-danger" role="alert">{localError}</p> : null}
        {state && !state.ok ? <p className="text-sm text-danger" role="alert">{state.message}</p> : null}
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "Gönderiliyor" : "Teklif talebini hazırla"}
        </button>
        {state?.ok && sent ? <Success origin={origin} sent={sent} /> : null}
      </form>
    </div>
  );
}

function Success({ origin, sent }: { origin: string; sent: Omit<QuoteMessageInput, "lines" | "origin"> }) {
  const lines = useQuote((state) => state.lines);
  const href = compileWhatsApp({
    lines,
    origin,
    ...sent,
    phone: toE164(sent.phone) ?? sent.phone,
  }).href;
  return (
    <div className="border border-line bg-oak p-4" role="status">
      <p>Talep doğrulandı. Mesaj WhatsApp’ta açılır; e-posta gönderilmedi.</p>
      <a className="btn btn-primary mt-4" href={href} onClick={() => track("whatsapp_click")}>
        WhatsApp’ta aç
      </a>
    </div>
  );
}

function Field({ label, name, required, hint, type = "text" }: { label: string; name: string; required?: boolean; hint?: string; type?: string }) {
  return (
    <label className="grid gap-1 text-sm">
      {label}
      <input name={name} type={type} required={required} className="h-12 border border-ink-soft bg-shaving px-3" />
      {hint ? <span className="text-ink-soft">{hint}</span> : null}
    </label>
  );
}

async function resizeImage(file: File): Promise<{ name: string; bytes: number; url: string } | { error: string }> {
  if (file.size > 15_000_000) return { error: "Dosya 15 MB sınırını aşıyor." };
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) return { error: "Fotoğraf hazırlanamadı." };
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
  if (!blob) return { error: "Fotoğraf hazırlanamadı." };
  return { name: file.name, bytes: blob.size, url: URL.createObjectURL(blob) };
}
