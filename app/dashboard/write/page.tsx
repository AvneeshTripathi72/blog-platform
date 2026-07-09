export const dynamic = "force-dynamic";

import { createDraftAction } from "@/actions/blogs";
import { FormSubmitButton } from "@/components/form-submit-button";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
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
      <main className="page-shell space-y-8 pb-16 pt-8">
        <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <Card className="rounded-[34px] bg-[var(--foreground)] p-8 text-white">
            <p className="eyebrow text-white/50">Focus mode</p>
            <h1 className="editorial-title mt-4 text-5xl font-semibold">Write like the final sentence matters.</h1>
            <div className="mt-8 space-y-4 text-sm leading-7 text-white/72">
              <p>Start with a clear title, shape a crisp summary, and move the body toward one strong idea.</p>
              <p>Think of this screen as the calm before formatting, collaboration, and distribution.</p>
            </div>
          </Card>
          <Card className="rounded-[34px] p-8">
            <p className="eyebrow">Draft editor</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Create a new draft</h2>
            <form action={createDraftAction} className="mt-8 space-y-5">
              <Input name="title" placeholder="A title that earns the click without sounding cheap" required />
              <Input name="excerpt" placeholder="A concise summary for feeds, search, and social previews" required />
              <textarea
                className="min-h-72 w-full rounded-[24px] border border-[var(--border)] bg-[var(--surface-strong)] p-5 text-base leading-8 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                defaultValue="<p>Start with a clear opening, build momentum through the middle, and end with a precise takeaway.</p>"
                name="contentHtml"
                required
              />
              <textarea
                className="min-h-44 w-full rounded-[24px] border border-[var(--border)] bg-[var(--surface-strong)] p-5 text-sm leading-7 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                defaultValue='{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Start writing here."}]}]}'
                name="contentJson"
                required
              />
              {params.error ? <p className="text-sm text-[var(--danger)]">{params.error}</p> : null}
              <div className="flex flex-col gap-3 sm:flex-row">
                <FormSubmitButton>Save draft</FormSubmitButton>
                <Button type="button" variant="secondary">
                  Preview structure
                </Button>
              </div>
            </form>
          </Card>
        </section>
      </main>
    </div>
  );
}
