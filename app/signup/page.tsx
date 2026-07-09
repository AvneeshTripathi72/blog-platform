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
    <main className="page-shell flex min-h-screen items-center py-10">
      <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="rounded-[34px] p-8 md:p-10">
          <div className="space-y-2">
            <p className="eyebrow">Create account</p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em]">Start publishing with a calmer editorial workflow.</h1>
          </div>
          <form action={signUpAction} className="mt-8 space-y-4">
            <Input name="username" placeholder="Username" required />
            <Input name="email" placeholder="Email address" required type="email" />
            <Input name="password" placeholder="Password" required type="password" />
            {params.error ? <p className="text-sm text-[var(--danger)]">{params.error}</p> : null}
            <FormSubmitButton className="w-full">Create account</FormSubmitButton>
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
            Already have an account?{" "}
            <Link className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]" href="/login">
              Sign in
            </Link>
          </p>
        </Card>
        <Card className="rounded-[34px] bg-[var(--foreground)] p-8 text-white">
          <p className="eyebrow text-white/50">Why teams choose Inkspire</p>
          <h2 className="editorial-title mt-4 text-5xl font-semibold">Publishing tools should feel as intentional as the ideas inside them.</h2>
          <div className="mt-8 space-y-4 text-sm leading-7 text-white/72">
            <p>Write in a cleaner space, publish with stronger hierarchy, and give readers a more premium experience.</p>
            <p>Better systems make better stories easier to ship.</p>
          </div>
        </Card>
      </div>
    </main>
  );
}
