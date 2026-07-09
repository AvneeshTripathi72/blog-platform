import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="px-6 py-16">
      <div className="page-shell">
        <div className="surface-strong grid gap-8 rounded-[32px] p-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="eyebrow">Inkspire</p>
            <h2 className="editorial-title max-w-xl text-4xl font-semibold text-[var(--foreground)]">
              Writing infrastructure for teams that care how ideas feel.
            </h2>
            <p className="max-w-lg text-sm leading-7 text-[var(--muted)]">
              Built for thoughtful publishing, measured growth, and a reading experience that feels as polished as the
              product behind it.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-[var(--muted)]">
            <Link className="rounded-2xl border border-transparent px-4 py-3 hover:border-[var(--border)] hover:bg-white/40" href="/articles">
              Explore articles
            </Link>
            <Link className="rounded-2xl border border-transparent px-4 py-3 hover:border-[var(--border)] hover:bg-white/40" href="/authors">
              Meet authors
            </Link>
            <Link className="rounded-2xl border border-transparent px-4 py-3 hover:border-[var(--border)] hover:bg-white/40" href="/privacy">
              Privacy
            </Link>
            <Link className="rounded-2xl border border-transparent px-4 py-3 hover:border-[var(--border)] hover:bg-white/40" href="/terms">
              Terms
            </Link>
            <Link className="rounded-2xl border border-transparent px-4 py-3 hover:border-[var(--border)] hover:bg-white/40" href="/rss.xml">
              RSS feed
            </Link>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 px-2 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>Inkspire © 2026. Crafted for calm reading and sharper publishing.</p>
          <p>Design system tuned for editorial clarity, accessibility, and performance.</p>
        </div>
      </div>
    </footer>
  );
}
