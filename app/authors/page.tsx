import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { getFeaturedAuthors } from "@/services/profiles";

export const dynamic = "force-dynamic";

export default async function AuthorsPage() {
  const authors = await getFeaturedAuthors();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Authors</p>
          <h1 className="text-5xl font-semibold tracking-[-0.05em]">Meet the writers behind the ideas</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {authors.map((author) => (
            <Card key={author.id}>
              <p className="text-2xl font-semibold tracking-[-0.04em]">{author.full_name ?? author.username}</p>
              <p className="mt-3 text-sm text-[var(--muted)]">{author.bio ?? "Practical engineering notes and sharp product thinking."}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
