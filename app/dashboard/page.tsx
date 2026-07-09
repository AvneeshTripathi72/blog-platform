export const dynamic = "force-dynamic";

import { BarChart3, BookMarked, MessageSquareMore, PenSquare, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { requireUser } from "@/lib/auth";

const metrics = [
  ["Views", "128,492", BarChart3],
  ["Bookmarks", "9,284", BookMarked],
  ["Comments", "3,192", MessageSquareMore],
  ["Followers", "12,044", Users]
] as const;

export default async function DashboardPage() {
  await requireUser();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Dashboard</p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em]">Creator overview</h1>
          </div>
          <Card className="flex items-center gap-3 px-4 py-3">
            <PenSquare className="h-4 w-4 text-[var(--primary)]" />
            Draft autosave is active
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(([label, value, Icon]) => (
            <Card key={label}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--muted)]">{label}</span>
                <Icon className="h-5 w-5 text-[var(--primary)]" />
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{value}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
