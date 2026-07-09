import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { getPopularCategories } from "@/services/categories";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getPopularCategories();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Categories</p>
          <h1 className="text-5xl font-semibold tracking-[-0.05em]">Browse topics readers follow closely</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <Card key={category.id}>
              <Link className="space-y-3" href={`/categories/${category.slug}`}>
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{category.name}</h2>
                <p className="text-sm text-[var(--muted)]">{category.description ?? "Insights and practical writing."}</p>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
