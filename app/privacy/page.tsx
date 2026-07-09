import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="page-shell py-10">
        <Card className="rounded-[34px] space-y-4 p-8">
          <p className="eyebrow">Privacy</p>
          <h1 className="editorial-title text-4xl font-semibold tracking-[-0.05em]">Privacy details are being finalized.</h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            This page stays intentionally simple for now, but the visual treatment remains consistent with the rest of
            the product so there are no dead-end placeholder experiences.
          </p>
        </Card>
      </main>
    </div>
  );
}
