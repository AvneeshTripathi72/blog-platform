import Link from "next/link";

import { signUpAction } from "@/actions/auth";
import { FormSubmitButton } from "@/components/form-submit-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function SignUpPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-16">
      <Card className="w-full space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">Create account</p>
          <h1 className="text-3xl font-semibold tracking-[-0.04em]">Start publishing with Inkspire</h1>
        </div>
        <form action={signUpAction} className="space-y-4">
          <Input name="username" placeholder="Username" required />
          <Input name="email" placeholder="Email address" required type="email" />
          <Input name="password" placeholder="Password" required type="password" />
          {params.error ? <p className="text-sm text-red-500">{params.error}</p> : null}
          <FormSubmitButton className="w-full">Create account</FormSubmitButton>
        </form>
        <Button className="w-full" variant="secondary">
          Continue with Google
        </Button>
        <Button className="w-full" variant="secondary">
          Continue with GitHub
        </Button>
        <p className="text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <Link className="text-[var(--primary)]" href="/login">
            Sign in
          </Link>
        </p>
      </Card>
    </main>
  );
}
