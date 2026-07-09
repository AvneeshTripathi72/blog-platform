export const dynamic = "force-dynamic";

import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { getHomepageFeed } from "@/services/blogs";

export default async function ArticlesPage() {
  const articles = await getHomepageFeed();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Discover</p>
          <h1 className="text-5xl font-semibold tracking-[-0.05em]">Latest writing from the network</h1>
        </div>
        <div className="space-y-6">
          {articles.map((article) => (
            <Card key={article.id}>
              <Link className="space-y-3" href={`/articles/${article.slug}`}>
                <p className="text-sm text-[var(--muted)]">
                  {article.published_at ? new Date(article.published_at).toLocaleDateString() : "Draft"}
                </p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em]">{article.title}</h2>
                <p className="text-[var(--muted)]">{article.excerpt}</p>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
