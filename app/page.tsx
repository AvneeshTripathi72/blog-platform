export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  ArrowRight,
  AudioWaveform,
  BookOpenText,
  ChartNoAxesCombined,
  Compass,
  Flame,
  Layers3,
  Sparkles,
  Users
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/utils";
import { getHomepageFeed } from "@/services/blogs";
import { getPopularCategories } from "@/services/categories";
import { getFeaturedAuthors } from "@/services/profiles";

const heroStats = [
  ["12k+", "monthly readers across product, engineering, and AI"],
  ["4.8m", "minutes of reading time saved by better information architecture"],
  ["91%", "returning readers on editorially curated series"]
];

const weeklyFocusItems = [
  {
    icon: BookOpenText,
    label: "Writing mode designed to reduce friction and preserve flow"
  },
  {
    icon: Layers3,
    label: "Flexible card system for featured, trending, and series-based storytelling"
  },
  {
    icon: ChartNoAxesCombined,
    label: "Meaningful analytics panels for attention, depth, and retention"
  }
];

export default async function HomePage() {
  const [articles, categories, authors] = await Promise.all([
    getHomepageFeed(),
    getPopularCategories(),
    getFeaturedAuthors()
  ]);

  const featured = articles[0];
  const trending = articles.slice(1, 4);
  const latest = articles.slice(4, 10);

  return (
    <div className="grain min-h-screen">
      <SiteHeader />
      <main className="space-y-10 pb-8 pt-6">
        <section className="page-shell">
          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            <Card className="mesh-panel overflow-hidden rounded-[36px] p-0">
              <div className="relative grid gap-12 px-8 py-10 md:px-12 md:py-14">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/55 px-4 py-2 text-sm text-[var(--muted)] dark:bg-white/5">
                    <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                    Designed for teams who treat publishing like product craft
                  </div>
                  <div className="space-y-5">
                    <h1 className="editorial-title max-w-4xl text-5xl font-semibold leading-[0.95] md:text-7xl">
                      Build a publication that reads like a magazine and operates like software.
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
                      Inkspire gives modern editorial teams a calmer writing experience, premium distribution surfaces,
                      and reader analytics that feel useful instead of noisy.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg">
                      <Link href="/dashboard">
                        Open dashboard
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                      <Link href="/articles">Browse writing</Link>
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {heroStats.map(([value, label]) => (
                    <div
                      className="rounded-[24px] border border-[var(--border)] bg-white/62 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:bg-white/5"
                      key={label}
                    >
                      <p className="text-3xl font-semibold tracking-[-0.05em]">{value}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="grid gap-6">
              <Card className="rounded-[32px] p-7">
                <p className="eyebrow">This week&apos;s focus</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                  Editorial clarity over content volume.
                </h2>
                <div className="mt-8 space-y-4">
                  {weeklyFocusItems.map(({ icon: Icon, label }) => (
                    <div className="flex items-start gap-3" key={label}>
                      <div className="mt-0.5 rounded-2xl bg-[var(--secondary)] p-3 text-[var(--foreground)]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm leading-6 text-[var(--muted)]">{label}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="rounded-[32px] bg-[var(--foreground)] p-7 text-white">
                <p className="eyebrow text-white/55">Reader signal</p>
                <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">3.4x</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  more saved articles when long-form pieces are paired with stronger structure and better metadata.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="page-shell">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Card className="overflow-hidden rounded-[36px] p-0">
              <div className="grid gap-8 p-8 md:p-10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="eyebrow">Featured article</p>
                    <h2 className="editorial-title mt-3 text-4xl font-semibold">Lead story for curious operators</h2>
                  </div>
                  <Flame className="hidden h-6 w-6 text-[var(--accent)] md:block" />
                </div>
                {featured ? (
                  <Link className="grid gap-6" href={`/articles/${featured.slug}`}>
                    <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
                        <span>{featured.published_at ? new Date(featured.published_at).toLocaleDateString() : "Draft"}</span>
                        <span>•</span>
                        <span>{featured.reading_time_minutes} min read</span>
                        <span>•</span>
                        <span>{formatCompactNumber(featured.view_count)} views</span>
                      </div>
                      <h3 className="editorial-title mt-5 text-4xl font-semibold leading-tight">{featured.title}</h3>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">{featured.excerpt}</p>
                    </div>
                  </Link>
                ) : (
                  <p className="text-sm text-[var(--muted)]">No featured article available yet.</p>
                )}
              </div>
            </Card>

            <div className="grid gap-6">
              {trending.map((article, index) => (
                <Card className="rounded-[30px]" key={article.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow">Trending {String(index + 1).padStart(2, "0")}</p>
                      <Link className="mt-3 block text-2xl font-semibold tracking-[-0.04em] hover:text-[var(--accent)]" href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{article.excerpt}</p>
                    </div>
                    <div className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
                      {article.reading_time_minutes} min
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="page-shell">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Fresh reads</p>
              <h2 className="editorial-title mt-3 text-4xl font-semibold">A magazine wall, not a clone grid.</h2>
            </div>
            <Button asChild variant="ghost">
              <Link href="/articles">
                View archive
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-6">
              {latest.slice(0, 2).map((article) => (
                <Card className="rounded-[30px]" key={article.id}>
                  <Link className="block" href={`/articles/${article.slug}`}>
                    <p className="eyebrow">Briefing</p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{article.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{article.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between text-xs text-[var(--muted)]">
                      <span>{article.reading_time_minutes} min read</span>
                      <span>{formatCompactNumber(article.view_count)} views</span>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
            <Card className="rounded-[34px] p-0">
              <div className="grid divide-y divide-[var(--border)]">
                {latest.slice(2).map((article) => (
                  <Link
                    className="group grid gap-3 px-6 py-6 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                    href={`/articles/${article.slug}`}
                    key={article.id}
                  >
                    <div className="flex items-center justify-between gap-3 text-xs text-[var(--muted)]">
                      <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : "Draft"}</span>
                      <span>{article.reading_time_minutes} min read</span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] group-hover:text-[var(--accent)]">{article.title}</h3>
                    <p className="text-sm leading-7 text-[var(--muted)]">{article.excerpt}</p>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="page-shell">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <Card className="rounded-[34px] bg-[var(--foreground)] p-8 text-white">
              <p className="eyebrow text-white/50">Why teams stay</p>
              <h2 className="editorial-title mt-4 text-4xl font-semibold">A calmer publishing workflow with sharper edges.</h2>
              <div className="mt-8 space-y-5 text-sm leading-7 text-white/72">
                <p>Magazine-inspired modules for the homepage and archive.</p>
                <p>Readable long-form templates for article pages and author surfaces.</p>
                <p>Modern analytics and drafting spaces that feel designed, not assembled.</p>
              </div>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="rounded-[30px]">
                <Compass className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">Popular categories</h3>
                <div className="mt-6 flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Link
                      className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                      href={`/categories/${category.slug}`}
                      key={category.id}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </Card>
              <Card className="rounded-[30px]">
                <Users className="h-5 w-5 text-[var(--accent)]" />
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">Featured voices</h3>
                <div className="mt-6 space-y-5">
                  {authors.map((author) => (
                    <div className="flex items-start justify-between gap-4" key={author.id}>
                      <div>
                        <p className="font-semibold">{author.full_name ?? author.username}</p>
                        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                          {author.bio ?? "Writes on product craft, engineering systems, and thoughtful growth."}
                        </p>
                      </div>
                      {author.is_verified ? (
                        <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">
                          Verified
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="page-shell">
          <Card className="rounded-[36px] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <p className="eyebrow">For product teams, founders, and editorial operators</p>
                <h2 className="editorial-title mt-4 text-4xl font-semibold md:text-5xl">
                  Publish with the confidence of a premium startup brand.
                </h2>
              </div>
              <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
                <p>
                  Better hierarchy, cleaner motion, stronger card language, and more thoughtful reading experiences all
                  compound into trust.
                </p>
                <Button asChild size="lg">
                  <Link href="/dashboard/write">
                    Start writing
                    <AudioWaveform className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
