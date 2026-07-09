export const dynamic = "force-dynamic";

import {
  BarChart3,
  BookMarked,
  Command,
  MessageSquareMore,
  PenSquare,
  TimerReset,
  TrendingUp,
  Users
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { requireUser } from "@/lib/auth";

const metrics = [
  ["Views", "128,492", BarChart3, "+18% this month"],
  ["Bookmarks", "9,284", BookMarked, "+9% from last week"],
  ["Comments", "3,192", MessageSquareMore, "Healthy discussion velocity"],
  ["Followers", "12,044", Users, "Steady audience growth"]
] as const;

const recentDrafts = [
  ["Designing quieter dashboards", "Updated 2 hours ago"],
  ["The hidden cost of rushed feature flags", "Updated yesterday"],
  ["AI workflows that reduce editorial drag", "Updated 3 days ago"]
];

export default async function DashboardPage() {
  await requireUser();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="page-shell space-y-8 pb-16 pt-8">
        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="mesh-panel rounded-[36px] p-8 md:p-10">
            <div className="relative space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/55 px-4 py-2 text-sm text-[var(--muted)] dark:bg-white/5">
                <Command className="h-4 w-4 text-[var(--accent)]" />
                Creator command center
              </div>
              <div className="space-y-4">
                <p className="eyebrow">Dashboard</p>
                <h1 className="editorial-title text-5xl font-semibold leading-[0.98] md:text-6xl">
                  A calmer operating system for your publication.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                  Track attention, restart drafts faster, and move from idea to publish with a workspace that feels more
                  like a premium product tool than a generic CMS.
                </p>
              </div>
            </div>
          </Card>
          <div className="grid gap-6">
            <Card className="rounded-[30px] bg-[var(--foreground)] p-7 text-white">
              <p className="eyebrow text-white/50">Writing cadence</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-4xl font-semibold tracking-[-0.05em]">4 drafts</p>
                  <p className="mt-2 text-sm text-white/70">currently moving through review and refinement</p>
                </div>
                <TimerReset className="h-6 w-6 text-[var(--accent)]" />
              </div>
            </Card>
            <Card className="rounded-[30px] p-7">
              <p className="eyebrow">Quick note</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                Draft autosave is active, reading analytics are synced, and your audience growth trend is still rising.
              </p>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(([label, value, Icon, note]) => (
            <Card className="rounded-[28px]" key={label}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--muted)]">{label}</span>
                <div className="rounded-2xl bg-[var(--secondary)] p-3">
                  <Icon className="h-4 w-4 text-[var(--foreground)]" />
                </div>
              </div>
              <p className="mt-5 text-3xl font-semibold tracking-[-0.05em]">{value}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{note}</p>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-[34px] p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Recent drafts</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Work in motion</h2>
              </div>
              <PenSquare className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="mt-8 space-y-4">
              {recentDrafts.map(([title, updated]) => (
                <div className="rounded-[24px] border border-[var(--border)] p-5" key={title}>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{updated}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="rounded-[34px] p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Attention graph</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Readers are going deeper this month.</h2>
              </div>
              <TrendingUp className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="mt-8 grid h-64 grid-cols-7 items-end gap-3">
              {[38, 52, 48, 65, 58, 72, 84].map((height, index) => (
                <div className="space-y-3" key={height}>
                  <div
                    className="rounded-full bg-[linear-gradient(180deg,var(--accent),var(--primary))]"
                    style={{ height: `${height * 2}px` }}
                  />
                  <p className="text-center text-xs text-[var(--muted)]">W{index + 1}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-[var(--muted)]">
              <span>Avg. read depth up 14%</span>
              <span>Top article retention: 68%</span>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
