import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-[var(--foreground)]">Inkspire</p>
          <p>Publishing for ambitious builders, teams, and ideas.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/rss.xml">RSS</Link>
        </div>
      </div>
    </footer>
  );
}
