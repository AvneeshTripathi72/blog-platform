import Link from "next/link";

import { signInAction } from "@/actions/auth";
import { FormSubmitButton } from "@/components/form-submit-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="page-shell flex min-h-screen items-center py-10">
      <div className="grid w-full gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[34px] bg-[var(--foreground)] p-8 text-white">
          <p className="eyebrow text-white/50">Welcome back</p>
          <h1 className="editorial-title mt-4 text-5xl font-semibold">A sign-in flow that feels like entering a studio.</h1>
          <div className="mt-8 space-y-4 text-sm leading-7 text-white/72">
            <p>Resume drafts, review analytics, and return to an environment designed for deliberate publishing.</p>
            <p>Nothing noisy, nothing generic, just a calmer way to ship ideas.</p>
          </div>
        </Card>
        <Card className="rounded-[34px] p-8 md:p-10">
          <div className="space-y-2">
            <p className="eyebrow">Account access</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">Sign in to Inkspire</h2>
          </div>
          <form action={signInAction} className="mt-8 space-y-4">
            <Input name="email" placeholder="Email address" required type="email" />
            <Input name="password" placeholder="Password" required type="password" />
            {params.error ? <p className="text-sm text-[var(--danger)]">{params.error}</p> : null}
            {params.message ? <p className="text-sm text-[var(--success)]">{params.message}</p> : null}
            <FormSubmitButton className="w-full">Sign in</FormSubmitButton>
          </form>
          <div className="mt-5 grid gap-3">
            <Button className="w-full" variant="secondary">
              Continue with Google
            </Button>
            <Button className="w-full" variant="secondary">
              Continue with GitHub
            </Button>
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">
            No account yet?{" "}
            <Link className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]" href="/signup">
              Create one
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}
