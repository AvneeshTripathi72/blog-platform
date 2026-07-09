import { signInAction } from "@/actions/auth";
import { FormSubmitButton } from "@/components/form-submit-button";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-16">
      <Card className="w-full space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Welcome back</p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">Sign in to Inkspire</h1>
        </div>
        <form action={signInAction} className="space-y-4">
          <Input name="email" placeholder="Email address" required type="email" />
          <Input name="password" placeholder="Password" required type="password" />
          {params.error ? <p className="text-sm text-red-500">{params.error}</p> : null}
          {params.message ? <p className="text-sm text-emerald-500">{params.message}</p> : null}
          <FormSubmitButton className="w-full">Sign in</FormSubmitButton>
        </form>
        <div className="space-y-4">
          <Button className="w-full" variant="secondary">
            Continue with Google
          </Button>
          <Button className="w-full" variant="secondary">
            Continue with GitHub
          </Button>
        </div>
        <p className="text-sm text-[var(--muted)]">
          No account yet?{" "}
          <Link className="text-[var(--primary)]" href="/signup">
            Create one
          </Link>
        </p>
      </Card>
    </main>
  );
}
