import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
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
      <main className="mx-auto max-w-4xl px-6 py-16">
        <article className="prose-shell space-y-8">
          <header className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Article</p>
            <h1 className="text-5xl font-semibold tracking-[-0.05em]">{article.title}</h1>
            <p className="text-lg text-[var(--muted)]">{article.excerpt}</p>
          </header>
          <Card className="space-y-3">
            <p className="text-sm text-[var(--muted)]">
              By {article.author?.full_name ?? article.author?.username} • {article.reading_time_minutes} min read
            </p>
            <p className="text-sm text-[var(--muted)]">{article.author?.bio}</p>
          </Card>
          <div className="surface rounded-[32px] p-8 leading-8" dangerouslySetInnerHTML={{ __html: article.content_html }} />
        </article>
      </main>
    </div>
  );
}
