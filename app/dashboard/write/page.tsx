import { createDraftAction } from "@/actions/blogs";
import { FormSubmitButton } from "@/components/form-submit-button";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { requireUser } from "@/lib/auth";

export default async function WritePage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireUser();
  const params = await searchParams;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Editor</p>
          <h1 className="text-5xl font-semibold tracking-[-0.05em]">Create a new draft</h1>
        </div>
        <Card>
          <form action={createDraftAction} className="space-y-5">
            <Input name="title" placeholder="Article title" required />
            <Input name="excerpt" placeholder="Short excerpt for feeds and SEO" required />
            <textarea
              className="surface min-h-64 w-full rounded-[28px] p-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              defaultValue="<p>Start with a strong opening, then add the core ideas and practical takeaways.</p>"
              name="contentHtml"
              required
            />
            <textarea
              className="surface min-h-40 w-full rounded-[28px] p-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              defaultValue='{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Start writing here."}]}]}'
              name="contentJson"
              required
            />
            {params.error ? <p className="text-sm text-red-500">{params.error}</p> : null}
            <FormSubmitButton>Save draft</FormSubmitButton>
          </form>
        </Card>
      </main>
    </div>
  );
}
