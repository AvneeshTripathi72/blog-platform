export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3, Share2, TableOfContents } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getArticleBySlug } from "@/services/article-details";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return {
    title: article.title,
    description: article.excerpt ?? undefined
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="page-shell grid gap-8 pb-16 pt-8 xl:grid-cols-[minmax(0,1fr)_280px]">
        <article className="prose-shell mx-auto w-full max-w-4xl space-y-8">
          <header className="space-y-6">
            <p className="eyebrow">Article</p>
            <h1 className="editorial-title text-5xl font-semibold leading-[0.98] md:text-7xl">{article.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">{article.excerpt}</p>
            <div className="flex flex-wrap items-center gap-6 border-y border-[var(--border)] py-5 text-sm text-[var(--muted)]">
              <span>By {article.author?.full_name ?? article.author?.username}</span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {article.reading_time_minutes} min read
              </span>
              <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : "Draft"}</span>
            </div>
          </header>

          <div
            className="surface-strong rounded-[36px] p-7 md:p-10"
            dangerouslySetInnerHTML={{ __html: article.content_html }}
          />

          <Card className="rounded-[32px] p-8">
            <p className="eyebrow">About the author</p>
            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{article.author?.full_name ?? article.author?.username}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">{article.author?.bio}</p>
              </div>
              <Button asChild variant="secondary">
                <Link href="/authors">
                  More authors
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </article>

        <aside className="hidden xl:block">
          <div className="sticky top-28 space-y-4">
            <Card className="rounded-[28px] p-5">
              <p className="eyebrow">Reading tools</p>
              <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] px-4 py-3">
                  <TableOfContents className="h-4 w-4 text-[var(--accent)]" />
                  <span>Structured reading layout</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] px-4 py-3">
                  <Share2 className="h-4 w-4 text-[var(--accent)]" />
                  <span>Share-ready page metadata</span>
                </div>
              </div>
            </Card>
            <Card className="rounded-[28px] p-5">
              <p className="eyebrow">Next step</p>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">Keep the momentum going.</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Explore more long-form product and engineering writing from the archive.
              </p>
              <Button asChild className="mt-5 w-full">
                <Link href="/articles">Open archive</Link>
              </Button>
            </Card>
          </div>
        </aside>
      </main>
    </div>
  );
}
