import Link from "next/link";
import { Bell, Command, PenSquare, Search } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="page-shell">
        <div className="surface-strong flex items-center justify-between rounded-[24px] px-4 py-3 shadow-[var(--shadow-soft)]">
          <Link className="flex items-center gap-3 text-lg font-semibold tracking-tight" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-[18px] bg-[var(--foreground)] text-white">
              <BrandMark className="h-10 w-10" />
            </span>
            <span className="flex flex-col leading-none">
              <span>Inkspire</span>
              <span className="text-xs font-medium text-[var(--muted)]">Editorial OS for ambitious teams</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-black/[0.03] p-1 text-sm text-[var(--muted)] md:flex dark:bg-white/[0.03]">
            {[
              ["/articles", "Articles"],
              ["/categories", "Categories"],
              ["/authors", "Authors"]
            ].map(([href, label]) => (
              <Link
                className="rounded-full px-4 py-2 hover:bg-white hover:text-[var(--foreground)] dark:hover:bg-white/8"
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <span className="hidden rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--muted)] lg:inline">
                <Command className="mr-1 inline h-3 w-3" />
                K
              </span>
            </Button>
            <Button size="icon" variant="ghost">
              <Bell className="h-4 w-4" />
            </Button>
            <Button asChild size="sm">
              <Link href="/dashboard/write">
                <PenSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Write</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
