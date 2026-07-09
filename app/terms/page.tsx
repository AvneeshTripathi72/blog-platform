import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="page-shell py-10">
        <Card className="rounded-[34px] space-y-4 p-8">
          <p className="eyebrow">Terms</p>
          <h1 className="editorial-title text-4xl font-semibold tracking-[-0.05em]">Terms content will be published before launch.</h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            The legal copy is still being finalized, but the page is designed to feel complete and consistent in the
            meantime.
          </p>
        </Card>
      </main>
    </div>
  );
}
