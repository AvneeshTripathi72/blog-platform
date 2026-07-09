import Link from "next/link";
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
      <main className="page-shell space-y-8 pb-16 pt-8">
        <Card className="mesh-panel rounded-[36px] p-8 md:p-10">
          <div className="relative space-y-5">
            <p className="eyebrow">Category</p>
            <h1 className="editorial-title text-5xl font-semibold leading-[0.98] md:text-6xl">{category.name}</h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
              {category.description ?? "Fresh writing curated around this topic."}
            </p>
          </div>
        </Card>

        <Card className="rounded-[34px] p-0">
          <div className="grid divide-y divide-[var(--border)]">
            {(articles ?? []).map((article: { id: string; title: string; slug: string; excerpt: string | null; published_at: string | null }) => (
              <Link
                className="grid gap-4 px-6 py-6 md:grid-cols-[160px_1fr] md:items-start md:gap-6 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                href={`/articles/${article.slug}`}
                key={article.id}
              >
                <p className="text-sm text-[var(--muted)]">
                  {article.published_at ? new Date(article.published_at).toLocaleDateString() : "Draft"}
                </p>
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.04em]">{article.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
