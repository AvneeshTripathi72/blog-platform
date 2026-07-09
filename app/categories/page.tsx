import Link from "next/link";
import { Compass, ArrowUpRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { getPopularCategories } from "@/services/categories";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getPopularCategories();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="page-shell space-y-8 pb-16 pt-8">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="mesh-panel rounded-[36px] p-8 md:p-10">
            <div className="relative space-y-5">
              <p className="eyebrow">Categories</p>
              <h1 className="editorial-title text-5xl font-semibold leading-[0.98] md:text-6xl">
                Topics organized like a publication, not a tag dump.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                Categories help readers navigate the archive with more confidence and give each topic area a stronger
                sense of identity.
              </p>
            </div>
          </Card>
          <Card className="rounded-[32px] p-8">
            <Compass className="h-5 w-5 text-[var(--accent)]" />
            <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
              Every category page can become its own editorial landing surface, with curated context and a more useful
              hierarchy for repeat readers.
            </p>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Card className="rounded-[30px]" key={category.id}>
              <Link className="block" href={`/categories/${category.slug}`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">Topic</p>
                  <ArrowUpRight className="h-4 w-4 text-[var(--accent)]" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{category.name}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {category.description ?? "Insights and practical writing."}
                </p>
              </Link>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
