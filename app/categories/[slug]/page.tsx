import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = (await createSupabaseServerClient()) as any;

  const { data: category } = await supabase.from("categories").select("id, name, description").eq("slug", slug).single();

  if (!category) {
    notFound();
  }

  const { data: articles } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, published_at")
    .eq("category_id", category.id)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(12);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Category</p>
          <h1 className="text-5xl font-semibold tracking-[-0.05em]">{category.name}</h1>
          <p className="text-[var(--muted)]">{category.description ?? "Fresh writing curated around this topic."}</p>
        </div>
        <div className="space-y-6">
          {(articles ?? []).map((article: { id: string; title: string; slug: string; excerpt: string | null; published_at: string | null }) => (
            <Card key={article.id}>
              <a className="space-y-3" href={`/articles/${article.slug}`}>
                <p className="text-sm text-[var(--muted)]">
                  {article.published_at ? new Date(article.published_at).toLocaleDateString() : "Draft"}
                </p>
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{article.title}</h2>
                <p className="text-sm text-[var(--muted)]">{article.excerpt}</p>
              </a>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
