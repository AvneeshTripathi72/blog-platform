"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function signInAction(formData: FormData) {
  const payload = authSchema.parse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
  const payload = authSchema.extend({
    username: z.string().min(3).max(32)
  }).parse({
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username")
  });

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        username: payload.username
      }
    }
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/login?message=Check your email to verify your account.");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
