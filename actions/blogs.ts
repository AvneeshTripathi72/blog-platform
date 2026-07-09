"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSlug } from "@/lib/utils";
import type { Database } from "@/types/database";

const draftSchema = z.object({
  title: z.string().min(5).max(180),
  excerpt: z.string().min(20).max(280),
  contentHtml: z.string().min(50),
  contentJson: z.string().min(2)
});

export async function createDraftAction(formData: FormData) {
  const user = await requireUser();
  const payload = draftSchema.parse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    contentHtml: formData.get("contentHtml"),
    contentJson: formData.get("contentJson")
  });

  const supabase = (await createSupabaseServerClient()) as any;
  const slug = createSlug(payload.title);
  const { data, error }: { data: Pick<Database["public"]["Tables"]["blogs"]["Row"], "slug"> | null; error: { message: string } | null } = await supabase
    .from("blogs")
    .insert({
      author_id: user.id,
      title: payload.title,
      slug,
      excerpt: payload.excerpt,
      content_html: payload.contentHtml,
      content_json: JSON.parse(payload.contentJson),
      status: "draft",
      reading_time_minutes: Math.max(1, Math.ceil(payload.contentHtml.split(/\s+/).length / 200))
    })
    .select("slug")
    .single();

  if (error) {
    redirect(`/dashboard/write?error=${encodeURIComponent(error.message)}`);
  }

  if (!data) {
    redirect("/dashboard/write?error=Unable to create draft.");
  }

  revalidatePath("/dashboard");
  redirect(`/articles/${data.slug}`);
}
