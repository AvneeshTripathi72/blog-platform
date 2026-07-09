import Link from "next/link";
import { ArrowRight, BookOpen, ChartNoAxesCombined, Sparkles, Users } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/utils";
import { getHomepageFeed } from "@/services/blogs";
import { getPopularCategories } from "@/services/categories";
import { getFeaturedAuthors } from "@/services/profiles";

const highlightFeatures = [
  { icon: BookOpen, text: "Rich editor with publishing controls" },
  { icon: Users, text: "Audience growth through follows and newsletters" },
  { icon: ChartNoAxesCombined, text: "Analytics that explain what readers actually do" }
];

export default async function HomePage() {
  const [articles, categories, authors] = await Promise.all([
    getHomepageFeed(),
    getPopularCategories(),
    getFeaturedAuthors()
  ]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-[var(--muted)]">
              <Sparkles className="h-4 w-4 text-[var(--primary)]" />
              Premium publishing for serious builders
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-[-0.05em] md:text-7xl">
                Publish deep technical writing with the polish of a product launch.
              </h1>
              <p className="max-w-2xl text-lg text-[var(--muted)]">
                Inkspire combines editorial storytelling, team-grade analytics, SEO, and creator workflows in one
                modern platform.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Open dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/articles">Explore articles</Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["12k+", "Monthly active readers"],
                ["98%", "Lighthouse accessibility"],
                ["<120ms", "Median cached TTFB"]
              ].map(([value, label]) => (
                <Card key={label}>
                  <p className="text-3xl font-semibold tracking-[-0.04em]">{value}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{label}</p>
                </Card>
              ))}
            </div>
          </div>
          <Card className="overflow-hidden p-0">
            <div className="border-b p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Editor&apos;s pick</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Engineering velocity without shipping chaos</h2>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Long-form insights, sharp formatting, and distribution-ready metadata in one workflow.
              </p>
            </div>
            <div className="space-y-4 p-6">
              {highlightFeatures.map(({ icon: Icon, text }) => (
                <div className="flex items-center gap-3" key={text}>
                  <div className="rounded-2xl bg-[var(--secondary)] p-3">
                    <Icon className="h-5 w-5 text-slate-900" />
                  </div>
                  <p className="text-sm">{text}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">Latest articles</h2>
            <Link className="text-sm text-[var(--primary)]" href="/articles">
              View all
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-[var(--muted)]">
                    {article.published_at ? new Date(article.published_at).toLocaleDateString() : "Draft"}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">{article.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{article.excerpt}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-[var(--muted)]">
                  <span>{article.reading_time_minutes} min read</span>
                  <span>{formatCompactNumber(article.view_count)} views</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-2">
          <Card>
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">Popular categories</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  className="rounded-full border px-4 py-2 text-sm transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  href={`/categories/${category.slug}`}
                  key={category.id}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">Featured authors</h2>
            <div className="mt-6 space-y-4">
              {authors.map((author) => (
                <div className="flex items-start justify-between gap-4" key={author.id}>
                  <div>
                    <p className="font-medium">{author.full_name ?? author.username}</p>
                    <p className="text-sm text-[var(--muted)]">{author.bio ?? "Writes practical engineering insights."}</p>
                  </div>
                  {author.is_verified ? (
                    <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-xs font-medium text-slate-900">
                      Verified
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
