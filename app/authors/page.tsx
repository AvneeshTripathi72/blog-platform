import { CheckCircle2, PenTool } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { getFeaturedAuthors } from "@/services/profiles";

export const dynamic = "force-dynamic";

export default async function AuthorsPage() {
  const authors = await getFeaturedAuthors();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="page-shell space-y-8 pb-16 pt-8">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="mesh-panel rounded-[36px] p-8 md:p-10">
            <div className="relative space-y-5">
              <p className="eyebrow">Authors</p>
              <h1 className="editorial-title text-5xl font-semibold leading-[0.98] md:text-6xl">
                The voices behind the ideas deserve better presentation, too.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted)]">
                Profiles should feel human, credible, and thoughtfully placed inside the wider editorial system.
              </p>
            </div>
          </Card>
          <Card className="rounded-[32px] bg-[var(--foreground)] p-8 text-white">
            <p className="eyebrow text-white/50">Editorial culture</p>
            <p className="mt-4 text-sm leading-7 text-white/72">
              Writers, operators, and builders all live inside one publication framework with stronger identity and
              better reading flow.
            </p>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {authors.map((author) => (
            <Card className="rounded-[30px]" key={author.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-[18px] bg-[var(--secondary)] p-3">
                  <PenTool className="h-4 w-4 text-[var(--foreground)]" />
                </div>
                {author.is_verified ? <CheckCircle2 className="h-5 w-5 text-[var(--success)]" /> : null}
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{author.full_name ?? author.username}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {author.bio ?? "Practical writing on product systems, engineering, and modern internet publishing."}
              </p>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
