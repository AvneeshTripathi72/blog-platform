export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight, Flame, LibraryBig, Newspaper } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/utils";
import { getHomepageFeed } from "@/services/blogs";

export default async function ArticlesPage() {
  const articles = await getHomepageFeed();
  const lead = articles[0];
  const supporting = articles.slice(1, 4);
  const archive = articles.slice(4);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="page-shell space-y-8 pb-16 pt-8">
        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <Card className="mesh-panel rounded-[36px] p-8 md:p-10">
            <div className="relative space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/55 px-4 py-2 text-sm text-[var(--muted)] dark:bg-white/5">
                <Newspaper className="h-4 w-4 text-[var(--accent)]" />
                Curated archive
              </div>
              <div className="space-y-5">
                <h1 className="editorial-title max-w-4xl text-5xl font-semibold leading-[0.98] md:text-6xl">
                  Thoughtful writing across engineering, AI, product, and modern company building.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                  A reading-first archive designed with a magazine sensibility: stronger hierarchy, calmer density, and
                  richer distinctions between featured work and everyday notes.
                </p>
              </div>
            </div>
          </Card>
          <div className="grid gap-6">
            <Card className="rounded-[30px] bg-[var(--foreground)] p-7 text-white">
              <p className="eyebrow text-white/50">Reading signal</p>
              <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{articles.length}</p>
              <p className="mt-2 text-sm leading-6 text-white/70">stories currently surfaced in the public archive</p>
            </Card>
            <Card className="rounded-[30px] p-7">
              <LibraryBig className="h-5 w-5 text-[var(--accent)]" />
              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                Featured essays sit alongside shorter briefings and operational notes, so the archive feels editorial
                instead of repetitive.
              </p>
            </Card>
          </div>
        </section>

        {lead ? (
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="rounded-[36px] p-8 md:p-10">
              <p className="eyebrow">Lead story</p>
              <Link className="block" href={`/articles/${lead.slug}`}>
                <h2 className="editorial-title mt-5 text-5xl font-semibold leading-tight">{lead.title}</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">{lead.excerpt}</p>
                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
                  <span>{lead.published_at ? new Date(lead.published_at).toLocaleDateString() : "Draft"}</span>
                  <span>{lead.reading_time_minutes} min read</span>
                  <span>{formatCompactNumber(lead.view_count)} views</span>
                </div>
              </Link>
            </Card>
            <div className="grid gap-6">
              {supporting.map((article) => (
                <Card className="rounded-[30px]" key={article.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow">Trending</p>
                      <Link className="mt-3 block text-2xl font-semibold tracking-[-0.04em] hover:text-[var(--accent)]" href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{article.excerpt}</p>
                    </div>
                    <Flame className="mt-1 h-5 w-5 text-[var(--accent)]" />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Archive</p>
              <h2 className="editorial-title mt-3 text-4xl font-semibold">Everyday reading, organized with intent.</h2>
            </div>
            <Button variant="ghost">
              Latest first
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <Card className="rounded-[34px] p-0">
            <div className="grid divide-y divide-[var(--border)]">
              {archive.map((article) => (
                <Link
                  className="grid gap-4 px-6 py-6 md:grid-cols-[160px_1fr_auto] md:items-start md:gap-6 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  href={`/articles/${article.slug}`}
                  key={article.id}
                >
                  <div className="text-sm text-[var(--muted)]">
                    {article.published_at ? new Date(article.published_at).toLocaleDateString() : "Draft"}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em]">{article.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">{article.excerpt}</p>
                  </div>
                  <div className="text-sm text-[var(--muted)] md:text-right">
                    <p>{article.reading_time_minutes} min</p>
                    <p className="mt-1">{formatCompactNumber(article.view_count)} views</p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
