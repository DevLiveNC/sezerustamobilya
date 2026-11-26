import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Bu ölçü bizde yok.</h1>
      <Link href="/">Ana sayfa</Link>
    </main>
  );
}
