import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <Card className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-[-0.05em]">Terms</h1>
          <p className="text-[var(--muted)]">Terms of service content will be finalized before launch. This placeholder route prevents broken navigation during deployment.</p>
        </Card>
      </main>
    </div>
  );
}
