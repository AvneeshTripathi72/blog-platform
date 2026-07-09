import Link from "next/link";
import { PenSquare, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link className="flex items-center gap-3 text-lg font-semibold tracking-tight" href="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--primary)] text-[var(--primary-foreground)]">
            <Sparkles className="h-5 w-5" />
          </span>
          Inkspire
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
          <Link href="/articles">Articles</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/authors">Authors</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="ghost">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard/write">
              <PenSquare className="mr-2 h-4 w-4" />
              Write
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
